<template>
    <card class="row" :title="true">
        <div class="header" slot="header">
            <span>{{title}}</span>
            <span class="header-right">{{time}}</span>
        </div>
        <div class="body" slot="body">
            <div class="item" v-for="(item,index) in data" :key="index">
                <h3>{{index}}</h3>
                <p>{{item}}</p>
            </div>
        </div>
    </card>
</template>

<script>
import card from "@/components/common/Card";
import utils from "@/utils/utils";
export default {
    props: ["data", "title"],
    data() {
        return {
            time: utils.time(new Date(), "HH:mm:ss")
        };
    },
    components: {
        card
    }
};
</script>

<style scoped>
.header {
    line-height: 100%;
}

.header-right {
    float: right;
    font-size: 12px;
    line-height: 1rem;
}

.row {
    width: 100%;
    text-align: left;
}

.row .body {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}

.item {
    width: 30%;
    border-radius: 4px;
    text-align: center;
    background-color: #fafaf8;
    border: 1px #d8d8d8 solid;
    padding: 10px 0px;
    margin: 10px 1.6666%;
    line-height: 100%;
    color: #ababab;
}

.item h3 {
    font-weight: 400;
    padding-bottom: 10px;
    font-size: 12px;
    padding: 0px;
    margin: 0px;
}

.item p {
    color: #20a53a;
    margin-bottom: 10px;
    font-size: 24px;
}
</style>