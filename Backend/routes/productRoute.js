const router = require("express").Router();
const {
  getAllProduct,
  getSingleProduct,
  singleCreateProduct,
  singleUpdateProduct,
  singleDeleteProduct,
  singleUpdateProductStatus,
  singleUpdateProductFeatured,
} = require("../controllers/productController");

// product create and get
router.route("/").get(getAllProduct).post(singleCreateProduct);

// single product status update
router.put("/status/:id", singleUpdateProductStatus);

// single product featured update
router.put("/featured/:id", singleUpdateProductFeatured);

// product by id single get, update, and delete
router
  .route("/:id")
  .get(getSingleProduct)
  .put(singleUpdateProduct)
  .delete(singleDeleteProduct);

module.exports = router;
