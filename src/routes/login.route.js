const express = require('express');
const { register, login, addToCart, deleteCart, getAllCart, userUpdate, changeCart } = require('../controllers/login');
const { auth } = require('../middlewares/auth.middleware');
const validateMiddleware = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema, addToCartSchema } = require('../schemas/schemas');

const router = express.Router();

router.post('/register', validateMiddleware(registerSchema), register);
router.post('/login', validateMiddleware(loginSchema), login);
router.put('/user', auth, userUpdate);
// router.post('/cart/add', auth, addToCart);
// router.delete('/cart/delete/:itemId', auth, deleteCart);
// router.get('/cart/all', auth, getAllCart)
// router.put('/cart/change', auth, changeCart);

module.exports = router;
