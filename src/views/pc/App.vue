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
    import utils from "@/utils/utils"
    export default {
        components: {
            sidebar
        },
        beforeCreate() {
            let isMobie = utils.os().isMobie;
            if (isMobie) {
                if (this.$route.path == "/") {
                    this.$router.push('/m');
                } else {
                    this.$router.push('/m' + this.$route.path);
                }
            }

        }
    }
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
    }
</style>