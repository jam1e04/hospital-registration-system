import { createApp } from 'vue'
import '@/style/reset.scss'
import App from './App.vue'
// 引入全局组件
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import router from "./router/index"
// 引入pinia仓库
import pinia from './store/index'
// 引入element-plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import Login from '@/components/login/index.vue'
const app = createApp(App)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.component('HospitalTop',HospitalTop)
app.component('HospitalBottom',HospitalBottom)
app.component('Login',Login)
app.use(pinia)
// 在 main.ts文件中，是先引入permission.ts文件然后再将pinia挂载到app上的，如果在permission.ts文件中全局调用了store，这样会导致pinia实例还没挂载
import './permission'
app.mount('#app')

