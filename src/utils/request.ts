import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "../store/modules/user";
// 利用axios.create方法创建axios实例
const request = axios.create({
  baseURL:'/api',//基本路径
  timeout:5000//超时事件
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 获取用户仓库
  let useStore = useUserStore()
  if(useStore.userInfo.token) {
    config.headers.token = useStore.userInfo.token
  }
  return config
})

// 响应拦截器
request.interceptors.response.use((response) => {
  return response.data
},(error) => {
  // 处理http网络协议
  let status = error.response.status
  console.log(status)
  switch(status){
    case 404:
    ElMessage({
      type:'error',
      message:'请求路径出现问题'
    })
      break;
  }
  return Promise.reject(new Error(error.message))
})

// 对外暴露
export default request