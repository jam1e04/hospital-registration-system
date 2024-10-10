export interface ResponseData {
  code :number,
  message :string,
  ok :boolean
}

// 提交订单返回数据ts类型
export interface SubmitOrder extends ResponseData {
  data:number
}

//订单详情数据的 TS 类型
export interface OrderInfo {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
      "orderStatusString": string
  },
  "userId": number,
  "outTradeNo": string,
  "hoscode": string,
  "hosname": string,
  "depcode": string,
  "depname": string,
  "scheduleId": string,
  "title": string,
  "reserveDate": string,
  "reserveTime": number,
  "patientId": number,
  "patientName": string,
  "patientPhone": string,
  "hosRecordId": string,
  "number": number,
  "fetchTime": string,
  "fetchAddress": string,
  "amount": number,
  "quitTime": string,
  "orderStatus": number
}
//定义订单接口返回数据的 TS 类型
export interface OrderResponseData extends ResponseData {
  data: OrderInfo
}

//获取二维码接口返回数据的 TS 类型
export interface PayInfo {
  codeUrl: string,
  orderId: number,
  totalFee: number,
  resultCode: string
}
export interface QrCode extends ResponseData {
  data: PayInfo
}

//查询支付结果的 TS 数据类型
export interface PayResult extends ResponseData {
  data: boolean
}

// 代表一个用户信息的数据类型
export interface UserInfo {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {},
  "openid": string,
  "nickName": string,
  "phone": string,
  "name": string,
  "certificatesType": string,
  "certificatesNo": string,
  "certificatesUrl": string,
  "authStatus": number,
  "status": number
}

export interface UserInfoResponseData extends ResponseData {
  data:UserInfo
}

export interface CertationType {
  "createTime": string,
  "dictCode": string,
  "hasChildren": boolean,
  "id": number,
  "isDeleted": number,
  "name": string,
  "param": {},
  "parentId": number,
  "updateTime": string,
  "value": string
}

export type CertationArr = CertationType[]

export interface CertationTypeResponseData extends ResponseData {
  data:CertationArr
}

// 用户认证的携带的参数的ts类型
export interface UserParams {
    "certificatesNo": string,
    "certificatesType": string,
    "certificatesUrl": string,
    "name": string
}

export interface AddOrUpdata {
    addressSelected: string[],
    birthdate: string,
    address:string,
    certificatesNo: string,
    certificatesType: string,
    contactsCertificatesNo: string,
    contactsCertificatesType: string,
    contactsName: string,
    contactsPhone: string,
    id?: string,
    isInsure: number,
    isMarry: number,
    name: string,
    phone: string,
    sex: number,
}

//代表一个订单数据的 TS 类型
export interface Order {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
      "orderStatusString": "预约成功，待支付"
  },
  "userId": number,
  "outTradeNo": string,
  "hoscode": string,
  "hosname": string,
  "depcode": string,
  "depname": string,
  "scheduleId": null,
  "title": string,
  "reserveDate": string,
  "reserveTime": number,
  "patientId": number,
  "patientName": string,
  "patientPhone": string,
  "hosRecordId": string,
  "number": number,
  "fetchTime": string,
  "fetchAddress": string,
  "amount": number,
  "quitTime": string,
  "orderStatus": number
}
export type Records = Order[];
//获取订单接口数据的 TS 类型
export interface UserOrderInfoResponseData extends ResponseData {
  data: {
      "records": Records
      "total": number,
      "size": number,
      "current": number,
      "orders": [],
      "hitCount": boolean,
      "searchCount": boolean,
      "pages": number
  }
}

//代表就诊人 TS 类型
export interface User {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
      "certificatesTypeString": string,
      "contactsCertificatesTypeString": string,
      "cityString": string,
      "fullAddress": string,
      "districtString": string,
      "provinceString": string
  },
  "userId": number,
  "name": string
  "certificatesType": string,
  "certificatesNo": string,
  "sex": number,
  "birthdate": string,
  "phone": string,
  "isMarry": number,
  "provinceCode": string,
  "cityCode": string,
  "districtCode": string,
  "address": string,
  "contactsName": string,
  "contactsCertificatesType": string,
  "contactsCertificatesNo": string,
  "contactsPhone": string,
  "isInsure": number,
  "cardNo": string,
  "status": string
}
//全部就诊人数据的 TS 类型
export type AllUser = User[];
//获取全部就诊人的 TS 类型
export interface AllUserResponseData extends ResponseData {
  data: AllUser
}

//订单状态 TS 类型
export interface OrderState {
  "comment": string,
  "status": number
}
export type AllOrderState = OrderState[];
//全部订单状态接口返回的数据 TS 类型
export interface AllOrderStateResponseData extends ResponseData {
  data: AllOrderState
}