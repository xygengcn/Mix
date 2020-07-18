<template>
    <card :title="true" class="history-item">
        <div class="header" slot="header">{{title}}</div>
        <div class="body" slot="body">
            <v-chart :options="option" width="100%" autoresize class="line" />
        </div>
    </card>
</template>

<script>
import "echarts/lib/chart/line";
import card from "@/components/common/Card";
export default {
    props: ["data", "title"],
    components: {
        card
    },
    data() {
        return {
            option: {
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        name: "请求量",
                        data: [],
                        areaStyle: {},
                        type: "line"
                    }
                ]
            }
        };
    },
    beforeMount() {
        if (this.data) {
            for (let key in this.data) {
                this.option["xAxis"].data.push(key);
                this.option["series"][0]["data"].push(this.data[key]);
            }
        }
    }
};
</script>

<style scoped>
.history-item {
    margin: 10px 0px;
}
.echarts {
    width: 100%;
    height: 100%;
}
.line {
    height: 200px;
}
</style>