import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import upload from "./multer.js";
import uploads from "./cloudinary.js";
import fs from "fs";
//Import Router
import inforCompanyRouter from "./routers/inforCompany.js";
import categoryRouter from "./routers/categories.js";
import productRouter from "./routers/products.js";
import supplierRouter from "./routers/supplier.js";
import expertRouter from "./routers/expert.js";
import categoryExpertRouter from "./routers/categoriesExperts.js";
import brandProductRouter from "./routers/brandProducts.js";
import categoriesActivityRouter from "./routers/categoryActivity.js";
import activityRouter from "./routers/activity.js";
import userRouter from "./routers/users.js";
//Setup Port
const app = express();
const PORT = process.env.port || 5000;

const URI = process.env.MONGODB_URL;

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" })); // limit from front-end data 30MB
app.use(cors());

//Call API
app.use("/inforCompany", inforCompanyRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/supplier", supplierRouter);
app.use("/expert", expertRouter);
app.use("/categoryExpert", categoryExpertRouter);
app.use("/brand", brandProductRouter);
app.use("/categoryActivity", categoriesActivityRouter);
app.use("/activity", activityRouter);
app.use("/user", userRouter);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
