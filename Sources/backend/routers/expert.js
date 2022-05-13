import express from "express";
import upload from "../multer.js";
import {get,getById, post, update, remove,getByIdCategory} from '../controllers/expert.js';
const router = express.Router();

router.get('/', get);
router.get('/:id', getById)
router.get('/idCate/:id', getByIdCategory)
router.post('/', upload.single('image'), post);
router.put('/:id', upload.single('image'), update);
router.delete('/:id', remove);

export default router;
