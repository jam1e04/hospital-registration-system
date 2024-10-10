<template>
  <div class="search">
    <el-autocomplete
        clearable
        placeholder="请你输入医院名称"
        v-model="hosname"
        :fetch-suggestions="fetchData"
        :trigger-on-focus="false"
        @select="goDetail"
      />
      <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
// 引入图标
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue';
// 引入请求方法
import { reqHospitalInfo } from '../../../api/home';
import { HospitalInfo } from '../../../api/home/type';
// 引入路由方法
import { useRouter } from 'vue-router';
// 创造路由器对象
let $router = useRouter()
// 收集搜索医院关键字
let hosname = ref<string>('')
// 顶部组件回调
const fetchData = async(keyword:string,cb:any) =>{
  // 当用户输入完关键字，发送请求
  let result:HospitalInfo =  await reqHospitalInfo(keyword)
  console.log(result.data)
  // 整理数据，变成人家组件需要的数据格式
  let showData = result.data.map(item=>{
    return {
       value: item.hosname ,//展示医院的名字
       hoscode:item.hoscode //存储医院的编码，为了传递参数路由跳转
    }
  })
  // 给组件展示的数组
  cb(showData)
}

//点击某一个选项 
const goDetail = (item:any) =>{
  // 点击推荐项目进入医院详情页，需要携带query参数（医院的编码）
  $router.push({path:'/hospital/register',query:{hoscode:item.hoscode}})
}
</script>

<style scoped lang="scss">

.search {
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;

  ::v-deep .el-input__wrapper{
    margin-right: 10px;
  }
}
</style>