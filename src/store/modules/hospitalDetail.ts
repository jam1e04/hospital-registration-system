import { defineStore } from "pinia";
import { reqHospitalDetail,reqHospitalDepartment } from "../../api/hospital";
import type {HosPitalDetail,HospitalDetail,DepartmentResonseData,DepartmentArr } from "../../api/hospital/type";
import type {DetailState} from './interface/index'
const useDetailStore = defineStore('Detail',{
  state:() :DetailState => {
    return{
      // 医院详情数据
      hospitalInfo: ({} as HosPitalDetail),
      // 存储医院科室信息
      departmentArr: []
    }
  },
  actions: {
    async getHospital(hoscode:string) {
      let result:HospitalDetail = await reqHospitalDetail(hoscode)
      if(result.code == 200){
        this.hospitalInfo = result.data
        console.log(result.data)
      }
    },
    // 获取某一个医院科室的数据
    async getDepartment(hoscode:string) {
      let result:DepartmentResonseData = await reqHospitalDepartment(hoscode)
      console.log(result.data)
      if(result.code == 200){
        this.departmentArr = result.data
      }
    }
  },
  getters: {

  } 
})

// 获取仓库的方法对外暴露
export default useDetailStore