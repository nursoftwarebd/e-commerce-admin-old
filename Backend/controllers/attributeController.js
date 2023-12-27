const Attribute = require("../models/Attribute");
const ObjectId = require("mongoose").Types.ObjectId;

// get all attribute
const getAllAttribute = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;

    const totalCount = await Attribute.countDocuments({});

    const attributes = await Attribute.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limits);

    res.status(200).json({
      pages,
      limits,
      count: totalCount,
      data: attributes,
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

// single create attribute
const singleCreateAttribute = async (req, res) => {
  try {
    let attribute = new Attribute({ ...req.body });
    await attribute.save();

    res.status(201).json({
      message: "Attribute created Successfully",
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

// get single attribute
const getSingleAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id);

    res.status(200).json({
      data: attribute,
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

// single update attribute
const singleUpdateAttribute = async (req, res) => {
  try {
    await Attribute.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body?.title,
        name: req.body?.name,
        options: req.body?.options,
        status: req.body?.status,
      }
    );

    res.status(201).json({
      message: "Attribute updated successfully!",
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

// single update attribute status
const singleUpdateAttributeStatus = async (req, res) => {
  try {
    const status = req.body.status;

    await Attribute.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: status,
        },
      }
    );

    res.status(200).send({
      message: `Attribute ${
        status === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// single delete attribute
const singleDeleteAttribute = async (req, res) => {
  try {
    await Attribute.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Attribute deleted Successfully!",
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

// attribute variant create
const singleCreateAttributeVariant = async (req, res) => {
  try {
    await Attribute.updateOne(
      { _id: req.params.id },
      {
        $push: {
          variants: {
            name: req.body.name,
            status: req.body.status,
          },
        },
      }
    );

    res.status(201).json({
      message: "Attribute variant created successfully!",
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

// single update attribute variant
const singleUpdateAttributeVariant = async (req, res) => {
  try {
    await Attribute.updateOne(
      { "variants._id": req.params.id },
      {
        $set: {
          "variants.$.name": req.body.name,
          "variants.$.status": req.body.status,
        },
      }
    );

    res.status(201).json({
      message: "Attribute variant single updated successfully!",
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

// single update attribute variant status
const singleUpdateAttributeVariantStatus = async (req, res) => {
  try {
    await Attribute.updateOne(
      { "variants._id": req.params.id },
      {
        $set: {
          "variants.$.status": req.body.status,
        },
      }
    );

    res.status(201).json({
      message: "Attribute variant single updated successfully!",
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

// single delete attribute variant sub object delete by _id
const singleDeleteAttributeVariant = async (req, res) => {
  try {
    await Attribute.updateOne(
      { "variants._id": req.params.id },
      {
        $pull: {
          variants: {
            _id: req.params.id,
          },
        },
      }
    );

    res.status(201).json({
      message: "Attribute variant single deleted successfully!",
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
  getAllAttribute,
  getSingleAttribute,
  singleCreateAttribute,
  singleUpdateAttribute,
  singleDeleteAttribute,
  singleUpdateAttributeStatus,
  singleUpdateAttributeVariant,
  singleDeleteAttributeVariant,
  singleCreateAttributeVariant,
  singleUpdateAttributeVariantStatus,
};
