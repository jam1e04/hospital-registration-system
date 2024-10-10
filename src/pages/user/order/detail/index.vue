<template>
  <div>
      <!-- 展示订单详情的结构 -->
      <el-card class="box-card">
          <!-- 卡片头部的结构 -->
          <template #header>
              <div class="detail">
                  挂号详情
              </div>
          </template>
          <!-- 展示身体部分的顶部结构 -->
          <div class="top">
              <!-- 左侧标签 -->
              <el-tag class="ml-2" type="success">
                  <div class="tag">
                      <span><svg t="1701913204400" class="icon" viewBox="0 0 1024 1024" version="1.1"
                              xmlns="http://www.w3.org/2000/svg" p-id="5990" width="16" height="16">
                              <path
                                  d="M0 512C0 229.234759 229.234759 0 512 0s512 229.234759 512 512-229.234759 512-512 512S0 794.765241 0 512z m419.310345 194.630621a35.310345 35.310345 0 0 0 49.399172 1.271172l335.518897-311.931586a35.310345 35.310345 0 0 0-48.075035-51.729655l-309.124413 289.544827-145.125518-149.645241a35.310345 35.310345 0 1 0-50.688 49.169655l168.112552 173.320828z"
                                  fill="#1afa29" p-id="5991"></path>
                          </svg></span>
                      <span>{{ orderInfo.param?.orderStatusString }}</span>
                  </div>
              </el-tag>
              <div class="right_info">
                  <img src="../../../../assets/images/code_app.png" alt="" />
                  <div class="info">
                      <p>微信关注 “114预约挂号”</p>
                      <p>“快速预约挂号”</p>
                  </div>
              </div>
          </div>
          <!-- 订单详情底部的结构 -->
          <div class="bottom">
              <div class="left">
                  <!-- 左侧展示订单详情信息 -->
                  <el-descriptions class="margin-top" :column="1" border>
                      <el-descriptions-item>
                          <template #label>
                              <div class="cell-item">就诊人信息</div>
                          </template>
                          {{ orderInfo.patientName }}
                      </el-descriptions-item>
                      <el-descriptions-item>
                          <template #label>
                              <div class="cell-item">就诊日期</div>
                          </template>
                          {{ orderInfo.reserveDate }}
                      </el-descriptions-item>
                      <el-descriptions-item>
                          <template #label>
                              <div class="cell-item">就诊医院</div>
                          </template>
                          {{ orderInfo.hosname }}
                      </el-descriptions-item>
                      <el-descriptions-item>
                          <template #label>
                              <div class="cell-item">就诊科室</div>
                          </template>
                          {{ orderInfo.depname }}
                      </el-descriptions-item>
                      <el-descriptions-item>
                          <template #label>
                              <div class="cell-item">医生职称</div>
                          </template>
                          {{ orderInfo.title }}
                      </el-descriptions-item>
                      <el-descriptions-item>
                          <template #label>
                              <div class="cell-item">医生服务费</div>
                          </template>
                          <span style="color:red">{{ orderInfo.amount }}</span>
                      </el-descriptions-item>
                      <el-descriptions-item>
                          <template #label>
                              <div class="cell-item">挂号单号</div>
                          </template>
                          {{ orderInfo.outTradeNo }}
                      </el-descriptions-item>
                      <el-descriptions-item>
                          <template #label>
                              <div class="cell-item">挂号时间</div>
                          </template>
                          {{ orderInfo.createTime }}
                      </el-descriptions-item>
                  </el-descriptions>
                  <!--orderStatus = -1 取消预约
                  orderStatus = 0 预约未支付
                  orderStatus = 1 支付成功 -->
                  <div class="btn" v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1">
                      <el-popconfirm title="确认取消预约?" @confirm="cancel">
                          <template #reference>
                              <el-button>取消预约</el-button>
                          </template>
                      </el-popconfirm>
                      <el-button type="primary" size="default" v-if="orderInfo.orderStatus == 0" @click="openDialog">支付</el-button>
                  </div>

              </div>
              <div class="right">
                  <el-card class="box-card">
                      <template #header>
                          <div class="detail">
                              注意事项
                          </div>
                      </template>
                      <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担;</p>
                      <p style="color:red">2.【取号】就诊当天需在 {{ orderInfo.fetchTime }} 在医院取号,未取号视为奥约，该号不退不换;</p>
                      <p>3.【退号】在 {{ orderInfo.quitTime }} 前可在线退号,逾期将不可办理退号退费;</p>
                      <p>4.114预约挂号支持自费患者使用身份证预约，同时支持xx市医保患者使用xx社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号;</p>
                      <p>5.请注意xx市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                  </el-card>
              </div>
          </div>
      </el-card>
      <!-- 展示支付二维码的结构 -->
      <!-- 对话框通过 v-model 控制显示与隐藏的,true:展示,false:隐藏 -->
      <el-dialog @close="close" v-model="dialogVisible" title="微信支付" width="400">
          <!-- 支付需要使用的二维码图片-->
          <div class="qrcode">
              <img :src="imgUrl" alt="" />
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
          </div>
          <!-- 对话框底部的插槽传递结构 -->
          <template #footer>
              <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
          </template>
      </el-dialog>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import QRcode from 'qrcode'
import { onMounted, ref } from 'vue';
import { reqOrderInfo, reqCancelOrder, reqQrCode, reqQueryPayState } from '../../../../api/user/index';
import { useRoute } from 'vue-router';
import type { OrderResponseData, QrCode, PayResult } from '../../../../api/user/type';
import { ElMessage } from 'element-plus';
//生成二维码插件
//@ts-ignore
import QRCode from 'qrcode'
let $route = useRoute();
//定义存储二维码图片的路径
let imgUrl = ref<string>('');

//控制对话框显示与隐藏的数据
let dialogVisible = ref<boolean>(false);

let orderInfo = ref<any>({});

//存储定时器的引用
let timer = ref<any>();

//组件挂载完毕
onMounted(() => {
  getOrderInfo();
});

//获取订单详情的数据
const getOrderInfo = async () => {
  let result: OrderResponseData = await reqOrderInfo($route.query.orderId as string);
  if (result.code == 200) {
      orderInfo.value = result.data;
  }
};

//取消订单
//订单状态有三种
//orderStatus = -1 取消预约
//orderStatus = 0 预约未支付
//orderStatus = 1 支付成功
const cancel = async () => {
  try {
      //取消预约成功
      let result = await reqCancelOrder($route.query.orderId as string);
      if (result.code == 200) {
          //再次获取订单详情的数据
          getOrderInfo();
      }
  } catch (error) {
      ElMessage({
          type: 'error',
          message: '取消预约失败'
      });
  }
};

//点击支付按钮的回调
const openDialog = async () => {
  //展示对话框
  dialogVisible.value = true;
  //发请求获取支付需要的二维码信息
  let result: QrCode = await reqQrCode($route.query.orderId as string);
  //根据服务器返回的二维码信息生成二维码图片
  if(result.code == 200) {
      imgUrl.value = await QRCode.toDataURL(result.data.codeUrl);
      //询问服务器支付的结果
      //只要二维码出来，需要几秒询问服务器是否支付成功
      timer.value = setInterval(async () => {
          let result: PayResult  = await reqQueryPayState($route.query.orderId as string);
          //如果服务器返回的数据 data = true,代表支付成功
          if(result.data) {
              //关闭对话框
              dialogVisible.value = false;
              //提示信息
              ElMessage({
                  type: 'success',
                  message: '支付成功'
              });
              //清除定时器
              clearInterval(timer.value);
              //再次获取订单详情数据
              getOrderInfo();
          }

      }, 2000);  
  }
};

//关闭窗口的回调
const closeDialog = () => {
  //关闭对话框
  dialogVisible.value = false;
  //清除定时器
  clearInterval(timer.value);
};
//对话框右上角关闭叉子的回调
const close = () => {
  //清除定时器
  clearInterval(timer.value);
};
</script>

<style scoped lang="scss">
.box-card {
  .detail {
      color: #7f7f7f;
      font-weight: 900;
  }

  .top {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 10px;

      .tag {
          display: flex;
          justify-content: center;
          align-items: center;

          span {
              margin-left: 5px;
          }
      }

      .right_info {
          display: flex;
          justify-content: space-between;
          align-items: center;

          img {
              width: 40px;
              height: 40px;
          }

          .info {
              margin-left: 10px;

              p {
                  font-size: 12px;
                  line-height: 20px;
              }
          }
      }
  }

  .bottom {
      display: flex;
      margin-top: 20px;

      .left {
          flex: 4;

          .btn {
              margin: 10px 0px;
          }
      }

      .right {
          margin-left: 20px;
          flex: 6;

          p {
              line-height: 30px;
          }
      }
  }
}

//深度选择器
::v-deep(.el-dialog__body) {
  border-top: 1px solid #7f7f7f;
  border-bottom: 1px solid #7f7f7f;
}

.qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
      line-height: 30px;
  }
}
</style>