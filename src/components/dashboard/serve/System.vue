<template>
    <card :title="true">
        <div slot="header" class="header">
            <span>系统信息</span>
            <span class="header-right">运行：{{data.time}}</span>
        </div>
        <div slot="body" class="body">
            <div class="item" v-for="(item,index) in options" :key="index">
                <v-chart :options="item" width="100%" autoresize />
            </div>
        </div>
    </card>
</template>

<script>
    import card from "@/components/common/Card";
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    const pie = require("./option/pie.json");
    export default {
        components: {
            card
        },
        props: ['data'],
        computed: {
            options() {
                let str = JSON.stringify(pie);
                let options = [];
                let obj = [];
                obj[0] = {
                    "{title}": "CPU（" + this.data.cpu[1] + "核心）",
                    "{value1}": this.data.cpu[0],
                    "{value2}": 100 - this.data.cpu[0]
                }
                obj[1] = {
                    "{title}": this.data.mem.memRealUsed + "MB/" + this.data.mem.memTotal + "MB",
                    "{value1}": this.data.mem.memRealUsed,
                    "{value2}": this.data.mem.memTotal - this.data.mem.memRealUsed
                }
                obj[2] = {
                    "{title}": this.data.disk[0].size[1] + "/" + this.data.disk[0].size[0],
                    "{value1}": parseInt(this.data.disk[0].size[1]),
                    "{value2}": parseInt(this.data.disk[0].size[2])
                }
                options[0] = this.str_replace(obj[0], str);
                options[1] = this.str_replace(obj[1], str);
                options[2] = this.str_replace(obj[2], str);
                return options;
            }
        },
        methods: {
            str_replace(arr, str) {
                for (let key in arr) {
                    str = str.replace(key, arr[key]);
                }
                return JSON.parse(str)
            }
        }
    }
</script>
<style scoped>
    .header {
        height: 100%;
        line-height: 100%;
        position: relative;
    }

    .header-right {
        display: inline-block;
        position: absolute;
        right: 0;
        font-size: 12px;
        line-height: 1rem;
    }

    .body {
        display: flex;
    }

    .item {
        width: 50%;
        height: 120px;
    }

    .echarts {
        width: 100%;
        height: 100%;
    }
</style>