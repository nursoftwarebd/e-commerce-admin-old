const router = require("express").Router();
const {
  getAllCoupon,
  getSingleCoupon,
  singleCreateCoupon,
  singleUpdateCoupon,
  singleDeleteCoupon,
  singleUpdateCouponStatus,
} = require("../controllers/couponController");

// coupon create and get
router.route("/").get(getAllCoupon).post(singleCreateCoupon);

// single coupon status update
router.put("/status/:id", singleUpdateCouponStatus);

// coupon by id single get, update, and delete
router
  .route("/:id")
  .get(getSingleCoupon)
  .put(singleUpdateCoupon)
  .delete(singleDeleteCoupon);

module.exports = router;
