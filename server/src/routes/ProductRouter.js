const express = require('express');
const router = express.Router();
const productsController = require('../controller/ProductController');

router.post('/create',productsController.createProduct);
router.put('/update/:id',productsController.updateProduct);
router.get('/details/:id', productsController.getDetailsProduct);
router.delete('/delete/:id', productsController.deleteProduct);

module.exports = router;