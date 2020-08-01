<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <del-btn @confirm="del(scope.row.id)"></del-btn> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
    ...mapActions({
        requestList:"member/requestList"
    }),
    // del(id){
    //     requestRoleDelete({id:id}).then(res=>{
    //         if(res.data.code==200){
    //             successAlert('删除成功')
    //             this.requestList()
    //         }else{
    //             warningAlert(res.data.msg)
    //         }
    //     })
    // }
  },
  mounted() {
      this.requestList()
  },
  computed: {
      ...mapGetters({
          list:"member/list"
      })
  },
};
</script>

<style>
</style>