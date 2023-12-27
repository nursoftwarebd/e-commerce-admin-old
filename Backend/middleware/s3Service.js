const { S3 } = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const uuid = require("uuid").v4;

const s3FileUploadV2 = async (files) => {
  const s3 = new S3();

  const params = files.map((file) => {
    const fileName = `${uuid()}-${file.originalname}`;

    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${fileName}`,
      Body: file.buffer,
    };
  });

  try {
    return await Promise.all(
      params.map((param) => {
        return s3.upload(param).promise();
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const s3FileDeleteV2 = async (filePath) => {
  const s3 = new S3();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filePath,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { s3FileUploadV2, s3FileDeleteV2 };
