<template>
  <div class="region">
    <div class="content">
      <div class="left">地区：</div>
      <ul>
        <li :class="{active:regionFlag == ''}" @click="changeRegion('')">全部</li>
        <li v-for="region in regionArr" @click="changeRegion(region.value)" :key="region.value" :class="{active: regionFlag == region.value}">{{region.name}}</li>
      </ul>
    </div>

  </div>
</template>

<script setup lang="ts">
 import { reqHospitalLevelAndRegion } from '../../../api/home';
  import { onMounted,ref } from 'vue';
  import type {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from '../../../api/home/type'
  onMounted(() => {
    getRegion()
  })
  // 定义存储地区数组
  let regionArr = ref<HospitalLevelAndRegionArr>([])
  // 地区高亮
  let regionFlag = ref<string>('')
  const getRegion = async() =>{
    let result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin')
    if(result.code==200){
      regionArr.value = result.data
    }
  }
  const changeRegion = (region:string) => {
    regionFlag.value = region
    $emit('getRegion',region)
  }
  // 子传父
  let $emit = defineEmits(['getRegion'])
</script>

<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 10px;
  .content {
    display: flex;
    .left {
      margin-right: 10px;
      width: 60px;
      margin-left: 10px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 10px;
        margin-bottom: 5px;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover{
        color: #55a6fe;
        cursor: pointer;
      }
    }
  
  }
}
</style>