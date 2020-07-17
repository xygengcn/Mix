<template>
    <card :title="true">
        <div slot="header" class="header">
            <span>流量监控</span>
        </div>
        <div slot="body" class="body">
            <div class="netTotal">
                <div class="item">
                    <p>{{data.up |unit2}}</p>上行
                </div>
                <div class="item">
                    <p>{{data.down |unit2}}</p>下行
                </div>
                <div class="item">
                    <p>{{data.upTotal |unit}}</p>总发送
                </div>
                <div class="item">
                    <p>{{data.downTotal |unit}}</p>总接收
                </div>
            </div>
            <v-chart :options="option" width="100%" autoresize class="line" />
        </div>
    </card>
</template>

<script>
    import card from "@/components/common/Card";
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/legend';
    import utils from "@/utils/utils"
    import {
        Toast
    } from 'mint-ui';
    export default {
        components: {
            card
        },
        props: ['data'],
        filters: {
            //过滤总发送和接收
            unit(val) {
                if (val > 1024 * 1024 * 1024 * 1024) {
                    return parseFloat(val / (1024 * 1024 * 1024)).toFixed(2) + "T";
                }
                if (val > 1024 * 1024 * 1024) {
                    return parseFloat(val / (1024 * 1024 * 1024)).toFixed(2) + "GB";
                }
                if (val > 1024 * 1024) {
                    return parseFloat(val / (1024 * 1024)).toFixed(2) + "MB";
                }
                return parseFloat(val / 1024).toFixed(2) + "KB";
            },
            //过滤上下行
            unit2(val) {
                return val.toFixed(2) + "KB";
            }
        },
        data() {
            return {
                interval: null,
                option: {
                    legend: {
                        data: ['上行', '下行']
                    },
                    grid: [{
                        left: '10%',
                        bottom: '10%',
                        top: '10%',
                        right: '10%'
                    }],
                    xAxis: {
                        type: 'category',
                        show: true,
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                            name: "上行",
                            data: [],
                            itemStyle: {
                                color: "#5ca6f2"
                            },
                            lineStyle: {
                                color: "#5ca6f2"
                            },
                            areaStyle: {},
                            type: 'line'
                        },
                        {
                            name: "下行",
                            data: [],
                            itemStyle: {
                                color: "#f7b851"
                            },
                            lineStyle: {
                                color: "#f7b851"
                            },
                            areaStyle: {},
                            type: 'line'
                        }
                    ]
                }
            };
        },
        methods: {
            func() {
                this.interval = setInterval(() => {
                    this.$store.dispatch("GetServerNetwork").then(() => {
                        this.option['xAxis'].data.push(utils.time(new Date(), "HH:mm:ss"));
                        this.option['series'][0].data.push(this.data.up);
                        this.option['series'][1].data.push(this.data.down);
                        if (this.option.xAxis.data.length > 8) {
                            this.option['xAxis'].data.shift();
                            this.option['series'][0].data.shift();
                            this.option['series'][1].data.shift();
                        }
                    }).catch(err => {
                        Toast({
                            message: err,
                        });
                        clearInterval(this.interval);
                    })
                }, 3000);
            }
        },
        mounted() {
            this.func();
        },
        beforeDestroy() {
            clearInterval(this.interval);
        }
    }
</script>

<style scoped>
    .netTotal {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
        font-size: 12px;
        text-align: center;
    }

    .netTotal p {
        font-size: 14px;
        margin: 10px 0px;
    }

    .echarts {
        width: 100%;
        height: 100%;
    }

    .line {
        height: 250px;
    }
</style>