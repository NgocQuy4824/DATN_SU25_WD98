const express = require('express');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();
const cartController = require('../controller/CartController');
const { validateAddToCart } = require('../validations/cartValidation');

router.post('/add', authenticate, validateAddToCart, cartController.addToCart)

router.get('/my-cart', authenticate, cartController.getMyCart);

module.exports = router;