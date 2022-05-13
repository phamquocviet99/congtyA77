import SupplierModel from "../models/supplier.js";
import uploads from "../cloudinary.js";
import cloudinary from "cloudinary";

import fs from "fs";
//Function GetAll
export const get = async (req, res) => {
  try {
    const suppliers = await SupplierModel.find();
    res.status(200).json({ count: suppliers.length, data: suppliers });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Function GetByID
export const getById = async (req, res) => {
  try {
    const supplier = await SupplierModel.findById(req.params.id);
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json(err);
  }
};
//Function Supplier New Data
export const post = async (req, res) => {
  try {
    const uploader = async (path) =>
      await uploads(path, "A77_Images/Suppliers");
    const file = req.file;
    const { path } = file;
    const newPath = await uploader(path);
    fs.unlinkSync(path);
    const newSupplier = req.body;
    newSupplier.logo = newPath;
    const supplier = new SupplierModel(newSupplier);
    await supplier.save();
    res.status(200).json({ newSupplier: supplier });
  } catch (err) {
    res.status(500).json({ erro: err });
  }
};
//Function Update Data
export const update = async (req, res) => {
  try {
    const updateSupplier = req.body;
    // delete old image
    const oldSupplier = await SupplierModel.findById(req.params.id);
    if (updateSupplier.changeImg == "true") {
      const public_id = oldSupplier.logo._id;
      await cloudinary.uploader.destroy(public_id);
      const uploader = async (path) =>
        await uploads(path, "A77_Images/Suppliers");
      const file = req.file;
      const { path } = file;
      const newPath = await uploader(path);
      fs.unlinkSync(path);
      updateSupplier.logo = newPath;
    } else {
      updateSupplier.logo = oldSupplier.logo;
    }
    // create new image

    const supplier = await SupplierModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateSupplier,
      { new: true }
    ); // data updated is new data

    res.status(200).json({ updateSupplier: supplier });
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};

//Function Delete Data
export const remove = async (req, res) => {
  try {
    // delete old image
    const oldSupplier = await SupplierModel.findById(req.params.id);
    const public_id = oldSupplier.logo._id;
    await cloudinary.uploader.destroy(public_id);
    await oldSupplier.remove();
    res.status(200).json({ status: "deleted supplier" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
