<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <div class="free">{{ user.isInSure==1?'医保':'自费' }}</div>
        <div class="username">{{user.name}}</div>
      </div>
      <div class="right">
        <el-button type="primary" :icon="Edit" @click="handler" circle></el-button>
        <el-popconfirm :title="`你确定要删除${user.name}`"width="200px" @confirm="removeUser">
          <template #reference>
            <el-button v-if="$route.path=='/user/patient'" type="danger" :icon="Delete" circle></el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型：{{ user.param.certificatesTypeString }}</p>
      <p>证件号码：{{user.certificatesNo}}</p>
      <p>性别用户：{{user.sex==0?'女':'男'}}</p>
      <p>出生日期：{{user.birthdate}}</p>
      <p>手机号码：{{user.phone}}</p>
      <p>婚姻状况：{{user.isMarry==0?'未婚':'已婚'}}</p>
      <p>当前住址：{{user.param.cityString}}</p>
      <p>详细住址：{{user.param.fullAddress}}</p>
      <div class="confirm" v-if="currentIndex == index">
      已选择
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit,Delete } from '@element-plus/icons-vue';
import { useRoute,useRouter } from 'vue-router';
import { reqRemoveUser } from '../../api/user';
import { ElMessage } from 'element-plus';

let $route = useRoute()
let $router = useRouter()


let props = defineProps(['user','index','currentIndex'])
let $emit =  defineEmits(['changeScene','removeUser'])

const handler = () =>{
  if($route.path == "/user/patient"){
    $emit('changeScene',props.user)
  }else{
    $router.push({path:"/user/patient",query:{type:'edit',id:props.user.id}})
  }

}

const removeUser = async() => {
  try {
    await reqRemoveUser(props.user.id)
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    $emit('removeUser')
  } catch (error) {
    
  }
}
</script>

<style scoped lang="scss">
.visitor{
  box-shadow: 0px 0px 12px rgba(0,0,0,0.12);
  .top{
    background-color: #ccc;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left{
      display: flex;
      .free{
        background-color: #fff;
        margin-right: 10px;
      }
    }
  }
  .bottom{
    position: relative;
    padding: 20px;
    p{
      line-height: 30px;
    }
    .confirm{
    position: absolute;
    width: 200px;
    height: 200px;
    color: red;
    border-radius: 50%;
    border: 1px dashed red;
    text-align: center;
    line-height: 200px;
    left: 20%;
    top: 20%;
    opacity: 0.5;
    transform: rotate(35deg);
    font-weight: 900;
  }
  }
}
</style>