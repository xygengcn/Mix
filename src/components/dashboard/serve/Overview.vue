<template>
    <card>
        <div slot="body" class="body">
            <div class="item">
                <p>{{data.site_total}}</p>网站
            </div>
            <div class="item">
                <p>{{data.ftp_total}}</p>FTP
            </div>
            <div class="item">
                <p>{{data.database_total}}</p>数据库
            </div>
        </div>
    </card>
</template>

<script>
    import card from "@/components/common/Card";
    export default {
        components: {
            card
        },
        props: ['data'],
    }
</script>

<style scoped>
    .body {
        display: flex;
        justify-content: space-around;
    }

    .body .item {
        width: 30%;
        border-radius: 4px;
        text-align: center;
        background-color: #fafaf8;
        border: 1px #d8d8d8 solid;
        padding: 10px 0px;
        line-height: 100%;
        color: #ababab
    }

    .body .item p {
        color: #20a53a;
        margin-bottom: 10px;
    }
</style>