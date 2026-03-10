import axios from "axios";

export const axiosInstance = axios.create({
    timeout: 15000,
    headers: {
        Accept: "application/json",
    },
});

export const apiConnector=(method,url,bodyData,headers,params)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData?bodyData:null,
        headers:headers,
        params:params?params:null,
    })
}