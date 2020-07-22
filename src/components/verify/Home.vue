<template>
    <div class="verify">
        <mt-header fixed title="安全验证" class="header">
            <router-link to="/m/setting" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <div class="box" v-if="verify_code">
                <h2>动态安全码</h2>
                <ul class="number">
                    <li v-for="(item,key) in verify_codes" :key="key">
                        <span>{{item}}</span>
                    </li>
                </ul>
                <p class="timeShow">{{timeShow}}s后刷新</p>
            </div>
        </div>
    </div>
</template>

<script>
import http from "@/http/index.js";
import { Toast, MessageBox, Indicator } from "mint-ui";
export default {
    data() {
        return {
            verify_code: null,
            time: null,
            timeShow: 30,
            password: ""
        };
    },
    computed: {
        verify_codes() {
            if (this.verify_code) {
                return String(this.verify_code).split("");
            } else {
                return null;
            }
        }
    },
    methods: {
        post() {
            http.post("verifyCode", {
                email: this.$store.state.user.email,
                username: this.$store.state.user.username,
                password: this.password
            })
                .then(res => {
                    if (res.code == 200) {
                        Indicator.close();
                        this.verify_code = res.data.code;
                    } else {
                        Indicator.close();
                        Toast(res.error);
                        this.$router.back(-1);
                    }
                })
                .catch(err => {
                    Indicator.close();
                    console.log(err);
                    this.$router.back(-1);
                });
        },
        getVerifyCode() {
            this.time = setInterval(() => {
                if (this.timeShow == 0) {
                    this.post();
                    this.timeShow = 30;
                } else {
                    this.timeShow--;
                }
            }, 1000);
        },
        verifyPass() {
            MessageBox.prompt(" ", "验证密码", { inputType: "password" })
                .then(({ value, action }) => {
                    if (value) {
                        this.password = value;
                        Indicator.open();
                        this.post();
                        this.getVerifyCode();
                    } else {
                        Toast("输入为空！");
                        Indicator.close();
                        this.$router.back(-1);
                    }
                })
                .catch(err => {
                    console.log(err);
                    Indicator.close();
                    this.$router.back(-1);
                });
        }
    },
    created() {
        this.verifyPass();
    },
    beforeDestroy() {
        this.time && clearInterval(this.time);
        this.time = null;
    }
};
</script>

<style scoped>
.verify,
.container {
    height: 100%;
}
.header {
    background-color: #20a53a;
}

.container {
    display: flex;
    align-items: center;
    height: 100%;
}
.box {
    width: 100%;
    position: relative;
    top: -50px;
}
.box h2 {
    text-align: center;
    color: #333;
    margin: 0px 0px 50px;
}
.box .number {
    display: flex;
    width: 90%;
    margin: 0px auto;
    text-align: center;
}
.box .number li {
    flex: 1;
    background-color: #fff;
    color: #20a53a;
    font-size: 2em;
    margin: 10px;
    border: solid 1px #efefef;
    box-shadow: 1px 1px 1px #efefef;
    line-height: 60px;
}
.box .timeShow {
    font-size: 12px;
    text-align: center;
    margin-top: 50px;
}
</style>