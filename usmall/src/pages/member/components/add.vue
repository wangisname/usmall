<template>
  <div>
    <el-dialog title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="80px">
          <el-input v-model="form.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="80px">
          <el-input v-model="form.nickname" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  requestMemberDetail,
  requestMemberUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestList: "member/requestList",
    }),
    cancel() {
      this.info.show = false;
    },
    empty() {
      this.form = {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      };
    },
    getDetail(id) {
      requestMemberDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
      });
    },
    update() {
      requestMemberUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>

<style>
</style>