const express = require('express');
const { auth, adminAuth } = require('../middlewares/auth.middleware');
const { createCategory, createSubcategory, deleteCategoryById, deleteSubcategory, editCategoriesById, getCategories, getCategoriesById, updateSubcategory } = require('../controllers/category');
const validateMiddleware = require('../middlewares/validate.middleware');
const { categorySchema, subcategorySchema } = require('../schemas/schemas');
const router = express.Router();

router.post('/', validateMiddleware(categorySchema), auth, adminAuth, createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoriesById);

router.put('/subcategory/:id', validateMiddleware(subcategorySchema), auth, adminAuth, updateSubcategory);
router.put('/:id', validateMiddleware(categorySchema), auth, adminAuth, editCategoriesById);

router.delete('/subcategory/:id', auth, adminAuth, deleteSubcategory);
router.delete('/:id', auth, adminAuth, deleteCategoryById);

router.post('/subcategory', auth, adminAuth, createSubcategory);

module.exports = router;
