//定义首页模块接口类型
export interface ResponseData {
  code: number,
  message: string,
  ok: true
}


//代表已有医院数据的ts类型
export interface Hospital {
  "id": string,
  "createTime": string,
  "updataTime": string,
  "isDeleted": string
  param: {
    fullAddress: string
    hostypeString: string
  },
  hoscode: string
  hosname: string
  "hostype": string,
  "provinceCode": string,
  "cityCode": string,
  "districtCode": string,
  "address": string,
  "logoData": string,
  "intro": string,
  "route": string,
  "status": number,
  "bookingRule": {
    "cycle": number,
    "releaseTime": string,
    "stopTime": string,
    "quitDay": number,
    "quitTime": string,
    "rule": string[]
  }
}

//存储全部已有医院的数组类型
export type Content = Hospital[]