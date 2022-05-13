import express from "express";
import upload from "../multer.js";
import {get,getById, post, update, remove} from '../controllers/supplier.js';
const router = express.Router();

router.get('/', get);
router.get('/:id', getById)
router.post('/', upload.single('logo'), post);
router.put('/:id', upload.single('logo'), update);
router.delete('/:id', remove);

export default router;
