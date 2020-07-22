<template>
    <el-form class="login-container" :model="user" ref="loginForm">
        <el-form-item label>
            <el-input type="email" autocomplete="off" placeholder="邮箱" v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label>
            <el-input
                type="password"
                autocomplete="off"
                placeholder="密码"
                v-model="user.password"
                @keyup.enter="login"
            ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="success" style="width: 100%;" @click="login">GO</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { Toast } from "mint-ui";
import http from "@/http/index.js";
import utils from "@/utils/utils.js";
export default {
    data() {
        return {
            user: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        login() {
            if (this.user.email && this.user.password) {
                http.post("login", this.user)
                    .then(res => {
                        if (res.code == 200) {
                            Toast({
                                message: "登录成功",
                                position: "bottom",
                                duration: 1000
                            });
                            let user = {
                                username: res.data.username,
                                email: this.user.email,
                                token: res.data.token
                            };
                            this.$store.commit("SetUser", user);
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
                                this.user.email,
                                res.data.expire
                            );
                            this.$router.push("/m");
                        } else {
                            Toast({
                                message: res.error,
                                iconClass: "el-icon-error"
                            });
                        }
                    })
                    .catch(err => {
                        Toast({
                            message: "连接出错",
                            iconClass: "el-icon-error"
                        });
                    });
            } else {
                Toast({
                    message: "数据为空",
                    iconClass: "el-icon-error"
                });
            }
        }
    }
};
</script>

<style>
</style>