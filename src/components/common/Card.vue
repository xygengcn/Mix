<template>
    <div class="card">
        <el-card :style="cardStyle">
            <div slot="header" class="clearfix" v-if="title">
                <slot name="header"></slot>
            </div>
            <div class="card-body">
                <slot name="body"></slot>
            </div>
            <div class="card-footer">
                <slot name="footer"></slot>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: Boolean
            },
            cardStyle: {
                type: String,
                default: ""
            }
        },
    }
</script>

<style scoped>
    .card {
        height: 100%;
        color: #878787;
    }

    .el-card {
        width: 100%;
        box-sizing: border-box;
    }
</style>