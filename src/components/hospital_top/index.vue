<template>
  <div class="top">
    <div class="content">
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="">
        <p>医院预约挂号系统</p>
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <p @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
        <!-- 如果有用户的信息 -->
        <el-dropdown>
    <span class="el-dropdown-link">
      {{userStore.userInfo.name}}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="changeActive('/user/certification')">实名认证</el-dropdown-item>
        <el-dropdown-item @click="changeActive('/user/order')">挂号订单</el-dropdown-item>
        <el-dropdown-item @click="changeActive('/user/patient')">就诊人管理</el-dropdown-item>
        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useUserStore from '../../store/modules/user';
import { ArrowDown } from '@element-plus/icons-vue';
let userStore = useUserStore()
let $router = useRouter()
const goHome = () => {
  $router.push({path:'/home'})
}

// 点击登录与注册弹出对话框
const login = () => {
  userStore.visiable = true
}

const changeActive = (path:string) => {
  $router.push({path:path})
}

// 退出登录
const logOut = () => {
  // 通知pinia仓库清楚用户相关信息
  userStore.logOut()
  $router.push({path:'/home'})
}
</script>

<style scoped lang="scss">
  .top {
    position: fixed;
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    z-index: 999;
  }
  .content {
    width: 1200px;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 5px;
      }
      p {
        font-size: 20px;
        color: #55a6fe;
        cursor: pointer;
      }
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      .help {
        margin-right: 5px;
      }
      p {
        font-size: 14px;
        color: #bbb;
      }
    }
  }
</style>