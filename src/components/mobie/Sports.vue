<template>
    <div id="m-sports">
        <div class="container">
            <ul>
                <li v-for="(list,key) in data" :key="key" v-cloak>
                    <div class="date" :class="{active:today==key}" :ref="key">{{key | date}}</div>
                    <ul>
                        <li v-for="(item,index) in list" :key="index" v-cloak>
                            <item :data="item" />
                        </li>
                    </ul>

                </li>
            </ul>
            <div class="blank" v-if="!data">{{blankText}}</div>
        </div>
    </div>
</template>

<script>
    import item from '@/components/sports/Item'
    import card from "@/components/common/Card"
    import utils from '@/utils/utils.js'
    export default {
        components: {
            item,
            card
        },
        computed: {
            data() {
                return this.$store.state.soccerList.list;
            }
        },
        data() {
            return {
                blankText: "正在加载...",
                today: utils.time(new Date(), 'yyyy-MM-dd')
            }
        },
        filters: {
            date(val) {
                let weekDays = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                let myDate = new Date(Date.parse(val));
                let weekday = weekDays[myDate.getDay()];
                let date = utils.time(new Date(), 'yyyy-MM-dd');
                if (date == val) {
                    return val + " 今天 " + weekday;
                } else {
                    return val + " " + weekday;
                }

            }
        },
        methods: {},
        created() {
            if (!this.data) {
                this.$store.dispatch("GetSoccerList").catch(err => {
                    this.blankText = "加载错误";
                });
            }
        },
        updated() {
            this.$nextTick(() => {
                if (this.$refs[this.today])
                    this.$refs[this.today][0].scrollIntoViewIfNeeded();
            })
        }
    }
</script>

<style scoped>
    .date {
        color: #ffffff;
        background-color: #20a53a;
        margin: 5px 0px 30px;
        text-align: center;
        padding: 10px 0px;
    }

    .active {
        color: yellow;
        font-weight: 600;
    }
</style>