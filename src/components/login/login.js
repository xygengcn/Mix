import { Toast } from "mint-ui";
import http from "@/http/index.js";
import utils from "@/utils/utils.js";
import store from "@/store/index";
import router from "@/router/index";

var login = function (params, to) {
    http.post("login", params)
        .then(res => {
            if (res.code == 200) {
                Toast({
                    message: "登录成功",
                    position: "bottom",
                    duration: 1000
                });
                store.commit("SetUser", {
                    username: res.data.username,
                    email: res.data.email,
                    token: res.data.token
                });
                utils.setCookie(
                    "token",
                    res.data.token,
                    res.data.expire
                );
                utils.setCookie(
                    "username",
                    res.data.username,
                    res.data.expire
                );
                utils.setCookie(
                    "email",
                    res.data.email,
                    res.data.expire
                );
                router.push(to);
            } else {
                Toast({
                    message: res.error,
                    iconClass: "el-icon-error"
                });
            }
        })
        .catch(() => {
            Toast({
                message: "连接出错",
                iconClass: "el-icon-error"
            });
        });
}

export default login;