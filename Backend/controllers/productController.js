const { s3FileDeleteV2 } = require("../middleware/s3Service");
const Product = require("../models/Product");

// get all product
const getAllProduct = async (req, res) => {
  try {
    const queryObject = {};
    const sortObject = {};

    const { searchText, category, price, page, limit } = req.query;

    if (searchText) {
      queryObject.name = { $regex: searchText, $options: "i" };
    }

    if (category) {
      queryObject.categories = category;
    }

    if (price === "low") {
      sortObject.price = 1;
    } else {
      sortObject.price = -1;
    }

    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;

    const totalDoc = await Product.countDocuments(queryObject);

    const products = await Product.find(queryObject)
      .sort(sortObject || { createdAt: -1 })
      .skip(skip)
      .limit(limits)
      .populate("category", "name description image orderBy status parentId")
      .populate("categories", "name description image orderBy status parentId");

    res.status(200).json({
      pages,
      limits,
      data: products,
      count: totalDoc,
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

// single create product
const singleCreateProduct = async (req, res) => {
  try {
    let product = new Product({ ...req.body });
    await product.save();

    res.status(201).json({
      message: "Product created Successfully",
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

// get single product
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categories", "_id name")
      .populate("category", "_id name");

    res.status(200).json({
      data: product,
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

// single update product
const singleUpdateProduct = async (req, res) => {
  console.log("req body", req.body);

  try {
    const updateData = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        sku: req.body.sku,
        name: req.body.name,
        slug: req.body.slug,
        price: req.body.price,
        stock: req.body.stock,
        images: req.body.images,
        barCode: req.body.barCode,
        orderBy: req.body.orderBy,
        category: req.body.category,
        salePrice: req.body.salePrice,
        categories: req.body.categories,
        description: req.body.description,
        bestSelling: req.body.bestSelling,
      }
    );
    await s3FileDeleteV2(updateData?.image?.Key);

    res.status(201).json({
      message: "Product updated successfully!",
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
const singleUpdateProductStatus = async (req, res) => {
  try {
    const status = req.body.status;

    await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: status,
        },
      }
    );

    res.status(200).send({
      message: `Product ${
        status === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// single update product featured
const singleUpdateProductFeatured = async (req, res) => {
  try {
    let featured = req.body.featured;

    await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          featured: featured,
        },
      }
    );

    res.status(200).send({
      message: `Product Featured ${
        featured === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// single delete product
const singleDeleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted Successfully!",
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
  getAllProduct,
  getSingleProduct,
  singleUpdateProduct,
  singleDeleteProduct,
  singleCreateProduct,
  singleUpdateProductStatus,
  singleUpdateProductFeatured,
};
