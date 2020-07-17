<template>
    <div id="m-dashboard">
        <div class="nav">
            <ul class="nav-ul">
                <li @click="active ='blog'" :class="{isActive:active =='blog'}">博客</li>
                <li @click="active ='server'" :class="{isActive:active =='server'}">服务器</li>
                <li @click="active ='api'" :class="{isActive:active =='api'}">API</li>
                <li @click="active ='site'" :class="{isActive:active =='site'}">网站</li>
            </ul>
        </div>
        <component :is="active"></component>
    </div>
</template>

<script>
    import server from "@/components/dashboard/serve/Home"
    import blog from "@/components/dashboard/blog/Home"
    import api from "@/components/dashboard/api/Home"
    import site from "@/components/dashboard/site/Home"
    export default {
        components: {
            server,
            site,
            api,
            blog
        },
        data() {
            return {
                active: "api"
            }
        }
    }
</script>
<style scoped>
    .nav-ul {
        display: flex;
        margin: 15px 8px 0px;
        justify-content: space-between;
    }

    .nav-ul li {
        padding: 12px 20px;
        box-sizing: border-box;
        font-size: 1em;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border-radius: 4px;
        border: 1px solid #EBEEF5;
        cursor: pointer;
    }

    .isActive {
        background-color: #20a53a;
        color: #fff;

    }
</style>