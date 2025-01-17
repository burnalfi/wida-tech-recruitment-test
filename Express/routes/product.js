import { Router } from "express";
import multer from 'multer';
import controller from '../controller/index.js';

const { product: { ProductController } } = controller;
const upload = multer({ dest: 'uploads/' });

const productRouter = Router({});
const productController = new ProductController();

productRouter.post('/upload', upload.single('file'), async (req, res) => {
    return res.json(await productController.uploadProducts(req.file));
});

export default {
    productRouter
}