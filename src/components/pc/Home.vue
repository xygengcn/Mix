<template>
    <div class="pc-home">
        <el-row :gutter="20">
            <el-col :span="6">
                <system :data="serverNetwork" v-if="serverNetwork" />
                <overview :data="serverNetwork" v-if="serverNetwork" style="margin-top:15px" />
            </el-col>
            <el-col :span="18">
                <network :data="serverNetwork" v-if="serverNetwork" />
            </el-col>
            <el-col :span="12">
                <total :data="apiTotal.today" v-if="apiTotal" title="今日请求"></total>
            </el-col>
            <el-col :span="12">
                <total :data="apiTotal.total" v-if="apiTotal" title="历史总请求"></total>
            </el-col>

        </el-row>
        <div class="blank" v-if="!serverNetwork">{{blankText}}</div>
    </div>
</template>

<script>
    import system from "@/components/dashboard/serve/System"
    import network from "@/components/dashboard/serve/Network"
    import overview from "@/components/dashboard/serve/Overview"
    import total from "@/components/dashboard/api/Total"
    export default {
        components: {
            system,
            network,
            overview,
            total
        },
        data() {
            return {
                blankText: "加载中..."
            }
        },
        computed: {
            serverNetwork() {
                return this.$store.state.apiData.serverNetwork;
            },
            apiTotal() {
                return this.$store.state.apiData.apiTotal;
            }
        },
        beforeCreate() {
            this.$store.dispatch("GetApi", "serverNetwork").then(() => {

            }).catch(err => {
                this.blankText = "加载失败，下拉刷新";

            });
            this.$store.dispatch("GetApi", "apiTotal")
                .catch(err => {
                    this.blankText = "加载失败，下拉刷新";
                    this.$refs.apiReload.onTopLoaded();
                });
        }

    }
</script>

<style scoped>
    .pc-home {
        display: flex;
        justify-content: space-around;
    }

    .el-row {
        width: 100%;
    }

    .el-col {
        margin-bottom: 10px;
    }
</style>