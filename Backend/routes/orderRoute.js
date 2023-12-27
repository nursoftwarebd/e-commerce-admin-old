const {
  getAllOrder,
  getSingleOrder,
  singleCreateOrder,
  singleUpdateOrder,
  singleDeleteOrder,
  getSingleCustomerOrder,
  singleUpdateOrderStatus,
} = require("../controllers/orderController");

const router = require("express").Router();

// order create and get
router.route("/").get(getAllOrder).post(singleCreateOrder);

// single product status update
router.put("/status/:id", singleUpdateOrderStatus);

// get single customer order
router.get("/customer/:id", getSingleCustomerOrder);

// order by id single get, update, and delete
router
  .route("/:id")
  .get(getSingleOrder)
  .put(singleUpdateOrder)
  .delete(singleDeleteOrder);

module.exports = router;
