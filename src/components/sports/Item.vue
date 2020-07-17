<template>
    <card>
        <div class="body" slot="body">
            <div class="item">
                <div class="item-header">
                    <span>{{data.sort_timestamp | timeToBeijing}}</span>
                    <span>{{data.match_title}}</span>
                </div>
                <div class="item-main">
                    <div class="row team teamA">
                        <div class="name">{{data.team_A_name}}</div>
                        <img class="logo" :src="data.team_A_logo" />
                    </div>
                    <div class="row status played" v-if="data.status =='Played'">
                        <p><span>{{data.fs_A}}</span>:<span>{{data.fs_B}}</span></p>
                    </div>
                    <div class="row status fixture" v-if="data.status =='Fixture'">
                        <span>{{data.fs_A}}</span><i class="el-icon-bell"></i><span>{{data.fs_B}}</span>
                    </div>
                    <div class="row status playing" v-if="data.status =='Playing'">
                        <p><span>{{data.fs_A}}</span>:<span>{{data.fs_B}}</span></p>
                        <i>直播中</i>
                    </div>
                    <div class="row team teamB">
                        <img class="logo" :src="data.team_B_logo" />
                        <div class="name">{{data.team_B_name}}</div>
                    </div>
                </div>

            </div>
        </div>
    </card>
</template>

<script>
    import card from "@/components/common/Card"
    import utils from "@/utils/utils.js"
    export default {
        props: ["data"],
        components: {
            card
        },
        filters: {
            timeToday(val) {
                val = (val + 60 * 60 * 8) * 1000;
                return utils.time(val, "yyyy-MM-dd day");
            },
            timeToBeijing(val) {
                val = (val + 60 * 60 * 8) * 1000;
                return utils.time(val, "HH:mm");
            }
        }

    }
</script>

<style scoped>
    .item-header {
        text-align: center;
        color: #b3b3b3;
        font-size: 12px;
        margin-bottom: 15px;
    }

    .item-main {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        height: 60px;
    }

    .status {
        width: 60px;
        justify-content: center;
    }

    span {
        margin: 0px 5px;
    }

    .item-main .row {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .team {
        flex: 1;
        justify-content: space-around;
        font-size: 14px;
    }

    .team .logo {
        height: 30px;
        justify-self: right;
    }

    .teamA .logo {
        margin: 0px 5px 0px 15px;
    }

    .teamB .logo {
        margin: 0px 15px 0px 5px;
    }

    .teamA .name {
        flex: 1;
        text-align: right;
    }

    .teamB .name {
        flex: 1;
        text-align: left;
    }

    .fixture i {
        font-size: 1.5em;

    }

    .item-main .row.playing {
        flex-direction: column;
        position: relative;
    }

    .item-main .row.playing i {
        font-style: normal;
        position: absolute;
        bottom: 0;
        font-size: 8px;
        color: #ffffff;
        background-color: #20a53a;
        padding: 1px 6px;
        border-radius: 2px;
        -webkit-text-size-adjust: none
    }
</style>