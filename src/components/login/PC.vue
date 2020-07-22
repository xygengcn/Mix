<template>
    <div class="login-container">
        <el-form :model="user" ref="form" v-if="!isEmail">
            <el-form-item
                prop="email"
                :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]"
            >
                <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" style="width: 100%;" @click="verify">GO</el-button>
            </el-form-item>
        </el-form>
        <verify v-if="isEmail" @back="back" :email="user.email" />
    </div>
</template>

<script>
import verify from "@/components/login/LoginVerify";
export default {
    components: {
        verify
    },
    data() {
        return {
            user: {
                email: ""
            },
            isEmail: false
        };
    },
    methods: {
        verify() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.isEmail = true;
                } else {
                    return false;
                }
            });
        },
        back() {
            this.isEmail = !this.isEmail;
        }
    }
};
</script>

<style>
</style>