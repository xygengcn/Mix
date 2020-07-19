<template>
    <div class="setting">
        <card :title="true">
            <div class="header" slot="header">系统设置</div>
            <div class="body" slot="body">
                <ul>
                    <li>
                        <div class="item">
                            <div class="left">当前用户</div>
                            <div class="right">{{user.username}}</div>
                        </div>
                    </li>
                    <li>
                        <div class="item">
                            <div class="left">关于MIX</div>
                            <div class="right">{{system.version}}</div>
                        </div>
                    </li>
                    <li style="text-align:center">
                        <el-button @click="logout" type="primary">退出登录</el-button>
                    </li>

                </ul>

            </div>
        </card>
    </div>
</template>

<script>
    import utils from '@/utils/utils.js'
    import card from "@/components/common/Card"
    export default {
        components: {
            card
        },
        methods: {
            logout() {
                this.$confirm('是否退出登录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    utils.clearCookie('token');
                    this.$router.push("/login");
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
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
    }
</script>

<style scoped>
    .setting {
        max-width: 1000px;
        margin: 0px auto;

    }

    .body ul {
        box-sizing: border-box;
        margin: 15px 0px;
    }

    .body ul li {
        margin: 10px 0px;
    }

    .body .item {
        display: flex;
        border-bottom: 1px solid #f7f7f7;
        padding: 10px 15px;
    }

    .body .left {
        flex: 1
    }

    .body .right {
        text-align: right;
    }
</style>