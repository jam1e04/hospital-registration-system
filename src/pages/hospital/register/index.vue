<template>
  <div class="register">
    <div class="top">
      <div class="title">{{hospitalStore.hospitalInfo.hospital?.hosname}}</div>
      <div class="level">{{hospitalStore.hospitalInfo.hospital?.param.hostypeString}}</div>
    </div>
    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,`+hospitalStore.hospitalInfo.hospital?.logoData" alt="">
      </div>
      <div class="right">
        <div>挂号规则</div>
        <div class="time">
          挂号周期：10天  放号时间：{{hospitalStore.hospitalInfo.bookingRule?.releaseTime}}  停挂时间：{{hospitalStore.hospitalInfo.bookingRule?.stopTime}}
        </div>
        <div class="address">
          具体地址：{{hospitalStore.hospitalInfo.hospital?.address}}
        </div>
        <div class="route">
          规划路线:{{hospitalStore.hospitalInfo.hospital?.route}}
        </div>
        <div class="releasetime">
          退号时间：就诊前一工作日{{hospitalStore.hospitalInfo.bookingRule?.quitTime}}前取消
        </div>
        <div class="rule">预约挂号规则</div>
        <div class="ruleInfo" v-for="(item,index) in hospitalStore.hospitalInfo.bookingRule?.rule " :key="index">
          {{item}}
        </div>
      </div>
    </div>
    <!-- 放置医院科室 -->
     <div class="department">
      <div class="leftNav">
        <ul>
          <li @click="changeIndex(index)" v-for="(department,index) in hospitalStore.departmentArr" :key="department.depcode" :class="{active:index == currentIndex}">{{department.depname}}</li>
        </ul>
      </div>
      <div class="departmentInfo">
        <!-- 大科室 -->
         <div class="showDepartment" v-for="department in hospitalStore.departmentArr" :key="department.depcode">
          <h1 class="cur">{{department.depname}}</h1>
          <!-- 小科室 -->
          <ul>
            <li @click="showLogin(item)" v-for="item in department.children" :key="item.depcode">
              {{item.depname}}
            </li>
          </ul>
         </div>
      </div>
     </div>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from '../../../store/modules/hospitalDetail';
import { ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
let currentIndex = ref<number>(0)
let hospitalStore = useDetailStore()
let $router = useRouter()
let $route = useRoute()
const changeIndex = (index:number) => {
  currentIndex.value = index
   //点击导航获取右侧科室（大的科室H1标题）
   let allH1 = document.querySelectorAll('.cur');
    //滚动到对应科室的位置
    allH1[currentIndex.value].scrollIntoView({
        behavior:'smooth',//过渡动画效果
        block:'start'//滚动的位置，起始位置
    });
}

const showLogin = (item:any) => {
  console.log(item)
  $router.push({path:'/hospital/register_step1',query:{hoscode:$route.query.hoscode,depcode:item.depcode}})
}

</script>

<style scoped lang="scss">
.register {
  .top {
    display: flex;
    .title {
      font-size: 25px;
      font-weight: 900;
    }
    .level {
      margin-left: 10px;
      text-align: center;
      line-height: 40px;
      color: #7f7f7f;
      height: 40px;
    }
  }
  .content {
    margin-top: 10px;
    display: flex;
    .left {
      width: 80px;
      margin-right: 10px;
      img {
        height: 80px;
        width: 80px;
        border-radius: 50%;
      }
    }
    .right {
      flex:1;
      .time ,.address ,.route ,.releasetime ,.rule ,.ruleInfo {
        color: #7f7f7f;
        margin-top: 10px;
      }
    }
  }
  .department {
    margin-top: 20px;
    width: 100%;
    height: 500px;
    display: flex;
    .leftNav {
      width: 80px;
      height: 100%;
      ul{
        background-color: rgb(248,248,248);
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        li{
          flex:1;
          text-align: center;
          color: #7f7f7f;
          font-size: 14px;
          line-height: 30px;
          cursor: pointer;
          &.active {
          border-left: 1px solid red;
          color: red;
          background-color: #fff;
        }
        }
      }
    }
    .departmentInfo {
      flex: 1;
      margin-left: 20px;
      overflow: auto;
      &::-webkit-scrollbar{
        display: none;
      }
      .showDepartment {
        h1{
          background-color: rgb(248,248,248);
          color: #7f7f7f;
        }
        ul{
          display: flex;
          flex-wrap: wrap;
          li{
            color: #7f7f7f;
            width: 33%;
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>