require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// internal imports
const databaseConnection = require("../config/dbConnection");
const appRoute = require("../routes/appRoute");
const categoryRoute = require("../routes/categoryRoute");
const productRoute = require("../routes/productRoute");
const orderRoute = require("../routes/orderRoute");
const adminRoute = require("../routes/adminRoute");
const customerRoute = require("../routes/customerRoute");
const bannerRoute = require("../routes/bannerRoute");
const imageUploadRouter = require("../routes/imageUploadRouter");
const { notFoundHandler, errorHandler } = require("../middleware/errorHandler");
const { isAuth } = require("../middleware/auth");
const attributeRoute = require("../routes/attributeRoute");
const couponRoute = require("../routes/couponRoute");
const frontendRoute = require("../routes/frontendRoute");

const port = process.env.PORT || 5000;

const app = express();

// global middleware
app.use([
  cors(),
  morgan("dev"),
  express.json(),
  bodyParser.json(),
  express.urlencoded({ extended: true }),
]);
// database connection
databaseConnection();

// ========== all routes =============
app.use("/", appRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/customer", customerRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/banner", bannerRoute);
app.use("/api/v1/attribute", attributeRoute);
app.use("/api/v1/coupons", couponRoute);
app.use("/api/v1/image-upload", imageUploadRouter);
app.use("/api/v1/frontend", frontendRoute);
// ========== all routes ===============

// error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
