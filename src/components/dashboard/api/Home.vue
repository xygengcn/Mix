<template>
    <div id="api">
        <mt-loadmore :top-method="load" ref="apiReload">
            <div class="blank" v-if="!data">{{blankText}}</div>
            <total :data="data.today" v-if="data" title="今日请求"></total>
            <total :data="data.total" v-if="data" title="历史总请求"></total>
            <div class="history" v-if="data">
                <history v-for="(item,index) in data.history" :key="index" :title="index" :data="item"></history>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
    import total from "./Total";
    import history from "./History";
    export default {
        data() {
            return {
                blankText: "加载中..."
            };
        },
        components: {
            total,
            history
        },
        computed: {
            data() {
                return this.$store.state.apiData.apiTotal;
            }
        },
        methods: {
            load() {
                this.blankText = "加载中...";
                this.$store.dispatch("GetApi", "apiTotal").then(() => {
                        this.$refs.apiReload.onTopLoaded();
                    })
                    .catch(err => {
                        this.blankText = "加载失败，下拉刷新";
                        this.$refs.apiReload.onTopLoaded();
                    });
            }
        },
        created() {
            if (!this.data) {
                this.load();
            }
        }
    };
</script>

<style scoped>
    #api {
        padding: 15px 8px;
        min-height: 100%;
    }

    #api .card {
        margin: 10px 0px;
    }
</style>