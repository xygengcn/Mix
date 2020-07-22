<template>
    <div id="m-setting">
        <div class="container">
            <ul>
                <li>
                    <mt-cell title="当前用户" :value="user.username"></mt-cell>
                </li>
            </ul>
            <ul>
                <li>
                    <mt-cell title="安全码" to="/m/verify" is-link></mt-cell>
                </li>
            </ul>
            <ul>
                <li>
                    <mt-cell title="关于MIX" :value="'版本 '+system.version"></mt-cell>
                </li>
                <li>
                    <mt-cell title="更新MIX">
                        <el-button type="primary" size="mini" @click="updata()">更新</el-button>
                    </mt-cell>
                </li>
            </ul>
            <ul>
                <li>
                    <logout />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Cell } from "mint-ui";
import logout from "@/components/setting/Logout";
export default {
    components: {
        logout
    },
    methods: {
        updata() {
            window.location.reload(true);
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        system() {
            return this.$store.state.system;
        }
    }
};
</script>

<style scoped>
#m-setting {
    background-color: #efefef;
    height: 100%;
    overflow: hidden;
}

.container ul {
    box-sizing: border-box;
    margin: 15px 0px;
}

.logout {
    margin: 15px 0px;
    background-color: #fff;
    min-height: 48px;
    align-items: center;
    justify-content: center;
    display: flex;
}
</style>