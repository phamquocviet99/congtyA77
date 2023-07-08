import axiosClient from "./axiosClient";

const categoryActivityApi = {
  getAll: (params) => {
    const url = "/categoryActivity";
    return axiosClient.get(url, { params });
  },
  create: (data) => {
    const url = "/categoryActivity";
    return axiosClient.post(url, data);
  },
  remove: (id) => {
    const url = `/categoryActivity/${id}`;
    return axiosClient.delete(url);
  },
  update: (id, data) => {
    const url = `/categoryActivity/${id}`;
    return axiosClient.put(url, data);
  },
};

export default categoryActivityApi;