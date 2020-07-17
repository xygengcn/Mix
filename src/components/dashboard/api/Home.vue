<template>
    <div id="api">
        <mt-loadmore :top-method="load" ref="apiReload">
            <div class="blank" v-if="!data">{{blankText}}</div>
            <card class="row" :title="true" v-if="data">
                <div class="header" slot="header"><span>即时总请求</span><span class="header-right ">{{time}}</span></div>
                <div class="body" slot="body">
                    <div class="item" v-for="(item,index) in data" :key="index">
                        <h3>{{index}}</h3>
                        <p>{{item}}</p>
                    </div>
                </div>
            </card>
        </mt-loadmore>
    </div>
</template>

<script>
    import card from "@/components/common/Card";
    import utils from "@/utils/utils"
    export default {
        data() {
            return {
                blankText: "加载中...",
                time: "HH:mm:ss"
            }
        },
        components: {
            card
        },
        computed: {
            data() {
                return this.$store.state.apiTotal;
            }
        },
        watch: {
            data() {
                this.time = utils.time(new Date(), "HH:mm:ss");
            }
        },
        methods: {
            load() {
                this.blankText = "";
                this.$store.dispatch("GetApiTotal").then(() => {
                    this.$refs.apiReload.onTopLoaded();
                }).catch(err => {
                    this.blankText = "加载失败，下拉刷新";
                    this.$refs.apiReload.onTopLoaded();
                });
            }

        },
        beforeCreate() {
            if (!this.data) {
                this.$store.dispatch("GetApiTotal").catch(err => {
                    this.blankText = "加载失败，下拉刷新";
                });
            }
        }

    }
</script>

<style scoped>
    #api {
        padding: 15px 8px;
        min-height: 100%;
    }

    .header {
        line-height: 100%;
    }

    .header-right {
        float: right;
        font-size: 12px;
        line-height: 1rem;
    }

    #api .row {
        width: 100%;
        text-align: left;
    }

    #api .row .body {
        display: flex;
        width: 100%;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .item {
        width: 30%;
        border-radius: 4px;
        text-align: center;
        background-color: #fafaf8;
        border: 1px #d8d8d8 solid;
        padding: 10px 0px;
        margin: 10px 0px;
        line-height: 100%;
        color: #ababab
    }

    .item h3 {
        font-weight: 400;
        padding-bottom: 10px;
        font-size: 12px;
        padding: 0px;
        margin: 0px;
    }

    .item p {
        color: #20a53a;
        margin-bottom: 10px;
        font-size: 24px;
    }
</style>