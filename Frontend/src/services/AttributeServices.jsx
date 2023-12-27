import requests from "./httpService";

const AttributeServices = {
  // get all attribute
  getAllAttribute: async () => {
    return requests.get("/attribute");
  },
  // single create attribute
  singleCreateAttribute: async (body) => {
    return requests.post("/attribute", body);
  },
  // single get attribute
  getSingleAttribute: async (id) => {
    return requests.get(`/attribute/${id}`);
  },
  // single update attribute
  singleUpdateAttribute: async (id, body) => {
    return requests.put(`/attribute/${id}`, body);
  },
  // single update attribute status
  singleUpdateAttributeStatus: async (id, body) => {
    return requests.put(`/attribute/status/${id}`, body);
  },
  // single delete attribute
  singleDeleteAttribute: async (id, body) => {
    return requests.delete(`/attribute/${id}`, body);
  },
  // single variant create
  singleCreateAttributeVariant: async (id, body) => {
    return requests.post(`/attribute/single/variant/${id}`, body);
  },
  // single variant update
  singleUpdateAttributeVariant: async (id, body) => {
    return requests.put(`/attribute/single/variant/${id}`, body);
  },
  // single variant update
  singleUpdateAttributeVariantStatus: async (id, body) => {
    return requests.put(`/attribute/single/variant/status/${id}`, body);
  },
  // single variant delete
  singleDeleteAttributeVariant: async (id) => {
    return requests.delete(`/attribute/single/variant/${id}`);
  },
};

export default AttributeServices;
