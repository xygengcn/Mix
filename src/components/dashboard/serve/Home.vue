<template>
    <div id="server">
        <mt-loadmore :top-method="load" ref="serverReload">
            <system :data="data" v-if="data" />
            <overview :data="data" v-if="data" />
            <network :data="data" v-if="data" />
            <div class="blank" v-if="!data">{{blankText}}</div>
        </mt-loadmore>
    </div>
</template>

<script>
import system from "@/components/dashboard/serve/System";
import network from "@/components/dashboard/serve/Network";
import overview from "@/components/dashboard/serve/Overview";
export default {
    components: {
        system,
        network,
        overview
    },
    data() {
        return {
            blankText: "加载中..."
        };
    },
    methods: {
        load() {
            this.blankText = "加载中...";
            this.$store
                .dispatch("GetApi", "serverNetwork")
                .then(() => {
                    this.$refs.serverReload.onTopLoaded();
                })
                .catch(err => {
                    this.blankText = err.error;
                    this.$refs.serverReload.onTopLoaded();
                });
        }
    },
    computed: {
        data() {
            return this.$store.state.apiData.serverNetwork;
        }
    },
    created() {
        this.load();
    }
};
</script>
<style scoped>
#server {
    min-height: 100%;
}

#server .card {
    margin: 15px 8px;
}
</style>