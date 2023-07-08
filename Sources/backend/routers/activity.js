import express from "express";
import {
  get,
  getById,
  getByIdCategory,
  post,
  update,
  remove,
} from "../controllers/activity.js";
import checkAuth from "../middleware/check-auth.js";
import upload from "../multer.js";
const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.get("/idCate/:id", getByIdCategory);
router.post("/",checkAuth, upload.single('image'), post);
router.put("/:id",checkAuth, upload.single('image'), update);
router.delete("/:id",checkAuth, remove);

export default router;