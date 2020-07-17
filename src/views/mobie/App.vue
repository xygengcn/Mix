<template>
    <div id="mobie">
        <home />
    </div>
</template>

<script>
    import home from "@/views/mobie/Home.vue"
    export default {
        components: {
            home
        }
    }
</script>

<style scoped>
    #mobie {
        height: 100%;
        position: relative;
        overflow: hidden;
    }
</style>