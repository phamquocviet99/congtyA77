import CategoryActivityModel from "../models/categoriesActivity.js";
import ActivityModel from "../models/activity.js"
import {removeActivity} from "../controllers/activity.js"
//Function GetOne
export const get = async (req, res) => {
  try {
    const categories = await CategoryActivityModel.find();
    res.status(200).json({ count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const category = await CategoryActivityModel.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};
//Function Post New Data
export const post = async (req, res) => {
  try {
    const newCategory = req.body;
    const category = new CategoryActivityModel(newCategory);
    await category.save();
    res.status(200).json({ newCategory: category });
  } catch (err) {
    res.status(500).json({ erro: err });
  }
};
//Function Update Data
export const update = async (req, res) => {
  try {
    const updateCategory = req.body;
    const category = await CategoryActivityModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateCategory,
      { new: true }
    ); // data updated is new data

    res.status(200).json({ updateCategory: category });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//Function Delete Data
export const remove = async (req, res) => {
  try {
    const acts = await ActivityModel.find({
      id: 0,
      idCategory: req.params.id,
    });
    if (acts.length > 0) {
      for (const act of acts) {
        removeActivity(act._id);
      }
    }
    await CategoryActivityModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ status: "deleted category" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
