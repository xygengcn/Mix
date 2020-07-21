<template>
    <div class="pc-home">
        <el-row :gutter="20">
            <el-col :span="6" v-if="serverNetwork">
                <system :data="serverNetwork" />
                <overview :data="serverNetwork" style="margin-top:15px" />
            </el-col>
            <el-col :span="18" v-if="serverNetwork">
                <network :data="serverNetwork" />
            </el-col>
            <el-col :span="12" v-if="apiTotal">
                <total :data="apiTotal.today" title="今日请求"></total>
            </el-col>
            <el-col :span="12" v-if="apiTotal">
                <total :data="apiTotal.total" title="历史总请求"></total>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import system from "@/components/dashboard/serve/System";
import network from "@/components/dashboard/serve/Network";
import overview from "@/components/dashboard/serve/Overview";
import total from "@/components/dashboard/api/Total";
export default {
    components: {
        system,
        network,
        overview,
        total
    },
    data() {
        return {};
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
        this.$store.dispatch("GetApi", "serverNetwork");
        this.$store.dispatch("GetApi", "apiTotal");
    }
};
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