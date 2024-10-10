<template>
  <div class="hospital">
      <div class="menu">
        <div class="top"><el-icon><HomeFilled /></el-icon>/医院详情</div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register/')">
            <el-icon><Calendar /></el-icon>
            <span>预约挂号</span>
          </el-menu-item>
          <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
            <el-icon><document /></el-icon>
            <span>预约详情</span>
          </el-menu-item>
          <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
            <el-icon><Warning /></el-icon>
            <span>预约须知</span>
          </el-menu-item>
          <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
            <el-icon><InfoFilled /></el-icon>
            <span>停诊信息</span>
          </el-menu-item>
          <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
            <el-icon><Search /></el-icon>
            <span>查询取消</span>
          </el-menu-item>
        </el-menu>
      </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter,useRoute } from 'vue-router';
import { onMounted } from 'vue';
import useDetailStore from '../../store/modules/hospitalDetail'
// 获取仓库对象
let detailStore = useDetailStore()
let $router = useRouter()
let $route = useRoute()
import {
  Document,
  Search,
  InfoFilled,
  HomeFilled,
  Calendar,
  Warning
} from '@element-plus/icons-vue'

const changeActive = (path:string)=> {
  $router.push({path,query:{hoscode:$route.query.hoscode}})
}
onMounted(() => {
  detailStore.getHospital($route.query.hoscode as string)
  detailStore.getDepartment($route.query.hoscode as string)
})
</script>

<style scoped lang="scss">

.hospital{
  display: flex;
  .menu{
    flex:2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top{
      display: flex;
      color: #7f7f7f;
      align-items: center;
    }
  }
  .content{
    flex:8;
  }
}
</style>