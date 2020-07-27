<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="80px">
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled="disabled"></el-option>
            <el-option label="顶级分类" :value="0"></el-option>

            <!-- 动态数据 -->
            <el-option :label="form.label" v-for="item in list" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="form.catename" placeholder="手机通讯" clearable></el-input>
        </el-form-item>
        <!--  v-if="form.pid!==0" -->
        <el-form-item label="图片" label-width="80px" v-if="form.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类名称" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import { requestCateAdd, requestCateDetail,requestCateUpdate } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },

  props: ["info"],
  data() {
    return {
      imageUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  methods: {
    cancel() {
      this.info.show = false;
    },
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imageUrl = "";
    },
    changeImg(e) {
      //上传的图片不能超过2M
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("图片太大，不能上传");
        return;
      }
      //文件的后缀
      var extname = e.name.slice(e.name.lastIndexOf("."));
      var extarr = [".jpg", ".gif", ".png", ".jpeg"];
      if (!extarr.some((item) => item === extname)) {
        warningAlert("上传文件必须是图片");
        return;
      }

      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    add() {
      requestCateAdd(this.form).then((res) => {
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
    ...mapActions({
      requestList: "cate/requestList",
    }),
    //获取某一条数据
    getDetail(id) {
      requestCateDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + res.data.list.img;
      });
    },
    //修改
    update() {
      requestCateUpdate(this.form).then((res) => {
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

<style scoped lang="stylus">
.add>>>.el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add>>>.el-upload:hover {
  border: 1px dashed #409eff !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>