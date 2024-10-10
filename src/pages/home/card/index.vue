<template>
  <div>
    <el-card class="box-card" shadow="hover" @click="goDetail">
      <div class="content">
        <div class="left">
          <div class="hospital_name">
            {{hospitalInfo.hosname }}
          </div>
          <div class="tip">
            <div class="level">{{hospitalInfo.param.hostypeString}}</div>
            <div class="time">每天{{hospitalInfo.bookingRule?.releaseTime}}放号</div>
          </div>
        </div>
      <div class="right">
        <img :src="`data:image/jpeg;base64,${hospitalInfo.logoData}`" alt="">
      </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
let $router = useRouter()

// 点击卡片的时候跳转到医院详情页
const goDetail = () => {
    $router.push({path:'/hospital/register',query:{hoscode:props.hospitalInfo.hoscode}})
}
//接受父组件传递过来的props，即已有的医院数据
let props = defineProps(['hospitalInfo'])
</script>

<style scoped lang="scss">
.content{
  display: flex;
  justify-content: space-between;
  .right{
    img{
      width: 50px;
      height: 50px;
    }
  }
  .left{
    width: 60%;
    .tip{
      color: #7f7f7f;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>