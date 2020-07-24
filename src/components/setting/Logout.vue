<template>
    <div class="logout" @click="logout">退出登录</div>
</template>

<script>
import { MessageBox } from "mint-ui";
import utils from "@/utils/utils.js";
import http from "@/http/index.js";
export default {
    data() {
        return {
            isMobie: utils.os().isMobie,
        };
    },
    methods: {
        logout() {
            if (this.isMobie) {
                MessageBox({
                    title: "提示",
                    message: "确定退出账号！",
                    showCancelButton: true,
                })
                    .then((action) => {
                        if (action == "confirm") {
                            http.get("logout").then((res) => {
                                utils.clearCookie("token");
                                this.$router.push("/login");
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                this.$confirm("是否退出登录？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        utils.clearCookie("token");
                        this.$router.push("/login");
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消操作",
                        });
                    });
            }
        },
    },
};
</script>

<style>
</style>