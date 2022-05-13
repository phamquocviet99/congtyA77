import express from "express";
import upload from "../multer.js";
import {get,getById, post, update, remove, getByIdCategory} from '../controllers/products.js';
const router = express.Router();

router.get('/', get);
router.get('/IdCate/:id',getByIdCategory),
router.get('/:id', getById)
router.post('/', upload.array('image'), post);
router.put('/:id', upload.array('image'), update);
router.delete('/:id', remove);

export default router;
