const router = require("express").Router();
const {
  getAllCustomer,
  getSingleCustomer,
  singleCreateCustomer,
  singleDeleteCustomer,
  singleUpdateCustomer,
  singleUpdateCustomerStatus,
} = require("../controllers/customerController");

// customer create and get
router.route("/").get(getAllCustomer).post(singleCreateCustomer);

// single customer status update
router.put("/status/:id", singleUpdateCustomerStatus);

// customer by id single get, update, and delete
router
  .route("/:id")
  .get(getSingleCustomer)
  .put(singleUpdateCustomer)
  .delete(singleDeleteCustomer);

module.exports = router;
