import request from "../../utils/request";
import type { HospitalResponseData,HospitalLevelAndRegionResponseData,HospitalInfo } from "./type";
//通过枚举管理首页模块接口
enum API {
  // 获取已有医院的数据接口地址
  HOSPITAL_URL = '/hosp/hospital',
  // 获取医院等级和地区接口地址
  HOSPITALLEVELANDREGION_URL = '/cmn/dict/findByDictCode',
  // 获取关键字医院的名字接口地址
  HOSPITALINFO_URL = '/hosp/hospital/findByHosname'
}

//获取医院数据
export const reqHospital = (page:number, limit:number,hostype='',districtCode='') => request.get<any,HospitalResponseData>(API.HOSPITAL_URL+`/${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
// 获取医院等级和地区数据
export const reqHospitalLevelAndRegion = (dictCode: string) => request.get<any,HospitalLevelAndRegionResponseData>(API.HOSPITALLEVELANDREGION_URL+`/${dictCode}`)
// 获取医院数据在搜索框进行展示
export const reqHospitalInfo = (hosname: string) =>  request.get<any,HospitalInfo>(API.HOSPITALINFO_URL+`/${hosname}`)