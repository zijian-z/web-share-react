import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 403) {
        window.alert('请先登录');
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

export default instance;
