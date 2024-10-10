<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>请选择就诊人</span>
        <el-button type="primary" :icon="User" @click="goUser">添加就诊人</el-button>
      </div>
      <div class="user">
        <visitor @click="changeIndex(index)" v-for="(user,index) in userArr" :key="user.id" class="item" :user="user" :index="index" :currentIndex="currentIndex"/>
      </div>
    </template>
  </el-card>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>挂号信息</span>
      </div>
    </template>
    <el-descriptions
    class="margin-top"
    :column="2"
    border
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          就诊日期：
        </div>
      </template>
      {{ docInfo.workDate }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          就诊医院：
        </div>
      </template>
      {{ docInfo.param?.hosname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          就诊科室：
        </div>
      </template>
      {{ docInfo.param?.depname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生姓名：
        </div>
      </template>
      {{ docInfo.docname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生职称：
        </div>
      </template>
      {{ docInfo.title }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生专长：
        </div>
      </template>
      {{ docInfo.skill }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生服务费：
        </div>
      </template>
      {{ docInfo.amount }}
    </el-descriptions-item>

  </el-descriptions>
  </el-card>
  <div class="btn">
    <el-button @click="submitOrder" type="primary" :disabled="currentIndex==-1?true:false">确认挂号</el-button>
  </div>
  </div>
</template>

<script setup lang="ts">
import visitor from '@/components/visitor/visitor.vue';
import { User } from '@element-plus/icons-vue';
import { UserResponseData,UserArr,DoctorInfoData } from '../../../api/hospital/type';
import { reqDoctorInfo, reqGetUser } from '../../../api/hospital';
import { ref,onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { SubmitOrder } from '../../../api/user/type';
import { reqSubmitOrder } from '../../../api/user';
import { ElMessage } from 'element-plus';

let userArr = ref<UserArr>([])
let docInfo = ref<any>({})
let $route = useRoute()
let $router = useRouter()

// 存储就诊人索引值
let currentIndex = ref<number>(-1)

onMounted(() => {
  fetchUserData()
  fetchInfo()
})
// 获取就诊人信息
const fetchUserData = async() => {
  let result:UserResponseData = await reqGetUser()
  if(result.code == 200){
    userArr.value = result.data
  }
}
// 获取医生信息
const fetchInfo = async() => {
  let result:DoctorInfoData = await reqDoctorInfo($route.query.docId as string)
  if(result.code == 200){
    docInfo.value = result.data
  }
}

const changeIndex = (index:number) => {
  currentIndex.value = index
}
//提交订单 
const submitOrder = async() => {
  let hoscode = docInfo.value.hoscode
  // 医生的Id
  let scheduleId = docInfo.value.id
  let patientId = userArr.value[currentIndex.value].id
  let result:SubmitOrder = await reqSubmitOrder(hoscode,scheduleId,patientId)
  console.log(result.code)
  if(result.code==200){
    console.log(result.data)
    $router.push({path:'/user/order',query:{orderId:result.data}})
  }else{
    ElMessage({
      type:"error",
      message:result.message
    })
  }
}

const goUser = () => {
  $router.push({path:'/user/patient',query:{type:'add'}})
}
</script>

<style scoped lang="scss">
.container{
  .tip{
    font-size: 30px;
    font-weight: 900;
    color: #7f7f7f;
  }
  .box-card{
    margin: 20px 0px;
  .card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .user{
    display: flex;
    flex-wrap: wrap;
    .item{
      width: 32%;
      margin: 5px;
    }
  }
}
.btn{
  margin: 10px 0;
  display: flex;
  justify-content: center;
}
}
</style>