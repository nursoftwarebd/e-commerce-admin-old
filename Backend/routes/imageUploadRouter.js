const router = require("express").Router();
const {
  imageUploader,
  imageDelete,
} = require("../controllers/imageUploadController");
const upload = require("../middleware/fileUploader");

router.post("/", upload.array("files"), imageUploader);

router.post("/delete", imageDelete);

module.exports = router;
