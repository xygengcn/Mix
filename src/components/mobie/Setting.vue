<template>
    <div id="m-setting">
        <div class="container">
            <ul>
                <li>
                    <mt-cell title="当前用户" :value="user.username"></mt-cell>
                </li>
            </ul>
            <ul>
                <li>
                    <mt-cell title="关于MIX" :value="'版本 '+system.version"></mt-cell>
                </li>
                <li>
                    <mt-cell title="更新MIX">
                        <el-button type="primary" size="mini" @click="updata()">更新</el-button>
                    </mt-cell>
                </li>
            </ul>
            <ul>
                <div class="logout" @click="logout">退出登录</div>
            </ul>
        </div>
    </div>
</template>

<script>
import { Cell, MessageBox } from "mint-ui";
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
                    utils.clearCookie("token");
                    this.$router.push("/login");
                })
                .catch(err => {
                    console.log(err);
                });
        },
        updata() {
            window.location.reload(true);
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        system() {
            return this.$store.state.system;
        }
    }
};
</script>

<style scoped>
#m-setting {
    background-color: #efefef;
    height: 100%;
    overflow: hidden;
}

.container ul {
    box-sizing: border-box;
    margin: 15px 0px;
}

.logout {
    margin: 15px 0px;
    background-color: #fff;
    min-height: 48px;
    align-items: center;
    justify-content: center;
    display: flex;
}
</style>