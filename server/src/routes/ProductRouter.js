const express = require('express');
const router = express.Router();
const productsController = require('../controller/ProductController');

router.post('/create',productsController.createProduct);
router.put('/update/:id',productsController.updateProduct);

module.exports = router;