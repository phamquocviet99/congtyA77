import axiosClient from "./axiosClient"


const activytiApi = {
    getAll : (params) => {
        const url =  '/activity'
        return axiosClient.get(url, {params});
    },

    getById : (id) => {
        const url =  `/activity/${id}`;
        return axiosClient.get(url);
    },
    getByIdCategory: (id, params) => {
        const url = `/activity/IdCate/${id}`;
        return axiosClient.get(url, { params });
      },
    create :(data)=>{
        const url =  `/activity`;
        return axiosClient.post(url,data);
    },
    update :(id,data)=>{
        const url =  `/activity/${id}`;
        return axiosClient.put(url,data);
    },
    remove : (id)=>{
        const url =  `/activity/${id}`;
        return axiosClient.delete(url);
    }
}

export default activytiApi;