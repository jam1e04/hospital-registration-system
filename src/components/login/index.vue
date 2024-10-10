<template>
  <div class="login_container">
    <el-dialog v-model="userStore.visiable" title="用户登录">
      <el-row>
        <el-col :span="12">
          <div class="login">
            <div v-show="scene==0">
              <el-form :model="loginParam" :rules="rules" ref="form">
                <el-form-item prop="phone">
                  <el-input placeholder="请你输入手机号码" :prefix-icon="User" v-model="loginParam.phone"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input placeholder="请你输入手机验证码" :prefix-icon="Lock" v-model="loginParam.code"></el-input>
                </el-form-item>
                <el-button @click="getCode" :disabled="!isPhone||flag?true:false">
                  <Countdown v-if="flag" :flag="flag" @getFlag="getFlag"/>
                  <span v-else >获取验证码</span>
                </el-button>
              </el-form>
              <div class="bottom" >
                <el-button style="width: 100%" type="primary" size="default" :disabled="!isPhone||loginParam.code.length<6?true:false" @click="login">用户登录</el-button>
                <div @click="changeScene">
                  <p>微信扫码登录</p>
                <svg t="1726133517575" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7628" id="mx_n_1726133517576" width="32" height="32"><path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z" fill="#28C445" p-id="7629"></path><path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z" fill="#28C445" p-id="7630"></path></svg>
                </div>
              </div>
            </div>
            <div class="webchat" v-show="scene==1">
              <div class="phone" @click="handler">
                <!-- 在这个容器显示微信扫码登录 -->
                <div id="login_container"></div>
                <p>点击手机号码登录</p>
                <svg t="1726133346161" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6234" width="32" height="32"><path d="M736 64H288a71.76 71.76 0 0 0-71.68 71.68v752.64A71.76 71.76 0 0 0 288 960h448a71.76 71.76 0 0 0 71.68-71.68V135.68A71.76 71.76 0 0 0 736 64zM512 879.36a35.84 35.84 0 1 1 35.84-35.84A35.84 35.84 0 0 1 512 879.36z m233-116.48H279V189.44h466z" fill="#22B573" p-id="6235"></path></svg>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="rightContent">
            <div class="top">
              <div class="item">
                <img src="../../assets/images/code1.png" alt="">
                <svg t="1726027703619" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4676" width="16" height="16"><path d="M691.230034 363.055736c4.50664 0 8.985652 0.100284 13.443174 0.267083-28.387537-129.98547-162.365948-228.411153-323.384202-228.411153-181.674713 0-328.949964 125.291564-328.949964 279.844569 0 90.298586 50.28629 170.592306 128.319527 221.76171l-32.865525 96.941889 108.828614-59.677171c38.45073 13.407358 80.538291 20.818141 124.666324 20.818141 8.506744 0 16.937764-0.274246 25.28078-0.814552-9.205663-24.38027-14.193257-50.360991-14.193257-77.331249C392.377552 476.507648 526.177907 363.055736 691.230034 363.055736zM494.810502 273.250384c26.828019 0 48.577369 21.748327 48.577369 48.577369 0 26.828019-21.748327 48.577369-48.577369 48.577369s-48.577369-21.748327-48.577369-48.577369C446.234157 294.998711 467.982484 273.250384 494.810502 273.250384zM268.822538 370.404098c-26.828019 0-48.577369-21.748327-48.577369-48.577369 0-26.828019 21.748327-48.577369 48.577369-48.577369s48.577369 21.748327 48.577369 48.577369C317.399907 348.654748 295.65158 370.404098 268.822538 370.404098z" p-id="4677"></path><path d="M968.963523 616.456027c0-130.059148-124.345006-235.492432-277.733489-235.492432S413.497569 486.396879 413.497569 616.456027s124.345006 235.492432 277.733489 235.492432c32.206516 0 63.123666-4.66423 91.88778-13.211906l94.959745 52.070936-27.598568-81.407078C922.118612 766.810407 968.963523 696.275957 968.963523 616.456027zM604.457762 582.663386c-21.48022 0-38.892799-17.412578-38.892799-38.892799 0-21.48022 17.412578-38.892799 38.892799-38.892799 21.48022 0 38.892799 17.412578 38.892799 38.892799C643.35056 565.250808 625.937982 582.663386 604.457762 582.663386zM785.395694 582.663386c-21.48022 0-38.892799-17.412578-38.892799-38.892799 0-21.48022 17.412578-38.892799 38.892799-38.892799 21.48022 0 38.892799 17.412578 38.892799 38.892799C824.288492 565.250808 806.874891 582.663386 785.395694 582.663386z" p-id="4678"></path></svg>
                <p>微信扫码关注</p>
              </div>
                <div class="item">
                  <img src="../../assets/images/code1.png" alt="">
                <svg t="1726027769654" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5774" width="16" height="16"><path d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z" fill="#000000" p-id="5775"></path></svg>
                <p>微信扫码关注</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
     <template #footer>
      <el-button type="primary" @click="closeDialog">关闭窗口</el-button>
     </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// 引入微信扫码登录请求
import { reqWxLogin } from '../../api/hospital';
// 获取仓库user的数据（visiable）可以控制login组件的显示和隐藏
import useUserStore from '../../store/modules/user';
import {User,Lock} from '@element-plus/icons-vue'
import { ref,reactive,computed,watch } from 'vue';
import Countdown from '../countdown/index.vue'
import { ElMessage } from 'element-plus';
import { WXLoginResponseData } from '../../api/hospital/type';
import { useRouter,useRoute } from 'vue-router';

let $route = useRoute()
let $router = useRouter()
// 获取form组件实例
let form = ref<any>()
let userStore = useUserStore()
let scene = ref<number>(0)//0代表号码登录，1是微信扫码登录
let flag = ref<boolean>(false)
const changeScene = async() => {
  scene.value = 1
  let redirect_URL = encodeURIComponent(window.location.origin+'/wxlogin')
  let result:WXLoginResponseData =  await reqWxLogin(redirect_URL)
  // 生成微信扫码登录二维码
  // @ts-ignore
  var obj = new WxLogin({
    self_redirect:true,
    id:"login_container", 
    appid: result.data.appid, 
    scope: "snsapi_login", 
    redirect_uri: result.data.redirectUri,
    state: result.data.state,
    style: "black",
    href: ""
 });
}

// 手机表单数据，手机号码和验证码
let loginParam = reactive({
  phone:'',
  code:''
})
// computer计算属性，计算当前表单手机元素是否符合手机号码格式
let isPhone = computed(() => {
  // 手机号码正则表达式
  const reg = /^1[3-9]\d{9}$/
  // 返回布尔值：真代表手机号码
  return reg.test(loginParam.phone)
})

// 获取验证码按钮的回调
const getCode = async() => {
  flag.value = true
  // 通知pinia仓库存储验证码
  try {
    // 获取成功
    await userStore.getCode(loginParam.phone)
    loginParam.code = userStore.code

  } catch (error) {
    ElMessage({
      type:'error',
      message:(error as Error).message
    })
  }

}

// 计数器子组件绑定的自定义事件，当计数器为零时，通知父组件倒计时组件隐藏
const getFlag = (val:boolean) => {
  flag.value = val
}

// 点击用户登录按钮回调
const login = async() => {
  console.log(scene.value)
  // 保证表单校验两项都符合条件
  await form.value.validate()
  // 发起请求登录
  // 登录成功，对话框关闭，顶部组件展示数据
  // 登录失败，对话框弹出失败信息
  try {
    // 用户登录成功
    userStore.userLogin(loginParam)
    // 关闭对话框
    userStore.visiable = false
    let redirect = $route.query.redirect
    if(redirect){
      $router.push(redirect as string)
    }else{
      $router.push('/home')
    }
  } catch (error) {
    ElMessage({
      type:'error',
      message:(error as Error).message
    })
  }
}

// 自定义校验规则
const validatorPhone = (rule:any,value:any,callBack:any) => {
  const reg = /^1[3-9]\d{9}$/
  if(reg.test(value)) {
    callBack()
  }else{
    callBack(new Error("请输入正确的手机号码"))
  }
}

const validatorCode = (rule:any,value:any,callBack:any) => {
  if(/^\d{6}$/.test(value)) {
    callBack()
  }else{
    callBack(new Error("请输入正确的验证码"))
  }
}

// 表单校验对象
const rules = {
  phone: [{required: true,validator:validatorPhone,trigger:"change",}],
  code:[{required: true,validator:validatorCode,trigger:"change",}]
}

// 关闭窗口回调
const closeDialog = () => {
  userStore.visiable = false
}

const handler = () => {
  scene.value = 0
}

// 监听场景数据
watch(()=>scene.value,(val:number)=>{
  if(val===1) {
    userStore.queryState()
  }
})
</script >

<script lang="ts">
export default {
  name: 'Login'
}
</script>
<style scoped lang="scss">
.login_container {
  ::v-depp .el-dialog__body {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .login {
    padding: 20px;
    border: 1px solid #ccc;
    .bottom {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      p{
        margin-top: 10px;
      }
      svg {
        margin-left: 30px;
        margin-top: 5px;
      }
    }
    .webchat {
      display: flex;
      flex-direction: column;
      align-items: center;
      .phone {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
.rightContent {
      .top {
        display: flex;
        justify-content: space-around;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
         img{
          width: 130px;
          height: 130px;
         }
        }
      }
    }


}
</style>