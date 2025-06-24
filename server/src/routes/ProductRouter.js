const express = require("express");
const router = express.Router();
const productsController = require("../controller/ProductController");

router.post("/create", productsController.createProduct);
router.put("/update/:id", productsController.updateProduct);
router.get("/details/:id", productsController.getDetailsProduct);
router.delete("/delete/:id", productsController.deleteProduct);
router.get("/get-all", productsController.getAllProduct);
router.patch("/hide/:id", productsController.hideProduct);
router.patch("/show/:id", productsController.showProduct);
router.get("/get-highlight", productsController.getHighlightProducts);
router.get("/by-size/:sizeId",productsController.getProductsBySize)

module.exports = router;
