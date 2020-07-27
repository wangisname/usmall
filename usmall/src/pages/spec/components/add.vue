<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item v-for="(item,index) in attrArr" :key="index" label="规格属性" label-width="80px">
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestSpecAdd } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  props: ["info"],
  data() {
    return {
      attrArr: [
        {
          value:"",
        },
      ],

      //提交给后端的数据
      form: {
        specsname: "",
        attrs:"",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal: "spec/requestTotal",
    }),
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [
        {
          value: "",
        },
      ];
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    add() {
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }

      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));

      requestSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //清空
          this.empty();
          //弹框消失
          this.cancel();
          //重新获取角色列表数据
          this.requestList();
          //重新获取总的数量
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // getDetail(id){

    // },
    // update(){

    // }
  },
};
</script>

<style scoped lang="stylus">
.add >>> .el-form-item__content {
  display: flex !important;
}

.add >>> .el-input {
  flex: 1;
}

.add >>> .el-button {
  width: auto;
}
</style>