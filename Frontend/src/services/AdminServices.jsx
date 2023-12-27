import requests from "./httpService";

const AdminServices = {
  adminSignUp: async (body) => {
    return requests.post("/admin/signUp", body);
  },
  adminSignIn: async (body) => {
    return requests.post("/admin/signIn", body);
  },
  getAllAdmin: async (body) => {
    return requests.get("/admin", body);
  },
  singleCreateAdmin: async (body) => {
    return requests.post("/admin", body);
  },
  getSingleAdmin: async (id,body) => {
    return requests.get(`/admin/${id}`, body);
  },
  singleUpdateAdmin: async (id,body) => {
    return requests.put(`/admin/${id}`, body);
  },
  singleDeleteAdmin: async (id,body) => {
    return requests.delete(`/admin/${id}`, body);
  },
}

export default AdminServices;
