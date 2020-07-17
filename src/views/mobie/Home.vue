<template>
    <div id="m-home">
        <mt-header :title="title">
        </mt-header>
        <div class="m-container">
            <router-view></router-view>
        </div>
        <mt-tabbar class="toolbar" v-model="active">
            <mt-tab-item id="/m">
                <i slot="icon" class="el-icon-s-home"></i>首页
            </mt-tab-item>
            <mt-tab-item id="/m/dashboard">
                <i slot="icon" class="el-icon-s-marketing"></i>监控
            </mt-tab-item>
            <mt-tab-item id="/m/news">
                <i slot="icon" class="el-icon-s-order"></i>快讯
            </mt-tab-item>
            <mt-tab-item id="/m/sports">
                <i slot="icon" class="el-icon-football"></i>球赛
            </mt-tab-item>
            <mt-tab-item id="/m/setting">
                <i slot="icon" class="el-icon-s-tools"></i>设置
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            let active = this.$route.path;
            return {
                active: active
            }
        },
        watch: {
            active(val) {
                this.$router.push(val);
            }

        },
        computed: {
            title() {
                let title = {
                    "/m": "首页",
                    "/m/sports": "球赛",
                    "/m/setting": "设置",
                    "/m/news": "快讯",
                    "/m/dashboard": "监控",
                }
                return title[this.active];
            }
        }

    }
</script>

<style scoped>
    #m-home {
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    .m-container {
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        padding-bottom: 100px;
    }


    .mint-header {
        color: #ffffff;
        background-color: #20a53a;
    }

    .toolbar a {
        padding: 10px 0px;
    }

    .toolbar {
        border-top: 1px #eeeeee solid;
        background-color: #f8f8f8;
        box-sizing: border-box;
        padding: 5px 0px 8px;
    }

    .toolbar .mint-tab-item-icon i {
        font-size: 1.5em;
    }

    .toolbar .mint-tab-item.is-selected {
        background-color: #f8f8f8;
        color: #20a53a;
    }
</style>
<style>
    ::-webkit-scrollbar {
        display: none
    }
</style>