const express = require('express');
const { auth, adminAuth } = require('../middlewares/auth.middleware');
const { createProduct, deleteProductById, editProduct, getProductById, getProducts, getProductsByCategory, getProductsBySubcategory, searchProduct } = require('../controllers/products');
const validateMiddleware = require('../middlewares/validate.middleware');
const { productSchema } = require('../schemas/schemas');
const router = express.Router();

// Route handlers
router.post('/', validateMiddleware(productSchema), auth, adminAuth, createProduct);
router.get('/', getProducts);
router.get('/search', searchProduct);
router.get('/:id', getProductById);
router.patch('/:id', validateMiddleware(productSchema), auth, editProduct);
router.delete('/:id', auth, adminAuth, deleteProductById);

// Routes for category and subcategory
router.get('/category/:category', getProductsByCategory);
router.get('/subcategory/:subcategory', getProductsBySubcategory);

module.exports = router;
