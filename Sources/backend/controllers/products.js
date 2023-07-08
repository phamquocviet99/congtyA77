import ProductModel from "../models/products.js";
import CategoryModel from "../models/categories.js";
import BrandModel from "../models/brandProducts.js";
import uploads from "../cloudinary.js";
import cloudinary from "cloudinary";
import fs from "fs";

//Function Post New Data
export const post = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.body.idCategory);
    const brand = await BrandModel.findById(req.body.idBrand);
    const uploader = async (path) => await uploads(path, "A77_Images/Product");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const newProduct = req.body;
    newProduct.image = urls;
    newProduct.nameCategory = category.name;
    newProduct.nameBrand = brand.name;
    const product = new ProductModel(newProduct);
    await product.save();
    res.status(200).json({ newProduct: product });
  } catch (err) {
    res.status(500).json({ erro: err });
  }
};

//Function GetAll
export const get = async (req, res) => {
  try {
    const countRows = await ProductModel.count();
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const products = await ProductModel.find()
      .sort({ _id: "asc" })
      .skip(page * limit)
      .limit(limit);
    if (products.length > 0) {
      for (const product of products) {
        const category = await CategoryModel.findById(product.idCategory);
        const brand = await BrandModel.findById(product.idBrand);
        product.nameBrand = brand.name;
        product.nameCategory = category.name;
      }
    }
    res.status(200).json({
      pageInfo: { countRows: countRows, page: page, limit: limit },
      data: products,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      const category = await CategoryModel.findById(product.idCategory);
      const brand = await BrandModel.findById(product.idBrand);
      product.nameBrand = brand.name;
      product.nameCategory = category.name;
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Function GetByIdCategory
export const getByIdCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const countRows = await ProductModel.find({
      id: 0,
      idCategory: req.params.id,
    }).count();
    const products = await ProductModel.find({
      id: 0,
      idCategory: req.params.id,
    })
      .sort({ _id: "asc" })
      .skip(page * limit)
      .limit(limit);
    if (products.length > 0) {
      for (const product of products) {
        const category = await CategoryModel.findById(product.idCategory);
        const brand = await BrandModel.findById(product.idBrand);
        product.nameBrand = brand.name;
        product.nameCategory = category.name;
      }
    }
    res.status(200).json({
      pageInfo: { countRows: countRows, page: page, limit: limit },
      data: products,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getByIdBrand = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const countRows = await ProductModel.find({
      id: 0,
      idBrand: req.params.id,
    }).count();
    const products = await ProductModel.find({
      id: 0,
      idBrand: req.params.id,
    })
      .sort({ _id: "asc" })
      .skip(page * limit)
      .limit(limit);
    if (products.length > 0) {
      for (const product of products) {
        const category = await CategoryModel.findById(product.idCategory);
        const brand = await BrandModel.findById(product.idBrand);
        product.nameBrand = brand.name;
        product.nameCategory = category.name;
      }
    }
    res.status(200).json({
      pageInfo: { countRows: countRows, page: page, limit: limit },
      data: products,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Function Update Data
export const update = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.body.idCategory);
    const brand = await BrandModel.findById(req.body.idBrand);
    const product = await ProductModel.findById(req.params.id);
    const updateProduct = req.body;
    updateProduct.nameCategory = category.name;
    updateProduct.nameBrand = brand.name;
    if (updateProduct.changeImg == "true") {
      for (const img of product.image) {
        const public_id = img._id;
        await cloudinary.uploader.destroy(public_id);
      }
      const uploader = async (path) =>
        await uploads(path, "A77_Images/Product");
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      updateProduct.image = urls;
    } else {
      updateProduct.image = product.image;
    }
    delete updateProduct.changeImg;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateProduct,
      { new: true }
    ); // data updated is new data

    res.status(200).json({ updateProduct: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//Function Delete Data
export const remove = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    for (const img of product.image) {
      const public_id = img._id;
      await cloudinary.uploader.destroy(public_id);
    }
    await product.remove();
    res.status(200).json({ status: "deleted product" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const removeProduct = async (id) => {
  try {
    const product = await ProductModel.findById(id);
    for (const img of product.image) {
      const public_id = img._id;
      await cloudinary.uploader.destroy(public_id);
    }
    await product.remove();
    return true;
  } catch (err) {
    return false;
  }
};
