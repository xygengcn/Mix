import axios from "axios";
import utils from "@/utils/utils.js"
var http = {
    PRO_HOST: "https://api.xygeng.cn",
    DEV_HOST: "http://api.cn",
    api: require("./api.json"),
    headers: {
        "token": utils.getCookie("token")
    }
}
if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = http.DEV_HOST;
} else {
    axios.defaults.baseURL = http.PRO_HOST;
}
http.get = function (api, data) {
    return new Promise((resolve, reject) => {
        axios.get(this.api[api], {
            headers: http.headers,
            params: data
        }).then(function (res) {
            resolve(res.data);
        }).catch(err => {
            reject(err)
        });
    })
}
http.post = function (api, data) {
    let postData = new FormData();
    for (let item in data) {
        if (typeof data[item] == 'string') {
            postData.append(item, data[item]);
        } else {
            postData.append(item, JSON.stringify(data[item]));
        }
    };
    return new Promise((resolve, reject) => {
        axios.post(this.api[api], postData, http.headers,).then(function (res) {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                reject(res)
            }
        })
            .catch(err => {
                console.log(err.error);
                reject(err)
            });
    })
}
export default http;