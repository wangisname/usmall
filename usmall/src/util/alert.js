import Vue from 'vue'

var vue = new Vue();

//成功弹框
export const successAlert = (msg) => {
    vue.$message({
        message: msg,
        type: 'success',
    })
}

//警告弹框
export const warningAlert = (msg) => {
    vue.$message({
        message: msg,
        type: 'warning',
    });
}

//错误弹框
export const errorAlert = (msg) => {
    vue.$message.error(msg);
}













