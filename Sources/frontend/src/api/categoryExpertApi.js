import axiosClient from "./axiosClient"


const categoriesExpertApi = {
    getAll : (params) => {
        const url =  '/categoryExpert'
        return axiosClient.get(url, {params});
    },
    create: (data) => {
        const url = "/categoryExpert";
        return axiosClient.post(url, data);
      },
      remove: (id) => {
        const url = `/categoryExpert/${id}`;
        return axiosClient.delete(url);
      },
      update: (id, data) => {
        const url = `/categoryExpert/${id}`;
        return axiosClient.put(url, data);
      },
}

export default categoriesExpertApi;