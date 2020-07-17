<template>
    <div id="m-home-home">
        <div class="item bing" v-if="bing">
            <img :src="bing" alt="">
        </div>
        <card class="item date" :cardStyle="cardStyle" v-if="today">
            <div class="time" slot="body">
                <div class="main">
                    <div class="left">
                        <h2>{{today.solar.date}}</h2>
                        <p>{{today.solar.year}}-{{today.solar.date}}</p>
                    </div>
                    <div class="right">
                        <p>{{today.lunar.year}}{{today.lunar.animal}}年</p>
                        <p>{{today.lunar | lunar}}</p>
                        <p>{{today.solar.day}}</p>
                    </div>
                </div>
                <div class="word">
                    <h2>{{helloWord}}</h2>
                </div>
            </div>
        </card>
        <card class="item">
            <div class="one" slot="body" v-if="one">
                {{one.content}}
                <p>——{{one.origin}}</p>
            </div>
        </card>
    </div>
</template>

<script>
    import card from "@/components/common/Card"
    import utils from '@/utils/utils.js'
    export default {
        components: {
            card
        },
        filters: {
            lunar(val) {
                return val.month + val.date;
            }
        },
        data() {
            return {
                cardStyle: "background-color: #9ddacc;border-radius: 10px;"
            }
        },
        computed: {
            one() {
                return this.$store.state.one;
            },
            bing() {
                return this.$store.state.bing;
            },
            today() {
                return this.$store.state.today;
            },
            helloWord() {
                let hour = parseInt(utils.time(new Date(), "HH"));
                if (hour < 6 && hour >= 3) {
                    return "凌晨好"
                }
                if (hour > 6 && hour <= 10) {
                    return "早安"
                }
                if (hour > 10 && hour <= 14) {
                    return "午安"
                }
                if (hour > 14 && hour <= 19) {
                    return "下午好"
                }
                if (hour > 19 && hour <= 22) {
                    return "晚上好"
                }
                if (hour > 22 || hour < 3) {
                    return "夜深了"
                }
            }
        },
        beforeCreate() {
            if (!this.one) {
                this.$store.dispatch("GetOne");
            }
            if (!this.bing) {
                this.$store.dispatch("GetBing");
            }
            if (!this.today) {
                this.$store.dispatch("GetToday");
            }
        }

    }
</script>

<style scoped>
    .item {
        margin: 15px 8px;
    }

    .bing img {
        border-radius: 10px;
        width: 100%;
    }

    .date .time {
        display: flex;
        color: #fff;
        justify-content: space-around;
    }

    .date .time .main {
        display: flex;
        justify-content: space-around;

    }

    .date .time .main p {
        margin: 8px 0px;
    }

    .date .time .main .left {
        border-right: 2px solid #fff;
        padding-right: 20px;
        text-align: center;
    }

    .date .time .main .right {
        padding-left: 30px;
    }

    .date .time .main .left h2 {
        margin: 0;
        font-size: 3em;
    }

    .word h2 {
        font-size: 2em;
        letter-spacing: 5px;
    }

    .one {
        line-height: 1.5em;
    }

    .one p {
        margin: 10px 0px 0px;
        font-size: 14px;
        text-align: right;
    }
</style>