import requests from "./httpService";

const ImageUploadServices = {
  singleImageUpload: async (body) => {
    return requests.post("/image-upload", body);
  },
  singleImageDelete: async (body) => {
    return requests.post(`/image-upload/delete`, body);
  },
};

export default ImageUploadServices;
