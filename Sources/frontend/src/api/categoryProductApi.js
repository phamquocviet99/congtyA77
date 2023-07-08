import axiosClient from "./axiosClient";

const categoriesApi = {
  getAll: (params) => {
    const url = "/categories_project";
    return axiosClient.get(url, { params });
  },
  create: (data) => {
    const url = "/categories_project";
    return axiosClient.post(url, data);
  },
  remove: (id) => {
    const url = `/categories_project/${id}`;
    return axiosClient.delete(url);
  },
  update: (id, data) => {
    const url = `/categories_project/${id}`;
    return axiosClient.put(url, data);
  },
};

export default categoriesApi;