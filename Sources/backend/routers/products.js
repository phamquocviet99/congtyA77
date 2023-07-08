import express from "express";
import upload from "../multer.js";
import {
  get,
  getById,
  post,
  update,
  remove,
  getByIdCategory,
  getByIdBrand,
} from "../controllers/products.js";
import checkAuth from "../middleware/check-auth.js";
const router = express.Router();

router.get("/", get);
router.get("/IdCate/:id", getByIdCategory);
router.get("/IdBrand/:id", getByIdBrand);
router.get("/:id", getById);
router.post("/",checkAuth, upload.array("image"), post);
router.put("/:id",checkAuth, upload.array("image"), update);
router.delete("/:id",checkAuth, remove);

export default router;
