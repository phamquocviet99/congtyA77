import ActivityModel from "../models/activity.js";
import CategoryActivityModel from "../models/categoriesActivity.js";
import uploads from "../cloudinary.js";
import cloudinary from "cloudinary";

import fs from "fs";
//Function GetOne
export const get = async (req, res) => {
  try {
    const countRows = await ActivityModel.count();
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const acts = await ActivityModel.find()
      .sort({ _id: "asc" })
      .skip(page * limit)
      .limit(limit);
    if (acts.length > 0) {
      for (const act of acts) {
        const categoryAct = await CategoryActivityModel.findById(
          act.idCategory
        );
        act.nameCategory = categoryAct.name;
      }
    }

    res.status(200).json({
      pageInfo: { countRows: countRows, page: page, limit: limit },
      data: acts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const act = await ActivityModel.findById(req.params.id);
    if (act) {
      const categoryAct = await CategoryActivityModel.findById(act.idCategory);
      act.nameCategory = categoryAct.name;
    }
    res.status(200).json(act);
  } catch (err) {
    res.status(500).json(err);
  }
};
//Function Post New Data
export const post = async (req, res) => {
  try {
    const uploader = async (path) =>
      await uploads(path, "A77_Images/Activitys");
    const file = req.file;
    const { path } = file;
    const newPath = await uploader(path);
    fs.unlinkSync(path);
    const category = await CategoryActivityModel.findById(req.body.idCategory);
    const newAct = req.body;
    newAct.image = newPath;
    newAct.nameCategory = category.name;
    const act = new ActivityModel(newAct);
    await act.save();
    res.status(200).json({ newActivity: act });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
//Function Update Data
export const update = async (req, res) => {
  try {
    const category = await CategoryActivityModel.findById(req.body.idCategory);
    const oldAct = await ActivityModel.findById(req.params.id);
    const updateAct = req.body;
    updateAct.nameCategory = category.name;
    if (updateAct.changeImg == "true") {
      const public_id = oldAct.image._id;
      await cloudinary.uploader.destroy(public_id);
      // create new image
      const uploader = async (path) =>
        await uploads(path, "A77_Images/Activitys");
      const file = req.file;
      const { path } = file;
      const newPath = await uploader(path);
      fs.unlinkSync(path);
      updateAct.image = newPath;
    } else {
      updateAct.image = oldAct.image;
    }
    const act = await ActivityModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateAct,
      { new: true }
    ); // data updated is new data

    res.status(200).json({ updateActivity: act });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//Function Delete Data
export const remove = async (req, res) => {
  try {
    const oldAct = await ActivityModel.findById(req.params.id);
    const public_id = oldAct.image._id;
    await cloudinary.uploader.destroy(public_id);
    await oldAct.remove();
    res.status(200).json({ status: "deleted Activity" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getByIdCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const countRows = await ActivityModel.find({
      id: 0,
      idCategory: req.params.id,
    }).count();
    const acts = await ActivityModel.find({
      id: 0,
      idCategory: req.params.id,
    })
      .sort({ _id: "asc" })
      .skip(page * limit)
      .limit(limit);
    res.status(200).json({
      pageInfo: { countRows: countRows, page: page, limit: limit },
      data: acts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
export const removeActivity = async (id) => {
  try {
    const oldAct = await ActivityModel.findById(id);
    const public_id = oldAct.image._id;
    await cloudinary.uploader.destroy(public_id);
    await oldAct.remove();
    return true;
  } catch (err) {
    return false;
  }
};
