const router = require("express").Router();
const {
  getAllBanner,
  getSingleBanner,
  singleUpdateBanner,
  singleDeleteBanner,
  singleCreateBanner,
  singleUpdateBannerStatus,
} = require("../controllers/bannerController");

// banner create and get
router.route("/").get(getAllBanner).post(singleCreateBanner);

// single banner status update
router.put("/status/:id", singleUpdateBannerStatus);

// banner by id single get, update, and delete
router
  .route("/:id")
  .get(getSingleBanner)
  .put(singleUpdateBanner)
  .delete(singleDeleteBanner);

module.exports = router;
