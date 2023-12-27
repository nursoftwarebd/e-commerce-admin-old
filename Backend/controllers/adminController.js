const { signInToken } = require("../middleware/auth");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// get all admin
const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      data: admins,
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

// single create admin
const singleCreateAdmin = async (req, res) => {
  try {
    let admin = new Admin({ ...req.body });
    await admin.save();

    res.status(201).json({
      message: "Admin created Successfully",
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

// admin sing up
const adminSignUp = async (req, res) => {
  try {
    const adminFind = await Admin.findOne({ email: req.body.email });

    if (adminFind) {
      res.status(500).json({
        message: "already use this mail!",
      });
    } else {
      const adminInfo = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password),
      };

      let admin = new Admin(adminInfo);
      await admin.save();

      res.status(201).json({
        message: "Admin sing up Successfully",
      });
    }
  } catch (error) {
    console.log("error", error.message, error);
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// admin sing in
const adminSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && bcrypt.compareSync(password, admin.password)) {
      const token = signInToken(admin);

      res.status(201).json({
        token: `Bearer ${token}`,
        message: "Admin sing in Successfully",
      });
    } else {
      res.status(401).send({
        message: `Invalid Email or Password!`,
      });
    }
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

// get single admin
const getSingleAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    res.status(200).json({
      data: admin,
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

// single update admin
const singleUpdateAdmin = async (req, res) => {
  try {
    await Admin.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        image: req.body.image,
        age: req.body.age,
        address: req.body.address,
        role: req.body.role,
        status: req.body.status,
      }
    );

    res.status(201).json({
      message: "Admin updated successfully!",
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

// single update admin status
const singleUpdateAdminStatus = async (req, res) => {
  try {
    const status = req.body.status;

    await Admin.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: status,
        },
      }
    );

    res.status(200).send({
      message: `Admin ${
        status === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// single delete admin
const singleDeleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Admin deleted Successfully!",
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
  adminSignUp,
  adminSignIn,
  getAllAdmin,
  getSingleAdmin,
  singleUpdateAdmin,
  singleDeleteAdmin,
  singleCreateAdmin,
  singleUpdateAdminStatus,
};
