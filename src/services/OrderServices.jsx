import requests from "./httpService";

const OrderServices = {
  // get all order
  getAllOrder: async ({
    page = 1,
    limit = 10,
    status = "",
    endDate = "",
    startDate = "",
    searchText = "",
    shippingAddress = "",
  }) => {
    return requests.get(
      `/order?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}&status=${status}&searchText=${searchText}&shippingAddress=${shippingAddress}`
    );
  },
  // single create order
  singleCreateOrder: async (body) => {
    return requests.post("/order", body);
  },
  // get single order
  getSingleOrder: async (id) => {
    return requests.get(`/order/${id}`);
  },
  // get single customer order
  getSingleCustomerOrder: async (id) => {
    return requests.get(`/order/customer/${id}`);
  },
  // single update order
  singleUpdateOrder: async (id, body) => {
    return requests.put(`/order/${id}`, body);
  },
  // single update order status
  singleUpdateOrderStatus: async (id, body) => {
    return requests.put(`/order/status/${id}`, body);
  },
  // single delete order
  singleDeleteOrder: async (id, body) => {
    return requests.delete(`/order/${id}`, body);
  },
};

export default OrderServices;
