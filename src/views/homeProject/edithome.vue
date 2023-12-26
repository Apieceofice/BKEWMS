<template>
  <div>
    <el-page-header content="编辑产品" @back="handleBack()" title="产品管理" />

    <el-form ref="homeFormRef" :model="homeForm" :rules="homeFormRules" label-width="80px" class="demo-ruleForm">
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="homeForm.title" />
      </el-form-item>

      <el-form-item label="产品简要描述" prop="introduction">
        <el-input v-model="homeForm.introduction" type="textarea" />
      </el-form-item>

      <el-form-item label="产品详细描述" prop="detail">
        <el-input v-model="homeForm.detail" type="textarea" />
      </el-form-item>

      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="homeForm.cover" @kerwinchange="handleChange" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">更新产品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Upload from "@/components/upload/Upload";
import upload from "@/util/upload";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
const homeFormRef = ref();
const homeForm = reactive({
  title: "",
  introduction: "",
  detail: "",
  cover: "",
  file: null
});

const homeFormRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入简要描述", trigger: "blur" }
  ],
  detail: [{ required: true, message: "请输入详细描述", trigger: "blur" }],
  cover: [{ required: true, message: "请上传产品图片", trigger: "blur" }]
});

//每次选择完图片之后的回调
const handleChange = file => {
  homeForm.cover = URL.createObjectURL(file);
  homeForm.file = file;
};
const router = useRouter();
const route = useRoute();
const submitForm = () => {
  homeFormRef.value.validate(async valid => {
    if (valid) {
      //提交数据到后端
      // console.log(productForm)
      await upload("/adminapi/homeduct/list", homeForm);

      router.push(`/homeProject/listhome`);
    }
  });
};

const handleBack = () => {
  router.back();
};

onMounted(() => {
  getData();
});

const getData = async () => {
  const res = await axios.get(`/adminapi/homeduct/list/${route.params.id}`);
  //   console.log(res.data.data[0]);
  Object.assign(homeForm, res.data.data[0]);
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>