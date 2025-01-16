import model from '../model/index.js';

const { database: { Product } } = model;

class ProductController {
    async getProduct() {
        return Product.findAll();
    }
}

export default {
    ProductController
}