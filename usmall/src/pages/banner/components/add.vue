<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="标题" label-width="80px">
          <el-input placeholder="请输入内容" v-model="form.title" clearable></el-input>
        </el-form-item>

        <!--  v-if="form.pid!==0" -->
        <!-- :on-change="changeImg" -->
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
        <el-form-item label="状态" label-width="80px">
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
import { mapActions, mapGetters } from "vuex";
import {
  requestBannerAdd,
  requestBannerDetail,
  requestBannerUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "",
        img: null,
        status: 1,
      },
      imageUrl: "",
    };
  },
  methods: {
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      this.imageUrl = "";
    },
    cancel() {
      this.info.show = false;
    },
    changeImg(e) {
      if (e.size > 6 * 1024 * 1024) {
        warningAlert("图片太大，不能上传");
        return;
      }
      var extname = e.name.slice(e.name.lastIndexOf("."));
      var extarr = [".jpg", ".png", ".gif", ".jpeg"];
      if (!extarr.some((item) => item === extname)) {
        warningAlert("上传文件必须是图片");
        return;
      }
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    add() {
      requestBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestBannerDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + res.data.list.img;
      });
    },
    update() {
      requestBannerUpdate(this.form).then((res) => {
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
      requestList: "banner/requestList",
    }),
  },
  computed: {
    ...mapGetters({
      list:"banner/list"
    })
  },
};
</script>

<style scoped lang="stylus">
.add>>>.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add>>>.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
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