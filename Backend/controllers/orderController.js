const Order = require("../models/Order");

// get all order
const getAllOrder = async (req, res) => {
  try {
    const queryObject = {};

    const {
      page,
      limit,
      status,
      endDate,
      startDate,
      searchText,
      shippingAddress,
    } = req.query;

    if (searchText) {
      queryObject.invoice = { $regex: searchText, $options: "i" };
    }

    if (shippingAddress) {
      queryObject.shippingAddress = { $regex: shippingAddress, $options: "i" };
    }

    if (status) {
      queryObject.status = status;
    }

    if (startDate && endDate) {
      queryObject.createdAt = { $gte: startDate, $lte: endDate };
    }

    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;

    const totalDoc = await Order.countDocuments(queryObject);
    const orders = await Order.find(queryObject)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limits);

    res.status(200).json({
      pages,
      limits,
      count: totalDoc,
      data: orders,
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

// single create order
const singleCreateOrder = async (req, res) => {
  try {
    let order = new Order({ ...req.body });
    await order.save();

    res.status(201).json({
      message: "Order created Successfully",
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

// get single order
const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    res.status(200).json({
      data: order,
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

// get single customer order
const getSingleCustomerOrder = async (req, res) => {
  try {
    const order = await Order.find({ customer: req.params.id });

    res.status(200).json({
      data: order,
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

// single update order
const singleUpdateOrder = async (req, res) => {
  try {
    await Order.findOneAndUpdate({ _id: req.params.id }, { ...req.body });

    res.status(201).json({
      message: "Order updated successfully!",
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

// single update product status
const singleUpdateOrderStatus = async (req, res) => {
  try {
    const status = req.body.status;

    await Order.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: status,
        },
      }
    );

    res.status(200).send({
      message: `Order ${status} Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// single delete order
const singleDeleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Order deleted Successfully!",
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
  getAllOrder,
  getSingleOrder,
  singleCreateOrder,
  singleUpdateOrder,
  singleDeleteOrder,
  getSingleCustomerOrder,
  singleUpdateOrderStatus,
};
