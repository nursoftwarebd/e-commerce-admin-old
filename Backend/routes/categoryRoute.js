const router = require("express").Router();
const {
  getAllCategory,
  getSingleCategory,
  getAllParentCategory,
  singleCreateCategory,
  singleUpdateCategory,
  singleDeleteCategory,
  singleUpdateCategoryStatus,
} = require("../controllers/categoryController");

// category create and get
router.route("/").get(getAllCategory).post(singleCreateCategory);

// get parent category and sub category
router.get("/parent-category", getAllParentCategory);

// show/hide a category
router.put("/status/:id", singleUpdateCategoryStatus);

// category by id single get, update, and delete
router
  .route("/:id")
  .get(getSingleCategory)
  .put(singleUpdateCategory)
  .delete(singleDeleteCategory);

module.exports = router;
