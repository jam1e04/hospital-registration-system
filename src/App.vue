<template>
  <div class="container">
    <!-- 顶部 -->
     <HospitalTop/>
     <!-- 展示路由区域 -->
      <div class="content">
        <!-- 展示路由 -->
        <router-view></router-view>
      </div>
      <HospitalBottom/>
      <Login v-if="userStore.visiable"/>
  </div>
</template>

<script setup lang="ts">
import useUserStore from './store/modules/user';
import request from './utils/request';
let userStore = useUserStore()
// import { onMounted } from 'vue';
// onMounted(() => {
//   //返回promsie 用.then
//   request.get('/hosp/hospital/1/10').then((res) => {
//     console.log('展示获取数据',res)
//   })
// })
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 1200px;
    background-color: #fff;
  }
  }
  
</style>