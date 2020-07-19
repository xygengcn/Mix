<template>
    <div id="sidebar">
        <div class="toolbar">
            <router-link to="/">
                <div class="sideBtn" :class="{active:$route.path=='/'}">
                    <i slot="icon" class="el-icon-s-home"></i>首页
                </div>
            </router-link>
            <router-link to="/news">
                <div class="sideBtn" :class="{active:$route.path=='/news'}">
                    <i slot="icon" class="el-icon-s-order"></i>快讯
                </div>
            </router-link>
            <router-link to="/sports">
                <div class="sideBtn" :class="{active:$route.path=='/sports'}">
                    <i slot="icon" class="el-icon-football"></i>球赛
                </div>
            </router-link>
            <router-link to="/setting">
                <div class="sideBtn" :class="{active:$route.path=='/setting'}">
                    <i slot="icon" class="el-icon-s-tools"></i>设置
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>


<style scoped>
    #sidebar {
        width: 73px;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        border-right: 1px solid #ececec;
        background-color: #f8f8f8;
        -webkit-app-region: drag;
        padding: 15px;
    }

    .toolbar {
        height: 100%;
    }

    .toolbar a {
        display: block;
        margin: 20px 0px;
        overflow: hidden;
    }


    .sideBtn {
        width: 36px;
        height: 36px;
        margin-bottom: 30px;
        border-radius: 18px;
        background-color: #fff;
        color: #878787;
        border: #eee 1px solid;
        text-align: center;
        cursor: pointer;
        -webkit-app-region: no-drag;
    }

    .sideBtn i {
        height: 36px;
        line-height: 36px;
        font-size: 1.5em;
    }

    .sideBtn:hover,
    .sideBtn.active {
        background-color: #ffffff;
        color: #2dbe60;
    }
</style>