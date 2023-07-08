import axiosClient from "./axiosClient"


const expertApi = {
    getAll : () => {
        const url =  '/expert'
        return axiosClient.get(url);
    },

    getById : (id) => {
        const url =  `/expert/${id}`;
        return axiosClient.get(url);
    },
    getByIdCategory : (id) => {
        const url =  `/expert/IdCate/${id}`;
        return axiosClient.get(url);
    },
    create :(data)=>{
        const url =  `/expert`;
        return axiosClient.post(url,data);
    },
    update :(id,data)=>{
        const url =  `/expert/${id}`;
        return axiosClient.put(url,data);
    },
    remove : (id)=>{
        const url =  `/expert/${id}`;
        return axiosClient.delete(url);
    }
}

export default expertApi;