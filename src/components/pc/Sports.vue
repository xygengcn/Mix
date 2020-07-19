<template>
    <div class="sports">
        <div class="container">
            <soccer />
        </div>
    </div>
</template>

<script>
    import soccer from "@/components/sports/Soccer";
    export default {
        components: {
            soccer
        }

    }
</script>

<style scoped>
    .container {
        max-width: 1000px;
        margin: 0px auto;
    }
</style>