
const express = require('express');
const { auth, adminAuth } = require('../middlewares/auth.middleware');
const { createBrand, deleteBrandById, getBrandById, getBrands, updateBrandById } = require('../controllers/brand');
const validateMiddleware = require('../middlewares/validate.middleware');
const { brandSchema } = require('../schemas/schemas');
const router = express.Router();


router.post('/', validateMiddleware(brandSchema), auth, adminAuth, createBrand);
router.get('/', getBrands);
router.get('/:id', getBrandById);
router.put('/:id', validateMiddleware(brandSchema), auth, adminAuth, updateBrandById);
router.delete('/:id', auth, adminAuth, deleteBrandById);

module.exports = router;
