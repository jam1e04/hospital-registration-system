// 引入路由器
// 路由鉴权->全局守卫
import router from "./router";
// 引入进度条
// @ts-ignore
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from "./store/modules/user";
// 引入大仓库
import pinia from './store'
let userStore = useUserStore(pinia)

let whiteList = ['/home','/hospital/register','/hospital/close','/hospital/detail','hospital/notice','hospital/search']

// 前置守卫
router.beforeEach((to,from,next) => {
  Nprogress.start()
  document.title = `挂号系统-${to.meta.title}`
  let token = userStore.userInfo.token
  if(token) {
    next()
  }else{
    if(whiteList.includes(to.path)){
      next()
    }else{
      userStore.visiable = true
      next({path:'/home',query:{redirect:to.path}})
    }
  }
})

// 后置守卫
router.afterEach((to,form) => {
  Nprogress.done()
})