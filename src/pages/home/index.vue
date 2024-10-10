<template>
  <!-- 轮播图 -->
   <Carousel/>
   <!-- 搜索表单 -->
    <Search/>
    <!-- 底部展示医院结构 -->
     <el-row gutter="20">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <Level @getLevel="getLevel"/>
        <!-- 地区子组件 -->
        <Region @getRegion="getRegion"/>
        <!--展示医院结构 -->
        <div class="hospital">
          <Card class="item" v-for="(item,index) in hasHospitalArr" :key="index" :hospitalInfo="item"/>
          <!-- 分页器 -->
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout="prev, pager, next, jumper,sizes,total"
            :total="total"
            @current-change="currentChange"
            @size-change="sizeChange"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <Tip/>
      </el-col>
     </el-row>
</template>

<script setup lang="ts">
  import Carousel from './carousel/index.vue'
  import Search from './search/index.vue'
  // 引入首页等级组件
  import Level from './level/index.vue'
  import Region from './region/index.vue'
  import Card from './card/index.vue'
  import Tip from './tip/index.vue'
  // 分页器需要的数据
  import {onMounted,ref} from 'vue'
  import { reqHospital } from '../../api/home'
  import type {Content,HospitalResponseData} from '../../api/home/type'  
  // 分页器页码
  let pageNo = ref<number>(1)
  //一页展示多少数据
  let pageSize = ref<number>(10)
  // 存储已有医院个数
  let hasHospitalArr = ref<Content>([])
  //存储医院总个数
  let total = ref<number>(0)
  let hostype = ref<string>('')
  let districtCode = ref<string>('')
  onMounted(() => {
    getHospitalInfo()
  })
  const getHospitalInfo = async() => {
    let result: HospitalResponseData = await reqHospital(pageNo.value,pageSize.value,hostype.value,districtCode.value)
    if(result.code==200){
      hasHospitalArr.value = result.data.content
      total.value = result.data.totalElements
    }
    console.log(result)
  }
  // 分页器页码发生变化回调
  const currentChange = ()=> {
    getHospitalInfo()
  }
  // 分页器下拉菜单变化发生回调
  const sizeChange = ()=> {
    getHospitalInfo()
  }

  // 子组件自定义事件：获取儿子给父组件传递过来的等级参数
  const getLevel = (level :string) => {
    hostype.value = level
    getHospitalInfo()
  }
  // 子组件自定义事件：获取儿子给父组件传递过来的地区参数
  const getRegion = (region :string) => {
    districtCode.value = region
    getHospitalInfo()
  }
</script>

<style scoped lang="scss">
.hospital{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item{
    width: 48%;
    margin: 10px 0px
  }
}

</style>