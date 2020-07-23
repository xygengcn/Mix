<template>
    <div id="pc">
        <sidebar />
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import sidebar from "@/components/pc/Sidebar";
export default {
    components: {
        sidebar
    }
};
</script>

<style scoped>
#pc {
    display: flex;
    height: 100%;
    overflow: hidden;
}

.container {
    padding: 20px;
    width: 100%;
    overflow: auto;
}
</style>