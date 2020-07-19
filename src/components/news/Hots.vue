<template>
    <mt-loadmore :top-method="load" ref="hotsReload" id="news-hots">
        <div class="container" v-if="data">
            <ul>
                <li v-for="(item,index) in data" :key="index">
                    <div class="hots-item">
                        <div class="td-01">
                            <span v-if="item.realpos!=0">{{item.realpos}}</span>
                            <i v-if="item.realpos==0" class="el-icon-s-flag"></i>
                        </div>
                        <div class="td-02">{{item.note}}<em>{{item.num}}</em></div>
                        <div class="td-03" v-if="item.tag">{{item.tag}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="blank" v-if="!data ||data.length==0">{{blankText}}</div>
    </mt-loadmore>
</template>

<script>
    import card from "@/components/common/Card";
    import {
        Toast
    } from 'mint-ui';
    export default {
        components: {
            card
        },
        data() {
            return {
                blankText: "正在加载..."
            }
        },
        computed: {
            data() {
                return this.$store.state.apiData.weiboHots
            }
        },
        methods: {
            load() {
                this.blankText = "加载中...";
                this.$store.dispatch("GetApi", "weiboHots").then(() => {
                    Toast({
                        message: '刷新成功',
                        iconClass: 'icon icon-success'
                    });
                    this.$refs.hotsReload.onTopLoaded();
                }).catch(err => {
                    this.blankText = err.error;
                    this.$refs.hotsReload.onTopLoaded();
                });

            }
        },
        beforeMount() {
            this.load();
        }

    }
</script>

<style scoped>
    .container {
        background-color: #fff;
    }

    .hots-item {
        display: flex;
        border-bottom: solid 1px #f2f2f5;
        padding: 10px 15px;
        font-size: 14px;
    }

    .hots-item .td-01 {
        width: 30px;
        text-align: left;
        color: #ff8200;
        line-height: 20px;

    }

    .hots-item .td-02 {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 20px;
    }

    .hots-item .td-02 em {
        color: #a9a9a9;
        font-size: 12px;
        margin-left: 10px;
        font-style: normal;
        line-height: 20px;
    }

    .hots-item .td-03 {
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        background: #f5670e;
        color: #fff;
    }
</style>