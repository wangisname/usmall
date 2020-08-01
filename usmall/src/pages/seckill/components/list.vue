<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="80"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { requestSeckillDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      requestSeckillDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestlist;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    ...mapActions({
      requestlist: "seckill/requestlist",
    }),
  },
  mounted(){
    this.requestlist()
  }
};
</script>

<style>
</style>