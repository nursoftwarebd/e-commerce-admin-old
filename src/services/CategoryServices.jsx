import requests from "./httpService";

const CategoryServices = {
  getAllCategory: async () => {
    return requests.get("/category");
  },
  getAllParentCategory: async (body) => {
    return requests.get("/category/parent-category");
  },
  singleCreateCategory: async (body) => {
    return requests.post("/category", body);
  },
  getSingleCategory: async (id) => {
    return requests.get(`/category/${id}`);
  },
  singleUpdateCategory: async (id, body) => {
    return requests.put(`/category/${id}`, body);
  },
  singleUpdateCategoryStatus: async (id, body) => {
    return requests.put(`/category/status/${id}`, body);
  },
  singleDeleteCategory: async (id, body) => {
    return requests.delete(`/category/${id}`, body);
  },
};

export default CategoryServices;
