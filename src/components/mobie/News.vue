<template>
    <div id="m-news">
        <div class="nav">
            <ul class="nav-ul">
                <li @click="active ='newsFlash'" :class="{isActive:active =='newsFlash'}">快讯</li>
                <li @click="active ='weiboHots'" :class="{isActive:active =='weiboHots'}">热搜</li>
            </ul>
        </div>
        <div class="container">
            <component :is="active"></component>
        </div>
    </div>
</template>

<script>
import newsFlash from "@/components/news/Flash";
import weiboHots from "@/components/news/Hots";
export default {
    components: {
        newsFlash,
        weiboHots
    },
    data() {
        return {
            active: "newsFlash"
        };
    }
};
</script>

<style lang="css" scoped>
#m-news {
    width: 100%;
    min-height: 100%;
}

.container {
    min-height: 100%;
    overflow: auto;
}

.nav {
    margin-bottom: 15px;
}

.nav-ul {
    display: flex;
    margin: 15px 8px 0px;
}

.nav-ul li {
    flex: 1;
    padding: 12px 20px;
    box-sizing: border-box;
    font-size: 1em;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    cursor: pointer;
    margin-right: 10px;
    text-align: center;
}

.isActive {
    background-color: #20a53a;
    color: #fff;
}
</style>