const Banner = require("../models/Banner");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

// frontend home page controller
const HomePageController = async (req, res) => {
  try {
    const banners = await Banner.find({ status: "show" }).limit(3);

    const featuredProducts = await Product.find({
      featured: "show",
    })
      .sort({ createdAt: -1 })
      .limit(8);

    const lastUpdatedProducts = await Product.find({
      status: "show",
    })
      .sort({ createdAt: -1 })
      .limit(8);

    res.status(200).json({
      message: "Success",
      banners,
      featuredProducts,
      lastUpdatedProducts,
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
// search page controller
const searchPageController = async (req, res) => {
  try {
    const queryObject = {};
    const sortObject = {};

    const { searchText, category, sort, page, limit } = req.query;

    if (searchText) {
      queryObject.$or = [
        { tags: { $in: [searchText] } },
        { name: { $regex: `${searchText}`, $options: "i" } },
        { description: { $regex: `${searchText}`, $options: "i" } },
      ];
    }

    if (category) {
      queryObject.categories = { $in: [category] };
    }

    queryObject.status = "show";

    if (sort === "low") {
      sortObject.price = 1;
    } else if (sort === "high") {
      sortObject.price = -1;
    } else if (sort === "asc") {
      sortObject.createdAt = 1;
    } else if (sort === "dsc") {
      sortObject.createdAt = -1;
    } else {
      sortObject.createdAt = -1;
    }

    const pages = Number(page) || 1;
    const limits = Number(limit) || 9;
    const skip = (pages - 1) * limits;

    const totalDoc = await Product.countDocuments(queryObject);

    const products = await Product.find(queryObject)
      .select("_id name slug price images tags")
      .sort(sortObject)
      .skip(skip)
      .limit(limits);

    res.status(200).json({
      pages,
      limits,
      count: totalDoc,
      message: "Success",
      data: products,
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
// product single page controller
const productSinglePageController = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("categories", "_id name slug")
      .populate("category", "_id name slug");

    const relatedProduct = await Product.find({
      status: "show",
      _id: { $ne: product?._id },
      category: product?.category?._id,
    }).limit(4);

    res.status(200).json({
      message: "Success",
      data: product,
      relatedProduct,
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
// product category page controller
const productCategoryPageController = async (req, res) => {
  try {
    const queryObject = {};
    const sortObject = {};

    const { categorySlug, sort, page, limit } = req.query;
    const pages = Number(page) || 1;
    const limits = Number(limit) || 9;
    const skip = (pages - 1) * limits;

    if (sort === "low") {
      sortObject.price = 1;
    } else if (sort === "high") {
      sortObject.price = -1;
    } else if (sort === "asc") {
      sortObject.createdAt = 1;
    } else if (sort === "dsc") {
      sortObject.createdAt = -1;
    } else {
      sortObject.createdAt = -1;
    }

    const category = await Category.findOne({ slug: categorySlug });

    // console.log("category", category._id);

    if (category) {
      // queryObject.category = category._id;
      // queryObject.categories = { $in: [category._id] };
      queryObject.categories = {
        $in: [category._id],
      };
    }

    const totalDoc = await Product.countDocuments(queryObject);

    const products = await Product.find(queryObject)
      .sort(sortObject)
      .skip(skip)
      .limit(limits)
      .populate("category", "name description image")
      .populate("categories", "name description image");

    res.status(200).json({
      pages,
      limits,
      data: products,
      count: totalDoc,
      message: "Success",
    });
  } catch (error) {}
};
// single order page controller
const getSingleOrderPageController = async (req, res) => {
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
// create order page controller
const createOrderPageController = async (req, res) => {
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

module.exports = {
  HomePageController,
  searchPageController,
  createOrderPageController,
  productSinglePageController,
  getSingleOrderPageController,
  productCategoryPageController,
};
