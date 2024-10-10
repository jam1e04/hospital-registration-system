<template>
 <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>实名认证</span>
      </div>
    </template>
    <div class="tip" style="color: #7f7f7f;">
        <p><el-icon><InfoFilled/></el-icon>完成实名认证才能添加就诊人，正常进行挂号</p>
      </div>
      <el-descriptions style="margin-top: 5px;"
      v-if="userInfo.authStatus==1"
    class="margin-top"
    size="small"
    :column="1"
    border
  >
    <el-descriptions-item label-align="center" :width="20">
      <template #label>
        <div class="cell-item">
          用户信息
        </div>
      </template>
      {{ userInfo.name }}
    </el-descriptions-item>
    <el-descriptions-item label-align="center" :width="20">
      <template #label>
        <div class="cell-item">
          证件类型
        </div>
      </template>
      {{ userInfo.certificatesType=='10'?'身份证':'户口本' }}
    </el-descriptions-item>
    <el-descriptions-item label-align="center" :width="20">
      <template #label>
        <div class="cell-item">
          证件号码
        </div>
      </template>
      {{ userInfo.certificatesNo }}
    </el-descriptions-item>
    
  </el-descriptions>

  <el-form style="width: 60%; margin: 20px auto;" label-width="80" :model="params" :rules="rules" ref="form" v-else>
    <el-form-item label="用户姓名" prop="name">
      <el-input placeholder="请输入用户姓名" v-model="params.name"></el-input>
    </el-form-item>
    <el-form-item  label="证件类型" prop="certificatesType">
      <el-select style="width: 100%;" placeholder="请选择证件类型" v-model="params.certificatesType">
        <el-option :label="item.name" :value="item.value" v-for="(item,index) in arrType" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item  label="证件号码" prop="certificatesNo">
      <el-input placeholder="请输入证件号" v-model="params.certificatesNo"></el-input>
    </el-form-item>
    <el-form-item  label="上传证件" prop="certificatesUrl">
      <el-upload
        ref="upload"
        list-type="picture-card"
        action="/api/oss/file/fileUpload"
        limit="1"
        :on-exceed="exceedhandler"
        :on-successhandler="successhandler"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full v-if="params.certificatesUrl"alt="Preview Image" style="width: 100%;height: 100%;" :src="params.certificatesUrl" />
  </el-dialog>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="reset">重写</el-button>
    </el-form-item>
  </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { InfoFilled,Plus } from '@element-plus/icons-vue';
import { reqUserInfo,reqCertationType, reqUserCertation } from '../../../api/user';
import { ref,onMounted ,reactive} from 'vue';
import { UserInfoResponseData,CertationArr, CertationTypeResponseData,UserParams } from '../../../api/user/type';
import { ElMessage } from 'element-plus';

let userInfo = ref<any>({})

let arrType = ref<CertationArr>([])

// 收集表单数据
let params = reactive<UserParams>({
    certificatesNo: '',
    certificatesType: '',
    certificatesUrl: '',
    name: ''
})

let dialogVisible = ref<boolean>(false)

let upload = ref()

// 获取form组件
let form = ref()

onMounted(() => {
  getUserInfo()
  getType()
})

const getUserInfo = async() => {
  let result:UserInfoResponseData = await reqUserInfo()
  if(result.code == 200){
    userInfo.value = result.data
  }  
}

const getType = async() => {
let result:CertationTypeResponseData = await reqCertationType()
if(result.code == 200){
  arrType.value = result.data
}
}

// 超出数量的钩子
const exceedhandler = () => {
  ElMessage({
    type:'error',
    message:'图片只能上传一张'
  })
}

// 图片上传成功钩子
const successhandler = (response:any) =>{
  form.value.clearValidate('certificataUrl')
  params.certificatesUrl = response.data
}

// 图片预览钩子
const handlePictureCardPreview = () => {
  dialogVisible.value = true
}

// 图片删除
const handleRemove = () => {
  params.certificatesUrl=''
}

// 重写函数运用es6新语法
const reset = () => {
  // 清楚上传列表
  upload.value.clearFiles
  Object.assign(params,{
    certificatesNo: '',
    certificatesType: '',
    certificatesUrl: '',
    name: ''
  })
}

const submit = async() => {
  await form.value.validate()
  try {
    await reqUserCertation(params)
    ElMessage({
      type:'success',
      message:'认证成功'
    })
  } catch (error) {
    ElMessage({
      type:'error',
      message:' 认证失败'
    })
  }
}

const validatorName = (rule:any,value:any,callBack:any) => {
  const reg =  /^[\u4e00-\u9fa5]{2,4}$/ 
  if(reg.test(value)){
    callBack()
  }else{
    callBack(new Error('请输入正确的名字'))
  }
}


const validatorType = (rule:any,value:any,callBack:any) => {
  if(value=='10'||value=='20'){
    callBack()
  }else{
    callBack(new Error('请选择正确的证件'))
  }
}

const validatorNo = (rule:any,value:any,callBack:any) => {
  const reg1 = /^\d{9}$/ 
  const reg2 = /^\d{17}$/ 
  if(reg1.test(value)||reg2.test(value)){
    callBack()
  }else{
    callBack(new Error('请输入正确的证件号'))
  }
}

const validatorUrl = (rule:any,value:any,callBack:any) => {
  if(value.length){
    callBack()
  }else{
    callBack(new Error('请上传证件照'))
  }
}

// 校验规则
const rules = {
  name:[
    {
    required:true,
    validator:validatorName
  }
],
certificatesType:[
  {
    required:true,
    validator:validatorType
  }
],
certificatesNo:[
  {
    required:true,
    validator:validatorNo
  }
],
certificatesUrl:[
  {
    required:true,
    validator:validatorUrl
  }
],
}


</script>

<style scoped lang="scss">
.box-card{
  .tip{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  }
}
</style>