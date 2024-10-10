<template>
  <div class="tip">
    <div class="department">
      <div class="header">
        <div class="left">常见科室</div>
        <div class="right">全部</div>
      </div>
      <div class="content">
        <ul>
          <li>神经内科</li>
          <li>消化内科</li>
          <li>呼吸内科</li>
          <li>内科</li>
          <li>神经内科</li>
          <li>妇科</li>
          <li>产科</li>
          <li>儿科</li>
        </ul>
      </div>
    </div>
    <div class="notive">
      <div class="header">
        <div class="left">平台公告</div>
        <div class="right">全部</div>
      </div>
      <div class="content">
        <ul>
          <li>北京中医药大学东方医院部分科室医生门诊医 </li>
          <li> 武警总医院号源暂停更新通知 </li>
          <li>关于延长北京大学国际医院放假的通知 </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.tip{
  .department{
    .header{
      display: flex;
      justify-content: space-between;
    }
    ul{
      color: #7f7f7f;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 10px;
      li{
        width:40%;
        margin-top: 20px;
      }&.active {
          color: #55a6fe;
        }
        li:hover{
        color: #55a6fe;
        cursor: pointer;
      }
      }
      
    }
  }
  .notive{
    .header{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
    .content{
      color: #7f7f7f;
      ul{
        li{
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }&.active {
          color: #55a6fe;
        }
        li:hover{
        color: #55a6fe;
        cursor: pointer;
      }
      }
    }
  }
</style>