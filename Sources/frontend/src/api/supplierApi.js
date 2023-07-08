import axiosClient from "./axiosClient";

const suppliersApi = {
  getAll: (params) => {
    const url = "/supplier";
    return axiosClient.get(url, { params });
  },

  getById: (id) => {
    const url = `/supplier/${id}`;
    return axiosClient.get(url);
  },
  create: (data) => {
    const url = `/supplier`;
    return axiosClient.post(url, data);
  },
  remove: (id) => {
    const url = `/supplier/${id}`;
    return axiosClient.delete(url);
  },
  update: (id, data) => {
    const url = `/supplier/${id}`;
    return axiosClient.put(url, data);
  },
};

export default suppliersApi;
