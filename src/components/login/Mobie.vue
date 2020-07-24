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
import login from "./login";
export default {
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        login() {
            if (this.user.email && this.user.password) {
                login(this.user, "/m");
            } else {
                Toast({
                    message: "数据为空",
                    iconClass: "el-icon-error",
                });
            }
        },
    },
};
</script>

<style>
</style>