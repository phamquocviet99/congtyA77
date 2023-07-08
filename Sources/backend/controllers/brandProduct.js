import BrandModel from "../models/brandProducts.js";
import CategoryModel from "../models/categories.js";
import ProductModel from "../models/products.js";
import cloudinary from "cloudinary";
import { removeProduct } from "../controllers/products.js";
//Function GetOne
export const get = async (req, res) => {
  try {
    const brands = await BrandModel.find();
    if (brands.length > 0) {
      for (const brand of brands) {
        const category = await CategoryModel.findById(brand.idCategory);
        brand.nameCategory = category.name;
      }
    }
    res.status(200).json({ count: brands.length, data: brands });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const brand = await BrandModel.findById(req.params.id);
    const category = await CategoryModel.findById(brand.idCategory);
    brand.nameCategory = category.name;
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json(err);
  }
};
//Function Post New Data
export const post = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.body.idCategory);
    const newbrand = req.body;
    newbrand.nameCategory = category.name;
    const brand = new BrandModel(newbrand);
    await brand.save();
    res.status(200).json({ newBrand: brand });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
//Function Update Data
export const update = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.body.idCategory);
    const updateBrand = req.body;
    updateBrand.nameCategory = category.name;
    const brand = await BrandModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateBrand,
      { new: true }
    ); // data updated is new data

    res.status(200).json({ updateBrand: brand });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//Function Delete Data
export const remove = async (req, res) => {
  try {
    const products = await ProductModel.find({
      id: 0,
      idBrand: req.params.id,
    });
    if (products.length > 0) {
      for (const product of products) {
        removeProduct(product._id);
      }
    }
    await BrandModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ status: "deleted brand" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getByIdCategory = async (req, res) => {
  try {
    const brands = await BrandModel.find({
      id: 0,
      idCategory: req.params.id,
    });
    res.status(200).json({ count: brands.length, data: brands });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeBrand = async (id) => {
  try {
    const products = await ProductModel.find({
      id: 0,
      idBrand: id,
    });
    if (products.length > 0) {
      for (const product of products) {
        removeProduct(product._id);
      }
    }
    await BrandModel.findByIdAndDelete({ _id: id });
    return true;
  } catch (err) {
    return false;
  }
};
