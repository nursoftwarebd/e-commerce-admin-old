const { s3FileDeleteV2 } = require("../middleware/s3Service");
const Banner = require("../models/Banner");

// get all banner
const getAllBanner = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;

    const totalCount = await Banner.countDocuments({});
    const banners = await Banner.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limits);

    res.status(200).json({
      pages,
      limits,
      data: banners,
      count: totalCount,
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

// single create banner
const singleCreateBanner = async (req, res) => {
  try {
    let banner = new Banner({ ...req.body });
    await banner.save();

    res.status(201).json({
      message: "Banner created Successfully",
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

// get single banner
const getSingleBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    res.status(200).json({
      data: banner,
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

// single update banner
const singleUpdateBanner = async (req, res) => {
  try {
    const updateData = await Banner.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        link: req.body.link,
        image: req.body.image,
        orderBy: req.body.orderBy,
        description: req.body.description,
      }
    );
    await s3FileDeleteV2(updateData?.image?.Key);

    res.status(201).json({
      message: "Banner updated successfully!",
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

// single update banner status
const singleUpdateBannerStatus = async (req, res) => {
  try {
    const status = req.body.status;

    await Banner.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: status,
        },
      }
    );

    res.status(200).send({
      message: `Banner ${
        status === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// single delete banner
const singleDeleteBanner = async (req, res) => {
  try {
    const deleteData = await Banner.findByIdAndDelete(req.params.id);
    await s3FileDeleteV2(deleteData?.image?.Key);

    res.status(200).json({
      message: "Banner deleted Successfully!",
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
  getAllBanner,
  getSingleBanner,
  singleCreateBanner,
  singleUpdateBanner,
  singleDeleteBanner,
  singleUpdateBannerStatus,
};
