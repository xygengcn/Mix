<template>
    <div id="login">
        <div class="container">
            <div class="header">
                <h1>MIX</h1>
            </div>
            <div class="body">
                <m-form v-if="isMobie"></m-form>
                <pc-Form v-if="!isMobie" />
            </div>
        </div>
    </div>
</template>

<script>
import utils from "@/utils/utils.js";
import mForm from "@/components/login/Mobie";
import pcForm from "@/components/login/PC";
export default {
    components: {
        pcForm,
        mForm,
    },
    data() {
        let os = utils.os();
        return {
            isMobie: os.isMobie,
        };
    },
    methods: {},
};
</script>

<style scoped>
#login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #ffffff;
    background-color: #20a53a;
}

.container {
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    position: relative;
    top: -10%;
}

.header {
    font-size: 2em;
    text-align: center;
}

.header h1 {
    text-shadow: 3px 3px 1px #ccc;
    letter-spacing: 5px;
}

.body {
    width: 75%;
    margin: auto;
}

.container .form {
    display: flex;
    flex-direction: column;
}

button {
    background-color: #ffffff;
    border-color: #20a53a;
    color: #20a53a;
    font-size: 16px;
    font-weight: 600;
}
</style>