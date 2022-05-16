import axiosClient from "./axiosClient"


const InformationApi = {
    getAll : (params) => {
        const url =  '/inforCompany'
        return axiosClient.get(url, {params});
    },

    getById : (id) => {
        const url =  `/inforCompany/${id}`;
        return axiosClient.get(url);
    }
}

export default InformationApi;