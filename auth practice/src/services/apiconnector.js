import axios  from "axios";

const axiosInstance = axios.create({});

function apiConnector(url,method,data,headers){
    return axiosInstance({
        url : `${url}`,
        method : `${method}`,
        data : data ? data : null,
        headers : headers ? headers : null,
    })
}

export default apiConnector;