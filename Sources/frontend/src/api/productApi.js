import axiosClient from "./axiosClient";

const productsApi = {
  getAll: (params) => {
    const url = "/product";
    return axiosClient.get(url, { params });
  },

  getById: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
  getByIdCategory: (id, params) => {
    const url = `/product/IdCate/${id}`;
    return axiosClient.get(url, { params });
  },
  getByIdBrand: (id, params) => {
    const url = `/product/IdBrand/${id}`;
    return axiosClient.get(url, { params });
  },
  remove: (id) => {
    const url = `/product/${id}`;
    return axiosClient.delete(url);
  },
  create: (data) => {
    const url = `/product`;
    return axiosClient.post(url, data);
  },
  update: (id, data) => {
    const url = `/product/${id}`;
    return axiosClient.put(url, data);
  },
};

export default productsApi;
