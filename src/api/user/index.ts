// 引入二次封装axios
import request from "../../utils/request";
import { AddOrUpdata, CertationTypeResponseData, SubmitOrder, UserInfoResponseData,UserParams,OrderResponseData,QrCode,PayResult,UserOrderInfoResponseData,AllUserResponseData,AllOrderStateResponseData } from "./type";
// 枚举地址
enum API {
  // 提交表单
  SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',
  //获取订单详情的数据
  GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
    //取消订单的接口
    ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
    //获取支付订单二维码接口
    QRCODE_URL = '/order/weixin/createNative/',
        //查询订单支付的结果
        PAYRESULT_URL = '/order/weixin/queryPayStatus/',
  // 获取当前账号用户信息
  USERINFO_URL = '/user/auth/getUserInfo',
  // 获取证件类型的类型接口地址
  CERTIFICATIONTYPE_URL = '/cmn/dict/findByDictCode/',
  // 用户认证的结构
  USERCERTATION_URL = '/user/auth/userAuah',
      //获取用户订单号的数据
      USERORDERINFO_URL = '/order/orderInfo/auth/',
          //获取全部就诊人信息
    ALLUSER_URL = '/user/patient/auth/findAll',
    //获取订单的状态
    ORDERSTATE_URL = '/order/orderInfo/auth/getStatusList',
  // 获取城市的数据
  CITY_URL = '/cmn/dict/findByParentId/',
  // 新增就诊人接口
  ADDUSER_URL = '/user/patient/auth/save',
  // 更新就诊人接口
  UPDATEUSER_URL = '/user/patient/auth/update',
  // 删除就诊人
  DELETEUSER_UER = '/user/patient/auth/remove/'
}

// 提交订单接口返回订单Id
export const reqSubmitOrder = (hoscode:string,scheduleId:string,patientId:number) => request.post<any,SubmitOrder>(API.SUBMITORDER_URL+`${hoscode}/${scheduleId}/${patientId}`)
//获取订单详情的数据
export const reqOrderInfo = (id: string) =>
  request.get<any, OrderResponseData>(API.GETORDERINFO_URL + id);
//取消订单
export const reqCancelOrder = (id: string) =>
  request.get<any, any>(API.ORDERCANCEL_URL + id);
//获取支付订单二维码接口
export const reqQrCode = (orderId: string) =>
  request.get<any, QrCode>(API.QRCODE_URL + orderId);
//查询订单支付的结构
export const reqQueryPayState = (orderId: string) =>
  request.get<any, PayResult>(API.PAYRESULT_URL + orderId);
// 获取当前表单接口
export const reqUserInfo = () => request.get<any,UserInfoResponseData>(API.USERINFO_URL)
// 获取证件类型的方法
export const reqCertationType = (CertificatesType='CertificatesType') => request.get<any,CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL+CertificatesType)
// 用户认证接口
export const reqUserCertation = (data:UserParams) => request.post<any,any>(API.USERCERTATION_URL,data)
// 获取城市数据接口
export const reqCity = (parentId:string) => request.get<any,any>(API.CITY_URL+parentId)
//获取订单数据接口
export const reqUserOrderInfo = (page: number, limit: number, patientId: string, orderStatus: string) =>
  request.get<any, UserOrderInfoResponseData>(API.USERORDERINFO_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`);
//获取全部就诊人信息
export const reqAllUser = () =>
  request.get<any, AllUserResponseData>(API.ALLUSER_URL);

//获取全部订单的接口
export const reqOrderState = () => 
  request.get<any, AllOrderStateResponseData>(API.ORDERSTATE_URL);

// 新增或修改就诊人
export const reqAddOrUpdataUser = (data:AddOrUpdata) => {
  if(data.id){
    return request.put(API.UPDATEUSER_URL,data)
  }else{
    return request.post(API.ADDUSER_URL,data)
  }
}
// 删除某一个就诊人的信息
export const reqRemoveUser = (id:number) => request.delete<any,any>(API.DELETEUSER_UER+id)