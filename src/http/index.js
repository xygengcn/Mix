import axios from "axios";
import utils from "@/utils/utils.js"
var http = {
    api: {
        "one": "https://api.xygeng.cn/one",
        "bing": "https://api.xygeng.cn/bing/url",
        "date": "https://api.xygeng.cn/day",
        "news": "https://api.xygeng.cn/news",
        "serverNetwork": "https://api.xygeng.cn/bt/GetNetWork",
        "login": "https://api.xygeng.cn/user/login",
        "soccerList": "https://api.xygeng.cn/sports/soccer",
        "apiTotal": "https://api.xygeng.cn/api/total"
    },
    headers: {
        "token": utils.getCookie("token")
    }
}
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
        axios.post(this.api[api], postData, http.headers, ).then(function (res) {
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