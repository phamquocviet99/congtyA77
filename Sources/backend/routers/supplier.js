import express from "express";
import upload from "../multer.js";
import {get,getById, post, update, remove} from '../controllers/supplier.js';
import checkAuth from "../middleware/check-auth.js";
const router = express.Router();

router.get('/', get);
router.get('/:id', getById)
router.post('/',checkAuth, upload.single('logo'), post);
router.put('/:id',checkAuth, upload.single('logo'), update);
router.delete('/:id', checkAuth,remove);

export default router;
