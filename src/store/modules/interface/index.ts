import type { HosPitalDetail,DepartmentArr, UserInfo } from '../../../api/hospital/type'
// 定义仓库ts类型
export interface DetailState {
  hospitalInfo : HosPitalDetail
  departmentArr : DepartmentArr
}

// 用户仓库相关state数据的ts类型定义
export interface UserState {
  visiable: boolean, //用于控制login对话框显示和隐藏
  code:string,//存储用户的验证码
  userInfo:UserInfo//存储用户信息
}