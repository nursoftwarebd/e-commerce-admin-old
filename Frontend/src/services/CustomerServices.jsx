import requests from "./httpService";

const CustomerServices = {
  // GET
  getAllCustomer: async () => {
    return requests.get("/customer");
  },
  // POST
  singleCreateCustomer: async (body) => {
    return requests.post("/customer", body);
  },
  // GET BY ID
  getSingleCustomer: async (id) => {
    return requests.get(`/customer/${id}`);
  },
  // PUT - Update
  singleUpdateCustomer: async (id, body) => {
    return requests.put(`/customer/${id}`, body);
  },
  // single update customer status
  singleUpdateCustomerStatus: async (id, body) => {
    return requests.put(`/customer/status/${id}`, body);
  },
  // DELETE
  singleDeleteCustomer: async (id, body) => {
    return requests.delete(`/customer/${id}`, body);
  },
};

export default CustomerServices;
