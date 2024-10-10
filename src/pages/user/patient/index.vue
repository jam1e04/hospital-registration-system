<template>
 <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>就诊人管理</span>
        <el-button type="success" :icon="User" @click="addUser">添加就诊人</el-button>
      </div>
    </template>
    <div class="visitors" v-if="scene==0">
      <visitor @removeUser="removeUser" @changeScene="changeScene" class="item" v-for="(user,index) in userArr" :key="user.id" :user="user" :index="index"/>
    </div>

    <!-- 添加就诊人或者修改就诊人 -->
     <div class="form" v-if="scene==1">
      <el-divider content-position="left">就诊人信息</el-divider>
      <el-form style="width: 60%;margin: 10px auto;">
        <el-form-item label="用户姓名">
          <el-input placeholder="请你输入用户姓名" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请你选择证件类型" v-model="userParams.certificatesType">
            <el-option v-for="item in certationArr" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请你输入证件号码" v-model="userParams.certificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="userParams.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker type="date" placeholder="请你选择日期" v-model="userParams.birthdate" value-format="YYYY-MM-DD"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请你输入手机号码" v-model="userParams.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">建档信息</el-divider>
      <el-form style="width: 60%;margin: 10px auto;">
        <el-form-item label="婚姻状况">
          <el-radio-group v-model="userParams.isMarry">
            <el-radio :label="1">已婚</el-radio>
            <el-radio :label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group v-model="userParams.isInsure">
            <el-radio :label="1">自费</el-radio>
            <el-radio :label="0">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前的住址">
            <el-cascader :props="props" v-model="userParams.addressSelected"/>
        </el-form-item>
        <el-form-item label="详细的住址">
          <el-input placeholder="请你输入用户详细的住址" v-model="userParams.address"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">联系人信息（选填）</el-divider>
      <el-form style="width: 60%;margin: 10px auto;" >
        <el-form-item label="联系人姓名">
          <el-input placeholder="请你输入联系人姓名" v-model="userParams.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请你选择证件类型" v-model="userParams.contactsCertificatesType" >
            <el-option v-for="item in certationArr" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请你输入证件号码" v-model="userParams.contactsCertificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请你输入手机号码" v-model="userParams.contactsPhone"></el-input>
        </el-form-item>
        <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="reset">重写</el-button>
    </el-form-item>
      </el-form>
     </div>
  </el-card>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue';
import { reqGetUser } from '../../../api/hospital';
import { reqAddOrUpdataUser, reqCertationType } from '../../../api/user';
import { ref,onMounted,reactive,watch } from 'vue';
import { UserResponseData,UserArr } from '../../../api/hospital/type';
import visitor from '@/components/visitor/visitor.vue';
import { AddOrUpdata, CertationArr, CertationTypeResponseData } from '../../../api/user/type';
import { reqCity } from '../../../api/user';
import { ElMessage, type CascaderProps } from 'element-plus'
import { useRouter,useRoute } from 'vue-router';
let $router = useRouter()
let $route = useRoute()
let userArr = ref<UserArr>([])

// 定义一个响应数据，决定卡片展示的内容
let scene = ref<number>(0)

let certationArr = ref<CertationArr>([])

// 表单数据
let userParams = reactive<AddOrUpdata>({
    addressSelected: [],
    birthdate: '',
    address:'',
    certificatesNo: '',
    certificatesType: '',
    contactsCertificatesNo: '',
    contactsCertificatesType: '',
    contactsName: '',
    contactsPhone: '',
    isInsure: 0,
    isMarry: 0,
    name: '',
    phone: '',
    sex: 0,
})

onMounted(() => {
  getUser()
  getCertationType()
  if($route.query.type=='add'){
    scene.value=1
  }
  if($route.query.type=='edit'){
    scene.value=1
  }
})

const getUser = async() => {
  let result:UserResponseData = await reqGetUser()
  if(result.code == 200){
    userArr.value = result.data
  } 
}

const getCertationType = async() => {
  let result:CertationTypeResponseData = await reqCertationType()
  if(result.code == 200){
    certationArr.value = result.data
  }
}

const addUser = () => {
  scene.value = 1
  reset()
}

const changeScene = (user:AddOrUpdata) => {
  scene.value = 1
  Object.assign(userParams,user)
}
// 子组件自定义事件
const removeUser = () => {
  getUser()
}

// 级联选择器数据
const props:CascaderProps = {
  lazy:true,//懒加载数据
  // 加载方法
  async lazyLoad(node:any, resolve:any) {
    let result:any = await reqCity(node.data.id||'86')
    // 整理数据
    let showData = result.data.map(((item:any) => {
      return {
        leaf:!item.hasChildren,
        label:item.name,
        value:item.value,
        id:item.id
      }
    }))
    // 注入组件需要展示的数据
    console.log(showData)
    resolve(showData)
  }
}

const submit = async() => {
  try {
    await reqAddOrUpdataUser(userParams)
    ElMessage({
      type:'success',
      message:userParams.id?'更新成功':'新增失败'
    })
    if($route.query.type){
      $router.back()
    }else{
      scene.value=0
    }
    getUser()
  } catch (error) {
    ElMessage({
      type:'error',
      message:userParams.id?'更新失败':'新增失败'
    })
  }
}

watch(
  () => userArr.value,
  () => {
    if($route.query.type == 'edit'){
      let user = userArr.value.find((item:any) => {
        return item.id == $route.query.id
      })
      Object.assign(userParams,user)
    }
  }
)

const reset = () => {
  Object.assign(userParams,{
    id:null,
    addressSelected: [],
    birthdate: '',
    address:'',
    certificatesNo: '',
    certificatesType: '',
    contactsCertificatesNo: '',
    contactsCertificatesType: '',
    contactsName: '',
    contactsPhone: '',
    isInsure: 0,
    isMarry: 0,
    name: '',
    phone: '',
    sex: 0,
  })
}
</script>

<style scoped lang="scss">
.card-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.visitors{
  display: flex;
  flex-wrap: wrap;
  .item{
    width: 32%;
    margin: 5px;
  }
}
</style>