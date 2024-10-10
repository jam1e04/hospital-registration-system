<template>
  <div class="wrap">
    <div class="top">
      <div class="hosname">{{workData.baseMap?.hosname}}</div>
      <div>{{workData.baseMap?.bigname}}</div>
      <div class="dot">.</div>
      <div class="hosdepartment">{{workData.baseMap?.depname}}</div>
    </div>
    <div class="center">
      <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
      <div class="container">
        <div class="item" @click="changeTime(item)" :class="{active:item.status==-1||item.availableNumber==-1, cur:item.workDate == workTime.workDate}" v-for="item in workData.bookingScheduleList" :key="item">
          <div class="top1">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
          <div class="bottom">
            <div v-if="item.status==-1">停止挂号</div>
            <div v-if="item.status==0">
              {{ item.availableNumber==-1?'约满了':`有号` }}
            </div>
            <div v-if="item.status==1">即将放号</div>
          </div>
        </div>
      </div>
      <el-pagination v-model:current-page="pageNo" layout="prev, pager, next" :total="workData.total" @current-change="fetchWorkData"/>
    </div>

    <div class="bottom">
      <div class="will" v-if="workTime.status==1">
        <div class="time">{{ workTime.workData }}</div>
        <div>放号</div>
      </div>
      <div class="doctor" v-else>
        <div class="morning">
          <div class="tip">
            <svg t="1726234717649" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4256" width="32" height="32"><path d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z" fill="#1296db" p-id="4257"></path></svg>
            <span>上午号源</span>
          </div>
          <div class="doc_info" v-for="doctor in morningArr" :key="doctor.id">
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <div class="right">
              <div class="money">{{ doctor.amount }}</div>
              <el-button type="primary" @click="goStep2(doctor)">剩余{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
        <div class="morning">
          <div class="tip">
            <svg t="1726235816437" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6796" width="32" height="32"><path d="M640 848a32 32 0 0 1 0 64H400a32 32 0 0 1 0-64H640z m181.284571-157.257143c16.877714-0.036571 30.646857 13.348571 30.976 30.043429a30.774857 30.774857 0 0 1-29.805714 31.195428l-1.170286 0.018286H202.605714a30.793143 30.793143 0 0 1-30.848-30.061714 30.774857 30.774857 0 0 1 29.677715-31.177143l1.170285-0.036572h618.697143z m-149.357714-403.309714c82.011429 56.923429 123.465143 154.020571 109.348572 250.112h163.748571c16.877714-0.018286 30.646857 13.348571 30.976 30.061714a30.774857 30.774857 0 0 1-29.805714 31.195429H78.811429a30.793143 30.793143 0 0 1-30.829715-30.043429 30.774857 30.774857 0 0 1 29.677715-31.195428l1.170285-0.018286h179.876572c-14.116571-96.091429 27.337143-193.188571 109.348571-250.112a267.026286 267.026286 0 0 1 303.853714 0z m-268.105143 50.102857c-65.206857 45.238857-96.877714 123.721143-82.139428 199.990857h396.617143c14.756571-76.269714-16.914286-154.752-82.102858-200.009143a204.196571 204.196571 0 0 0-232.374857 0zM122.550857 314.020571l1.097143 0.420572 71.442286 29.312c15.542857 6.4 23.04 23.954286 16.914285 39.460571a31.030857 31.030857 0 0 1-39.497142 17.572572l-1.097143-0.420572-71.442286-29.312a30.793143 30.793143 0 0 1-16.731429-16.566857 30.354286 30.354286 0 0 1 0-23.460571 31.030857 31.030857 0 0 1 39.314286-17.005715z m817.810286 16.493715a30.518857 30.518857 0 0 1-15.36 40.064l-1.097143 0.475428-71.460571 29.312a31.049143 31.049143 0 0 1-40.137143-16.054857 30.518857 30.518857 0 0 1 15.378285-40.082286l1.097143-0.475428 71.442286-29.312a31.049143 31.049143 0 0 1 40.137143 16.073143zM688.932571 82.176a30.537143 30.537143 0 0 1 17.737143 39.094857l-0.420571 1.097143-29.586286 70.765714a31.030857 31.030857 0 0 1-39.899428 16.859429 30.537143 30.537143 0 0 1-17.700572-39.222857l0.438857-1.097143 29.586286-70.765714a31.030857 31.030857 0 0 1 39.862857-16.731429zM374.308571 97.828571l0.475429 1.078858 29.586286 70.765714a30.537143 30.537143 0 0 1-16.219429 39.734857 31.067429 31.067429 0 0 1-40.466286-15.213714l-0.475428-1.097143-29.586286-70.747429a30.354286 30.354286 0 0 1 0-23.442285 31.049143 31.049143 0 0 1 56.685714-1.078858z" fill="#20D9F2" p-id="6797"></path></svg>
            <span>下午号源</span>
          </div>
          <div class="doc_info" v-for="doctor in afternoonArr" :key="doctor.id">
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <div class="right">
              <div class="money">{{ doctor.amount }}</div>
              <el-button type="primary" @click="goStep2(doctor)">剩余{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted,computed } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { reqHospitalWork,reqHospitalDocdor} from '../../../api/hospital';
import { HospitalWorkData,DoctorResponseData, DocArr, Doctor } from '../../../api/hospital/type';

let $route = useRoute()
let $router = useRouter()
let pageNo = ref<number>(1)
let limit = ref<number>(6)
//  存储医院科室挂号数据
let workData = ref<any>({})
// 存储排班日期第一个
let workTime = ref<any>({})
//  存储医生排班数据
let docArr = ref<DocArr>([])
onMounted(() => {
  // 展示挂号数据
  fetchWorkData()
})

const fetchWorkData = async() => {
  let result:HospitalWorkData = await reqHospitalWork(pageNo.value,limit.value,$route.query.hoscode as string,$route.query.depcode as string)
  if(result.code == 200){
    workData.value = result.data
    // 存储第一天的数据
    workTime.value = workData.value.bookingScheduleList[0]
    getDoctorWorkData()
  }

}

// 获取某一天医院排班的数据
const getDoctorWorkData = async() => {
  let hoscode:string = $route.query.hoscode as string
  let depcode:string = $route.query.depcode as string
  let workDate:string = workTime.value.workDate
  let result:DoctorResponseData = await reqHospitalDocdor(hoscode,depcode,workDate)
  if(result.code == 200){
    docArr.value = result.data
    console.log(docArr.value)
  }
}

const changeTime = (item:any) => {
  // 存储用户选择那一天
  workTime.value = item
  // 再发一次请求，获取医生排班数据
  getDoctorWorkData()
}

// 计算上午排班的医生数据
const morningArr = computed(() => {
  return docArr.value.filter((doc:Doctor) => {
    return doc.workTime == 1
  })
})
// 计算下午排班的医生数据
const afternoonArr = computed(() => {
  return docArr.value.filter((doc:Doctor) => {
    return doc.workTime == 0
  })
})

// 路由跳转进去选择就诊人页面
const goStep2 = (doc:Doctor) => {
  $router.push({path:'/hospital/register_step2',query:{docId:doc.id}})
}
</script>

<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;
    .hosname {
      margin-right: 10px;
    }
    .dot {
      margin: 0 5px;
    }
  }
  .center {
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .time {
      font-weight: 900px;
    }
    .container {
      display: flex;
      width: 100%;
      .item {
        flex: 1;
        border: 1px solid skyblue;
        margin: 20px 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all .5s;
        &.active{
          border: 1px solid #ccc;
          .top1{
            background-color: #ccc;
          }
        }
        &.cur{
          scale: (1.1);
        }
        .top1 {
        background-color: #e8f2ff;
        height: 30px;
        width: 100%;
        text-align: center;
        line-height: 30px;
      }
        .bottom {
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }
  .bottom {
    .will {
      display: flex;
      font-size: 30px;
      font-weight: 900;
      justify-content: center;
    }
    .doctor{
      .morning{
        .tip{
          display: flex;
          align-items: center;
          span{
            color: #7f7f7f;
          }
        }
        .doc_info{
          display: flex;
          justify-content: space-between;
          margin: 10px 0px;
          border-bottom: 1px solid #ccc;
          .left{
            .info{
              color: skyblue;
              span{
                margin: 0px 5px;
                font-size: 16px;
                font-weight: 900;
              }
            }
            .skill{
              margin: 10px 0px;
              color: #7f7f7f;
            }
          }
          .right{
            width: 150px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }
  }
}

</style>