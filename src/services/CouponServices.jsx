import requests from "./httpService";

const CouponsServices = {
  // GET
  getAllCoupons: async () => {
    return requests.get("/coupons");
  },
  // POST
  singleCreateCoupons: async (body) => {
    return requests.post("/coupons", body);
  },
  // GET BY ID
  getSingleCoupons: async (id) => {
    return requests.get(`/coupons/${id}`);
  },
  // PUT - Update
  singleUpdateCoupons: async (id, body) => {
    return requests.put(`/coupons/${id}`, body);
  },
  // DELETE
  singleDeleteCoupons: async (id, body) => {
    return requests.delete(`/coupons/${id}`, body);
  },
};

export default CouponsServices;
