import axios from "axios";
// import router from "../router";
import user from "./handle/user"
import agent from "./handle/agent"
import {ElMessage} from "element-plus";
import account from "@/store/module/account"
import {getCookie} from "@/utils/storage";
import program from "./handle/program";

const serviceList = [
    ...user,
    ...agent,
    ...program
]
export const serviceMap = {};

serviceList.forEach((v) => {
    serviceMap[v.name.trim()] = v;
});

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL || '',
    timeout: 15000,//设置默认超时时间
});

// 添加请求拦截器
const request = (config) => {
    config = config.serviceSet.requestHandle(config)
    config.headers.authorization = account.state.token || getCookie('token')
    return config
}

instance.interceptors.request.use(request)

// 添加响应拦截器
const response = (response) => {
    if (response.data.status == '1') {
        !response.config.noMessage && ElMessage.error(response.data.message)
        return response.data
    }
    //接口请求成功提示
    !response.config.noMessage && ElMessage.success(response.data.message)
    //给响应校验通过,加一个状态
    return {
        ...response.data,
        state: true,
    }
}

// 对响应错误做点什么
const responseError = (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error);
}

instance.interceptors.response.use(response, responseError)

export const service = (name, config = {}) => {
    if (!name || !serviceMap[name.trim()]) {
        return Promise.reject(new Error("无此服务"));
    }

    let serviceSet = serviceMap[name.trim()];

    let url = serviceSet.url

    let serviceConfig = {
        url,
        serviceSet,
        method: serviceSet.method || "post",
        ...config,
    }
    return instance(serviceConfig);
};