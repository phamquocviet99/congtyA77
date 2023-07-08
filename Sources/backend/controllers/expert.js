import ExpertModel from "../models/expert.js";
import CategoryExpertModel from "../models/categoriesExperts.js";
import uploads from "../cloudinary.js";
import cloudinary from "cloudinary";

import fs from "fs";
//Function GetAll
export const get = async (req, res) => {
  try {
    const expertes = await ExpertModel.find();
    if (expertes.length > 0) {
      for (const exp of expertes) {
        const category = await CategoryExpertModel.findById(exp.idCategory);
        exp.nameCategory = category.name;
      }
    }
    res.status(200).json({ count: expertes.length, data: expertes });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const expert = await ExpertModel.findById(req.params.id);
    res.status(200).json(expert);
  } catch (err) {
    res.status(500).json(err);
  }
};
//Function Expert New Data
export const post = async (req, res) => {
  try {
    const uploader = async (path) => await uploads(path, "A77_Images/Experts");
    const file = req.file;
    const { path } = file;
    const newPath = await uploader(path);
    fs.unlinkSync(path);
    const category = await CategoryExpertModel.findById(req.body.idCategory);
    const newExpert = req.body;
    newExpert.image = newPath;
    newExpert.nameCategory = category.name;
    const expert = new ExpertModel(newExpert);
    await expert.save();
    res.status(200).json({ newExpert: expert });
  } catch (err) {
    res.status(500).json({ erro: err });
  }
};
//Function Update Data
export const update = async (req, res) => {
  try {
    const category = await CategoryExpertModel.findById(req.body.idCategory);
    // delete old image
    const oldExpert = await ExpertModel.findById(req.params.id);
    const updateExpert = req.body;
    updateExpert.nameCategory = category.name;
    if (updateExpert.changeImg == "true") {
      const public_id = oldExpert.image._id;
      await cloudinary.uploader.destroy(public_id);
      // create new image
      const uploader = async (path) =>
        await uploads(path, "A77_Images/Experts");
      const file = req.file;
      const { path } = file;
      const newPath = await uploader(path);
      fs.unlinkSync(path);
      updateExpert.image = newPath;
    } else {
      updateExpert.image = oldExpert.image;
    }

    const expert = await ExpertModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateExpert,
      { new: true }
    ); // data updated is new data

    res.status(200).json({ updateExpert: expert });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//Function Delete Data
export const remove = async (req, res) => {
  try {
    // delete old image
    const oldExpert = await ExpertModel.findById(req.params.id);
    const public_id = oldExpert.image._id;
    await cloudinary.uploader.destroy(public_id);
    await oldExpert.remove();
    res.status(200).json({ status: "deleted expert" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const getByIdCategory = async (req, res) => {
  try {
    const experts = await ExpertModel.find({
      id: 0,
      idCategory: req.params.id,
    });
    res.status(200).json({ count: experts.length, data: experts });
  } catch (err) {
    res.status(500).json(err);
  }
};
export const removeExpert = async (id) => {
  try {
    const oldExpert = await ExpertModel.findById(id);
    const public_id = oldExpert.image._id;
    await cloudinary.uploader.destroy(public_id);
    await oldExpert.remove();
    return true;
  } catch (err) {
    return false;
  }
};
