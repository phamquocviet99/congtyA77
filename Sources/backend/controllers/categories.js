import CategoryModel from "../models/categories.js";
import ProductModel from "../models/products.js";
import cloudinary from "cloudinary";
//Function GetOne
export const get = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json({ count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    console.log("Categories", category);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};
//Function Post New Data
export const post = async (req, res) => {
  try {
    const newCategory = req.body;
    const category = new CategoryModel(newCategory);
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
    const category = await CategoryModel.findByIdAndUpdate(
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
    const products = await ProductModel.find({
      id: 0,
      idCategory: req.params.id,
    });
    if (products.length > 0) {
      for (const product of products) {
        product.image?.map((img) => {
          const public_id = img._id;
          cloudinary.uploader.destroy(public_id);
        });
         await product.remove();
      }
    }
    await CategoryModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ status: "deleted category" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
