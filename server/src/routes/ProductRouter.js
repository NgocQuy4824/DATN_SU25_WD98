const express = require("express");
const router = express.Router();
const productsController = require("../controller/ProductController");

const upload = require('../middlewares/upload');

router.post('/create', upload.array('images'), productsController.createProduct);

router.put('/update/:id', upload.array('images'), productsController.updateProduct);

router.get("/details/:id", productsController.getDetailsProduct);
router.delete("/delete/:id", productsController.deleteProduct);
router.get("/get-all", productsController.getAllProduct);
router.patch("/hide/:id", productsController.hideProduct);
router.patch("/show/:id", productsController.showProduct);
router.get("/get-highlight", productsController.getHighlightProducts);
router.get("/by-size/:sizeId",productsController.getProductsBySize),
router.get("/filter", productsController.getProductsByFilter);

module.exports = router;
