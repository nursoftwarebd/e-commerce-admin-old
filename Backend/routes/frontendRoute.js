const router = require("express").Router();
const {
  HomePageController,
  searchPageController,
  getSingleOrderPageController,
  createOrderPageController,
  productSinglePageController,
  productCategoryPageController,
} = require("../controllers/HomePageController");
const { getAllParentCategory } = require("../controllers/categoryController");

router.get("/home", HomePageController);
router.get("/search", searchPageController);
router.get("/category", getAllParentCategory);
router.post("/order/", createOrderPageController);
router.get("/order/:id", getSingleOrderPageController);
router.get("/product/:slug", productSinglePageController);
router.get("/products/category", productCategoryPageController);

module.exports = router;
