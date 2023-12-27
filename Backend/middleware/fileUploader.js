const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();

// multer file upload object
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
    files: 3,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      const error = new Error(
        "Only .jpg, .jpeg, .webp and .png format allowed!"
      );
      error.status = 500;
      cb(error);
    }
  },
});

const image = express();

// error handling
image.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was an upload error");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("success");
  }
});

module.exports = upload;
