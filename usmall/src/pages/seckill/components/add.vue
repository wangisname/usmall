<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="80px">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="value"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeFirst()">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" @change="changeSecond()">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="80px">
          <el-select v-model="form.goodsid" placeholder="请选择分类">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { requestSeckillAdd,requestSeckillDetail,requestSeckillUpdate } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      value: [],
      //二级分类的数组
      secondCateArr: [],
      form: {
        id: "",
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "seckill/list",
      //商品一级分类编号first_cateid
      cateList: "cate/list",
      //商品二级分类编号second_cateid
      specList: "spec/list",
      //商品编号goodsid
      goodsList: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      requestSeckillList: "seckill/requestList",
      //获取分类列表
      requestCateList: "cate/requestList",
      //获取规格列表
      requestSpecList: "spec/requestList",
      //获取商品列表
      requestGoodsList: "goods/requestList",
    }),
    
    empty() {
      this.form = {
        id: "",
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.value=[]
    },
    cancel() {
      this.info.show = false;
      if(!this.info.isAdd){
        this.empty()
      }
    },
    changeFirst(bool) {
      var index = this.cateList.findIndex(
        (item) => item.id === this.form.first_cateid
      );
      this.secondCateArr = this.cateList[index].children;

      //传了true,second_cateid就不置空；没传就置空
      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    changeSecond(){
      this.requestGoodsList({fid:this.form.first_cateid,sid:this.form.second_cateid})
    },
    add() {

      this.form.begintime=new Date(this.value[0]).getTime()
      this.form.endtime=new Date(this.value[1]).getTime()
      requestSeckillAdd(this.form).then((res) => {
          if(res.data.code==200){
              successAlert("添加成功")
              this.empty()
              this.cancel()
              this.requestSeckillList()
          }else{
              warningAlert(res.data.msg)
          }
      });
    },
    getDetail(id){
      requestSeckillDetail({id:id}).then(res=>{
        this.form=res.data.list
        this.form.id=id
        this.value=[new Date(parseInt(this.form.begintime)),new Date(parseInt(this.form.endtime))]
        this.requestCateList({ istree: true, pid: this.form.first_cateid });
        this.requestGoodsList({fid:this.form.first_cateid,sid:this.form.second_cateid})
      })
    },
    update(){
      this.form.begintime=new Date(this.value[0]).getTime()
      this.form.endtime=new Date(this.value[1]).getTime()
      requestSeckillUpdate(this.form).then(res=>{
        if(res.data.code==200){
              successAlert("修改成功")
              this.empty()
              this.cancel()
              this.requestSeckillList()
          }else{
              warningAlert(res.data.msg)
          }
      })
    }
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.requestCateList();
    }
    this.requestSpecList()
    this.requestSeckillList()
  },
};
</script>

<style>
</style>