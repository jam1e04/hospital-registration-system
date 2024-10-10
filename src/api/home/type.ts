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

//获取已有医院接口返回的类型
export interface HospitalResponseData extends ResponseData {
  data:{
   content:Content,
   "pageable": {
    "sort": {
      "sorted": boolean,
      "unsorted": boolean,
      "empty": boolean
    },
    "pageNumber": number,
    "pageSize": number,
    "offset": number,
    "paged": boolean,
    "unpaged": boolean
  },
  "totalPages": number,
  "totalElements": number,
  "last": boolean,
  "first": boolean,
  "sort": {
    "sorted": boolean,
    "unsorted": boolean,
    "empty": boolean
  },
  "numberOfElements": number,
  "size": number,
  "number": number,
  "empty": boolean
}
  }

//代表医院等级或者地区的接口
export interface HospitalLevelAndRegion {
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

// 存储等级接口
export type HospitalLevelAndRegionArr = HospitalLevelAndRegion[]
// 获取等级或地区返回数据类型
export interface HospitalLevelAndRegionResponseData extends ResponseData {
  data:HospitalLevelAndRegionArr
}

// 获取医院名字数据类型
export interface HospitalInfo extends ResponseData {
  data:Content
}