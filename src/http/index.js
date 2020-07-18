import axios from "axios";
import utils from "@/utils/utils.js"
var http = {
    host: "http://api.cn",
    api: {
        "one": "/one",
        "bing": "/bing/url",
        "date": "/day",
        "news": "/news",
        "serverNetwork": "/bt/GetNetWork",
        "login": "/user/login",
        "soccerList": "/sports/soccer",
        "apiTotal": "/api/total"
    },
    headers: {
        "token": utils.getCookie("token")
    }
}
axios.defaults.baseURL = http.host;
http.get = function (api, data) {
    return new Promise((resolve, reject) => {
        axios.get(this.api[api], {
            headers: http.headers,
            params: data
        }).then(function (res) {
            resolve(res.data);
        })
            .catch(err => {
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