const router = require("express").Router();
const {
  getAllAdmin,
  adminSignIn,
  adminSignUp,
  getSingleAdmin,
  singleDeleteAdmin,
  singleCreateAdmin,
  singleUpdateAdmin,
  singleUpdateAdminStatus,
} = require("../controllers/adminController");
const { isAuth } = require("../middleware/auth");

// admin create and get
router.route("/").get(getAllAdmin).post(isAuth, singleCreateAdmin);

// admin by id single get, update, and delete
router
  .route("/:id")
  .get(isAuth, getSingleAdmin)
  .put(isAuth, singleUpdateAdmin)
  .delete(isAuth, singleDeleteAdmin);

// show/hide a category
router.put("/status/:id", singleUpdateAdminStatus);

// admin sing in
router.post("/signIn", adminSignIn);

// admin sing up
router.post("/signUp", adminSignUp);

module.exports = router;
