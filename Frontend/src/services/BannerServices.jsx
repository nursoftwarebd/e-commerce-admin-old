import requests from "./httpService";

const BannerServices = {
  // get all
  getAllBanner: async () => {
    return requests.get("/banner");
  },
  // single create banner
  singleCreateBanner: async (body) => {
    return requests.post("/banner", body);
  },
  // get single banner
  getSingleBanner: async (id) => {
    return requests.get(`/banner/${id}`);
  },
  // single update banner
  singleUpdateBanner: async (id, body) => {
    return requests.put(`/banner/${id}`, body);
  },
  // single update banner status
  singleUpdateBannerStatus: async (id, body) => {
    return requests.put(`/banner/status/${id}`, body);
  },
  // single delete banner
  singleDeleteBanner: async (id, body) => {
    return requests.delete(`/banner/${id}`, body);
  },
};

export default BannerServices;
