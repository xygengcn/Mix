<!-- 快讯 -->
<template>
    <mt-loadmore :top-method="load" ref="newsReload" id="news-flash">
        <div class="container" v-if="data">
            <div class="date">{{data.date}}</div>
            <div class="list">
                <ul>
                    <li v-for="(item,index) in data.news" :key="index" class="list-li">
                        <card :title="true">
                            <div slot="header">
                                <div class="date">{{item.datetime}}</div>
                            </div>
                            <div class="list-item" slot="body">
                                <p>
                                    【<a :data-url="item.url">{{item.title}}</a>】{{item.text}}
                                </p>
                            </div>
                        </card>

                    </li>
                </ul>
            </div>
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
                return this.$store.state.apiData.newsFlash
            }
        },
        methods: {
            load() {
                this.blankText = "加载中...";
                this.$store.dispatch("GetApi", "newsFlash").then(() => {
                    Toast({
                        message: '刷新成功',
                        iconClass: 'icon icon-success'
                    });
                    this.$refs.newsReload.onTopLoaded();
                }).catch(err => {
                    this.blankText = err.error;
                    this.$refs.newsReload.onTopLoaded();
                });

            }
        },
        beforeMount() {
            if (!this.data) {
                this.load();
            }

        }

    }
</script>

<style scoped>
    #news-flash {
        padding: 10px 0px;
        height: 100%;
    }

    .list-li {
        margin: 15px 8px;
    }

    .date {
        font-size: 13px;
        color: #8c8c8c;
        text-align: center;
    }

    .list-item {
        line-height: 26px;
    }

    .list-item p {
        margin: 0;
    }

    .list-item a {
        color: #000;
        font-weight: 600;
    }
</style>