const { s3FileDeleteV2 } = require("../middleware/s3Service");
const Category = require("../models/Category");

// get all category
const getAllCategory = async (req, res) => {
  try {
    const totalCount = await Category.countDocuments({});
    const categories = await Category.find({})
      .sort({ createdAt: -1 })
      .populate("parentCategory", "_id name slug description");

    res.status(200).json({
      totalCount,
      data: categories,
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

const getAllParentCategory = async (req, res) => {
  try {
    const categories = await Category.find({})
      .sort({ createdAt: -1 })
      .populate("parentCategory", "_id name slug description");

    const totalCategory = await Category.countDocuments();

    const categoryList = organizeCategories(categories);

    res.send({ message: "Success", data: categoryList, count: totalCategory });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// single create category
const singleCreateCategory = async (req, res) => {
  try {
    const data = {
      ...req.body,
      parentCategory: req.body.parentId,
    };

    let category = new Category(data);
    await category.save();

    res.status(201).json({
      message: "Category created Successfully",
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

// get single category
const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "parentCategory",
      "_id name description"
    );

    res.status(200).json({
      data: category,
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

// single update category
const singleUpdateCategory = async (req, res) => {
  try {
    const updateData = await Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        orderBy: req.body.orderBy,
        parentId: req.body.parentId,
        description: req.body.description,
        parentCategory: req.body.parentId,
      }
    );
    await s3FileDeleteV2(updateData?.image?.Key);

    res.status(201).json({
      message: "Category updated successfully!",
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

const singleUpdateCategoryStatus = async (req, res) => {
  try {
    const status = req.body.status;

    await Category.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: status,
        },
      }
    );
    res.status(200).send({
      message: `Category ${
        status === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// single delete category
const singleDeleteCategory = async (req, res) => {
  try {
    const deleteData = await Category.findByIdAndDelete(req.params.id);
    await s3FileDeleteV2(deleteData?.image?.Key);

    res.status(200).json({
      message: "Category deleted Successfully!",
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

const readyToParentAndChildrenCategory = (categories, parentId = null) => {
  const categoryList = [];
  let Categories;
  if (parentId == null) {
    Categories = categories.filter(
      (cat) =>
        cat.parentId == undefined || cat.parentId == "" || cat.parentId == null
    );
  } else {
    Categories = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of Categories) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      image: cate.image,
      orderBy: cate.orderBy,
      parentId: cate.parentId,
      status: cate.status,
      description: cate.description,
      parentCategory: cate.parentCategory,
      createdAt: cate.createdAt,
      updatedAt: cate.updatedAt,
      children: readyToParentAndChildrenCategory(categories, cate._id),
    });
  }

  return categoryList;
};

class Categories {
  constructor(
    _id,
    name,
    slug,
    image,
    status,
    orderBy,
    parentId,
    createdAt,
    updatedAt,
    description,
    parentCategory
  ) {
    this._id = _id;
    this.name = name;
    this.slug = slug;
    this.image = image;
    this.status = status;
    this.orderBy = orderBy;
    this.parentId = parentId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.description = description;
    this.parentCategory = parentCategory;
    this.children = [];
  }
}

function organizeCategories(data, parentId = null) {
  const categories = [];

  // Find all categories with the specified parentId
  let matchingCategories;

  if (parentId == null) {
    matchingCategories = data.filter(
      (cat) =>
        cat.parentId == undefined || cat.parentId == "" || cat.parentId == null
    );
  } else {
    matchingCategories = data.filter((cat) => cat.parentId == parentId);
  }

  // Create Category objects for each matching category
  matchingCategories.forEach((categoryData) => {
    const {
      _id,
      name,
      slug,
      image,
      status,
      orderBy,
      parentId,
      createdAt,
      updatedAt,
      description,
      parentCategory,
    } = categoryData;
    const category = new Categories(
      _id,
      name,
      slug,
      image,
      status,
      orderBy,
      parentId,
      createdAt,
      updatedAt,
      description,
      parentCategory
    );

    // Recursively organize subcategories
    const subcategories = organizeCategories(data, _id);
    category.children = subcategories;

    // Add the category to the parent's children
    categories.push(category);
  });

  return categories;
}

module.exports = {
  getAllCategory,
  getSingleCategory,
  getAllParentCategory,
  singleCreateCategory,
  singleUpdateCategory,
  singleDeleteCategory,
  singleUpdateCategoryStatus,
};
