const { s3FileUploadV2, s3FileDeleteV2 } = require("../middleware/s3Service");

// image uploader
const imageUploader = async (req, res) => {
  try {
    const results = await s3FileUploadV2(req.files);

    res.send({ message: "success", data: results });
  } catch (error) {
    console.log(error);
  }
};

// image delete
const imageDelete = async (req, res) => {
  try {
    await s3FileDeleteV2(req.body.imageKey);

    res.send({ message: "image deleted successfully" });
  } catch (error) {
    console.log("error ======>", error);
  }
};

module.exports = { imageUploader, imageDelete };
