const { s3FileDeleteV2 } = require("../middleware/s3Service");
const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");

// get all customer
const getAllCustomer = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;

    const totalDoc = await Customer.countDocuments({});

    const customers = await Customer.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limits);

    res.status(200).json({
      pages,
      limits,
      count: totalDoc,
      data: customers,
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

// single create customer
const singleCreateCustomer = async (req, res) => {
  try {
    let customer = new Customer({
      ...req.body,
      password: bcrypt.hashSync(req.body.password),
    });
    await customer.save();

    res.status(201).json({
      message: "Customer created Successfully",
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

// get single customer
const getSingleCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    res.status(200).json({
      data: customer,
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

// single update customer
const singleUpdateCustomer = async (req, res) => {
  try {
    const updateData = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      {
        age: req.body.age,
        name: req.body.name,
        image: req.body.image,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
        address: req.body.address,
        shippingAddress: req.body.shippingAddress,
      }
    );
    await s3FileDeleteV2(updateData?.image?.Key);

    res.status(201).json({
      message: "Customer updated successfully!",
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

// single update customer status
const singleUpdateCustomerStatus = async (req, res) => {
  try {
    const status = req.body.status;

    await Customer.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: status,
        },
      }
    );

    res.status(200).send({
      message: `Customer ${
        status === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// single delete customer
const singleDeleteCustomer = async (req, res) => {
  try {
    const deleteData = await Customer.findByIdAndDelete(req.params.id);
    await s3FileDeleteV2(deleteData?.image?.Key);

    res.status(200).json({
      message: "Customer deleted Successfully!",
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
  getAllCustomer,
  getSingleCustomer,
  singleCreateCustomer,
  singleUpdateCustomer,
  singleDeleteCustomer,
  singleUpdateCustomerStatus,
};
