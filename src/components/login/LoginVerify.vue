<template>
    <div class="verify">
        <form class="verify-container">
            <div class="form-item">
                <input
                    type="number"
                    oninput="if(value.length>1)value=value.slice(0,1)"
                    @keyup="inputSet($event,'1')"
                    @keyup.right="change($event,'1')"
                    ref="input-0"
                    v-model="code[0]"
                />
            </div>
            <div class="form-item">
                <input
                    type="number"
                    oninput="if(value.length>1)value=value.slice(0,1)"
                    @keyup="inputSet($event,'2')"
                    @keyup.right="change($event,'2')"
                    @keyup.left="change($event,'0')"
                    @keydown.delete="clean($event,0)"
                    ref="input-1"
                    v-model="code[1]"
                />
            </div>
            <div class="form-item">
                <input
                    type="number"
                    oninput="if(value.length>1)value=value.slice(0,1)"
                    @keyup="inputSet($event,'3')"
                    @keyup.right="change($event,'3')"
                    @keyup.left="change($event,'1')"
                    @keydown.delete="clean($event,1)"
                    ref="input-2"
                    v-model="code[2]"
                />
            </div>
            <div class="form-item">
                <input
                    type="number"
                    oninput="if(value.length>1)value=value.slice(0,1)"
                    ref="input-3"
                    v-model="code[3]"
                    @keydown.delete="clean($event,2)"
                    @keyup.left="change($event,2)"
                />
            </div>
        </form>
        <p class="back" @click="back()">返回上一层</p>
    </div>
</template>

<script>
import http from "@/http/index.js";
export default {
    props: ["email"],
    data() {
        return {
            code: ["", "", "", ""]
        };
    },
    watch: {
        code(val) {
            if (val[0] && val[1] && val[3] && val[2]) {
                this.verify();
            }
        }
    },
    methods: {
        verify() {
            http.post("login", { email: this.email, code: this.code.join("") })
                .then(res => {
                    if (res.code == 200) {
                        console.log(res.data);
                    } else {
                        this.$message({
                            message: res.error,
                            type: "warning"
                        });
                    }
                })
                .catch(err => {
                    this.$message({
                        message: "连接错误",
                        type: "warning"
                    });
                });
        },
        inputSet(e, ref) {
            if (!isNaN(e.key)) this.$refs["input-" + ref].focus();
        },
        change(e, ref) {
            this.$refs["input-" + ref].focus();
        },
        clean(e, ref) {
            if (!this.code[ref + 1]) {
                this.$refs["input-" + ref].focus();
            }
        },
        back() {
            this.$emit("back");
        }
    },
    mounted() {
        this.$refs["input-0"].focus();
    }
};
</script>

<style scoped>
.verify-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
}
.verify-container .form-item {
    margin: 0px 15px;
}
.verify-container .form-item input {
    background-color: #fff;
    border-radius: 4px;
    width: 100%;
    border: none;
    padding: 10px 10px;
    text-align: center;
    font-size: 36px;
    color: #20a53a;
    outline: none;
}
.verify-container .form-item input::-webkit-outer-spin-button,
.verify-container .form-item input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.verify-container .form-item input[type="number"] {
    -moz-appearance: textfield;
}
.back {
    font-size: 12px;
    color: #fff;
    text-align: center;
    margin-top: 50px;
    cursor: pointer;
}
</style>