import express from "express";
import {
  get,
  getById,
  post,
  update,
  remove,
} from "../controllers/categoriesActivity.js";
import checkAuth from "../middleware/check-auth.js";
const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.post("/",checkAuth, post);
router.put("/:id",checkAuth, update);
router.delete("/:id",checkAuth, remove);

export default router;
