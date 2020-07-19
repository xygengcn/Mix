<template>

    <div class="news-flash">
        <newsFlash />
    </div>
</template>

<script>
    import newsFlash from "@/components/news/Flash";
    export default {
        components: {
            newsFlash
        }

    }
</script>

<style scoped>
    .news-flash {
        max-width: 1000px;
        margin: 0px auto;
    }
</style>