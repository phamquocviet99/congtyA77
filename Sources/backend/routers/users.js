import express from "express";
import { signIn, getAll, remove,login } from "../controllers/users.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.post("/signIn", signIn);
router.get("/",checkAuth, getAll);
router.delete("/:id",checkAuth, remove);
router.post("/login", login);
export default router;
