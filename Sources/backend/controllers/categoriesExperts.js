import CategoryExpertModel from "../models/categoriesExperts.js";
import ExpertModel from "../models/expert.js";
import {removeExpert} from "./expert.js"

//Function GetOne
export const get = async (req, res) => {
  try {
    const categories = await CategoryExpertModel.find();
    res.status(200).json({ count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const category = await CategoryExpertModel.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};
//Function Post New Data
export const post = async (req, res) => {
  try {
    const newCategory = req.body;
    const category = new CategoryExpertModel(newCategory);
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
    const category = await CategoryExpertModel.findByIdAndUpdate(
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
    const experts = await ExpertModel.find({
      id: 0,
      idCategory: req.params.id,
    });
    if (experts.length > 0) {
      for (const expert of experts) {
        await removeExpert(expert._id)
      }
    }
    await CategoryExpertModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ status: "deleted category" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
