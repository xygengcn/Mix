<template>
    <div class="logout" @click="logout">退出登录</div>
</template>

<script>
import { MessageBox } from "mint-ui";
import utils from "@/utils/utils.js";
export default {
    methods: {
        logout() {
            MessageBox({
                title: "提示",
                message: "确定退出账号！",
                showCancelButton: true
            })
                .then(action => {
                    if (action == "confirm") {
                        utils.clearCookie("token");
                        this.$router.push("/login");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style>
</style>