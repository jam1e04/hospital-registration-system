import { defineStore } from "pinia";
import { reqCode, reqUserLogin } from "../../api/hospital";
import { LoginData, UserInfo, UserLoginResponseData} from "../../api/hospital/type";
import { UserState } from "./interface";
import { GET_TOKEN, SET_TOKEN,REMOVE_TOKEN } from "../../utils/user";

const useUserStore = defineStore('User',{
  state: ():UserState => {
    return{
      visiable: false, //用于控制login对话框显示和隐藏
      code:'',//存储用户的验证码
      userInfo:JSON.parse(GET_TOKEN() as string) || {}//存储用户信息
    }
  },
  actions:{
    // 获取验证码方法
    async getCode(phone:string) {
      let result:any = await reqCode(phone)
      if(result.code == 200){
        this.code = result.data
        return 'ok'
      }else{
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户手机号登录方法
    async userLogin(loginData:LoginData) {
      let result: UserLoginResponseData = await reqUserLogin(loginData)
      if(result.code == 200){
        this.userInfo = result.data
        // 返回一个成功的Promise
        console.log(this.userInfo.token)
        // 本地持久化存储用户信息-token和name
        SET_TOKEN(JSON.stringify(this.userInfo))//本地持久化存储需要将对象转化为json字符串
        return 'ok'
      }else{
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录方法
    logOut() {
      this.userInfo = {name:'',token:''}
      REMOVE_TOKEN()
    },
    // 查看微信扫码的接口（看本地存储是否存储信息）
    queryState() {
      let timer = setInterval(() => {
        // 本地存储已有数据：扫码成功
        if(GET_TOKEN()){
          this.visiable = false
          this.userInfo = JSON.parse(GET_TOKEN() as string)
          clearInterval(timer)
        }
      },1000)
    }
  },
  getters:{

  }
})

export default useUserStore