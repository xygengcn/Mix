<template>
    <div id="m-news">
        <news-flash v-if="config.type=='flash'" />
    </div>
</template>

<script>
    import newsFlash from "@/components/news/flash";
    export default {
        components: {
            newsFlash
        },
        computed: {
            config() {
                return this.$store.state.newsConfig;
            }
        }

    }
</script>

<style lang="css" scoped>
    #m-news {
        min-height: 100%;
    }
</style>