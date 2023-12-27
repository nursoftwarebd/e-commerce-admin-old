const Coupon = require("../models/Coupon");

// get all coupon
const getAllCoupon = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;

    const totalDoc = await Coupon.countDocuments({});
    const coupons = await Coupon.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limits);

    res.status(200).json({
      pages,
      limits,
      count: totalDoc,
      data: coupons,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// single create coupon
const singleCreateCoupon = async (req, res) => {
  try {
    let coupon = new Coupon({ ...req.body });
    await coupon.save();

    res.status(201).json({
      message: "Coupon created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// get single coupon
const getSingleCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    res.status(200).json({
      data: coupon,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// single update coupon
const singleUpdateCoupon = async (req, res) => {
  try {
    await Coupon.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        code: req.body.code,
        orderBy: req.body.orderBy,
        endDate: req.body.endDate,
        discount: req.body.discount,
        startDate: req.body.startDate,
        amountType: req.body.amountType,
      }
    );

    res.status(201).json({
      message: "Coupon updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// single update coupon status
const singleUpdateCouponStatus = async (req, res) => {
  try {
    const status = req.body.status;

    await Coupon.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: status,
        },
      }
    );

    res.status(200).send({
      message: `Coupon ${
        status === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// single delete coupon
const singleDeleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Coupon deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

module.exports = {
  getAllCoupon,
  getSingleCoupon,
  singleCreateCoupon,
  singleUpdateCoupon,
  singleDeleteCoupon,
  singleUpdateCouponStatus,
};
