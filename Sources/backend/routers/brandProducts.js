import express from "express";
import {
  get,
  getById,
  getByIdCategory,
  post,
  update,
  remove,
} from "../controllers/brandProduct.js";
import checkAuth from "../middleware/check-auth.js";
const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.get("/idCate/:id", getByIdCategory);
router.post("/",checkAuth, post);
router.put("/:id",checkAuth, update);
router.delete("/:id",checkAuth, remove);

export default router;
