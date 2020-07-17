<template>
    <div id="login">
        <div class="container">
            <div class="header">
                <h1>MIX</h1>
            </div>
            <div class="body">
                <el-form class="login-container" :model="user" ref="loginForm">
                    <el-form-item label>
                        <el-input type="email" autocomplete="off" placeholder="邮箱" v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item labe>
                        <el-input type="password" autocomplete="off" placeholder="密码" v-model="user.password"
                            @keyup.enter="login">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" style="width: 100%;" @click="login">GO</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>
    </div>

</template>

<script>
    import {
        Toast
    } from 'mint-ui';
    import http from "@/http/index.js";
    import utils from "@/utils/utils.js";
    export default {
        data() {
            let os = utils.os();
            return {
                user: {
                    email: '',
                    password: ''
                },
                isMobie: os.isMobie
            }
        },
        methods: {
            login() {
                if (this.user.email && this.user.password) {
                    http.post("login", this.user).then(res => {
                        if (res.code == 200) {
                            Toast({
                                message: '登录成功',
                                position: 'bottom',
                                duration: 1000
                            });
                            let user = {
                                username: res.data.username,
                                email: this.user.email,
                                token: res.data.token,
                            }
                            this.$store.commit("SetUser", user);
                            utils.setCookie('token', res.data.token, res.data.expire);
                            utils.setCookie('username', res.data.username, res.data.expire);
                            utils.setCookie('email', this.user.email, res.data.expire);
                            if (this.isMobie) {
                                this.$router.push("/m")
                            } else {
                                this.$router.push("/")
                            }
                        } else {
                            Toast({
                                message: res.error,
                                iconClass: 'el-icon-error'
                            });
                        }
                    }).catch(err => {
                        Toast({
                            message: '连接出错',
                            iconClass: 'el-icon-error'
                        });
                    })
                } else {
                    Toast({
                        message: '数据为空',
                        iconClass: 'el-icon-error'
                    });
                }

            }
        }

    }
</script>

<style scoped>
    #login {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
        color: #ffffff;
        background-color: #20a53a;
    }

    .container {
        width: 100%;
        max-width: 400px;
        box-sizing: border-box;
        margin-bottom: 100px;
    }

    .header {
        font-size: 2em;
        text-align: center;

    }

    .header h1 {
        text-shadow: 3px 3px 1px #ccc;
        letter-spacing: 5px;
    }

    .body {
        width: 75%;
        margin: auto;

    }


    .container .form {
        display: flex;
        flex-direction: column;
    }

    button {
        background-color: #ffffff;
        border-color: #20a53a;
        color: #20a53a;
        font-size: 16px;
        font-weight: 600;
    }
</style>