
import axiosClient from "./axiosClient";

const brandsApi = {
  getAll: (params) => {
    const url = "/brand";
    return axiosClient.get(url, { params });
  },
  getByIdCategory: (id) => {
    const url = `/brand/idCate/${id}`;
    return axiosClient.get(url);
  },
  create: (data) => {
    const url = "/brand";
    return axiosClient.post(url, data);
  },
  remove: (id) => {
    const url = `/brand/${id}`;
    return axiosClient.delete(url);
  },
  update: (id, data) => {
    const url = `/brand/${id}`;
    return axiosClient.put(url, data);
  },
};

export default brandsApi;