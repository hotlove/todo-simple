<template>
  <div class="home">
    <!-- 头部 -->
    <div class="todo-header">
      <span class="header-drag" style="color: #fff; font-size: 12px">
        {{titleDateText}}
      </span>
      <span @click="closeApp" class="header-item header-item-close iconfont icon-close"></span>
      <span @click="minWin" class="header-item header-item-min iconfont icon-min"></span>
    </div>
    <!-- 内容 -->
    <div class="todo-body">
      <router-view/>
    </div>

    <!-- 底部 -->
    <div class="todo-bottom">
      <span class="todo-bottom-item" @click="changeDate">
        <el-icon :size="17" :color="isClickCanlender ?'#409EFF' : '#1f2d3d' "><calendar /></el-icon>
      </span>
      <span style="margin-left: 10px;" class="todo-bottom-item" @click="goNote">
        <el-icon :size="17" :color="isClickGoNote ?'#409EFF' : '#1f2d3d'"><document /></el-icon>
      </span>


    </div>

    <el-date-picker v-model="choseDate"
                    type="date"
                    popper-class="todo-bottom-canlendar">
    </el-date-picker>


  </div>
</template>

<script setup lang="ts">
import {getCurrentInstance, onMounted, ref, watch} from "vue";
  import {APP_CLOSE_EVENT, APP_MIN_EVENT} from "@/common/EventType";
  import { ipcRenderer } from 'electron';
  import {useRouter} from "vue-router";

  // 路由
  const router = useRouter();

  // 全局对昂
  const {proxy} = getCurrentInstance()

  // 路由需要传递日期 默认为当前日志
  let routeDate: string = proxy.$moment().format("YYYY/MM/DD")

  // title需要展示的日期
  const titleDateText = ref('')
  titleDateText.value =  proxy.$moment().format("MM/DD dddd")

  // 控制展示日期选择框
  let showDateModal = false

  const isClickCanlender = ref(false)
  const isClickGoNote = ref(false)

  // 日期框选择的日期
  const choseDate = ref(proxy.$moment().format("YYYY/MM/DD"))

  onMounted(() => {
    router.push({name: 'todo', params: {date: routeDate}})
  })

  // 监听选择日期的变化
  watch(choseDate, (newDate: Date, oldDate: Date) => {
    if (newDate !== oldDate) {
      choseDateEvent(newDate)
    }
  })

  // 退出app
  const closeApp = () => {
    ipcRenderer.send(APP_CLOSE_EVENT)
  }

  // 最小化app
  const minWin = () => {
    ipcRenderer.send(APP_MIN_EVENT)
  }

  // 选择日期后触发
  const choseDateEvent = (dateValue: Date) => {
    let choseDateStr = proxy.$moment(dateValue).format("MM/DD dddd")
    if ((choseDateStr !== titleDateText.value) && (titleDateText.value = choseDateStr)) {
      let newDate = proxy.$moment(dateValue).format("YYYY/MM/DD")
      router.push({name: 'todo', params: {date: newDate}})
      closeDateChosePaper()
    }
  }

  // 点击日历icon触发
  const changeDate = () => {
    isClickCanlender.value = !isClickCanlender.value
    router.push({name: 'todo', params: {date: routeDate}})
    if (!showDateModal) {
      showDateChosePaper();
    } else {
      closeDateChosePaper();
    }
  }

  // 展示日期选择框
  const showDateChosePaper = () => {
    const element = document.getElementsByClassName('todo-bottom-canlendar').item(0)
    element.style.cssText = 'z-index: 2037; display: block !important; position: absolute; left: 5px; bottom: 25px; margin: 0px;'
    showDateModal = true
  }

  // 关闭日期选择框
  const closeDateChosePaper = () => {
    const element = document.getElementsByClassName('todo-bottom-canlendar').item(0)
    element.style.cssText = 'display: none !important; z-index: -1;'
    showDateModal = false
  }

  //----------------------------------------------------------
  const goNote = () => {
    router.push({name: 'note'})
  }
</script>

<style lang="scss">
  .home {
    .el-input {
      display: none !important;
      //visibility:hidden;
      //width: 1px;
    }
  }
  .todo-header {
    height: 35px;
    line-height: 35px;
    background: #409EFF;
    padding: 0 5px 0 5px;
    position: relative;

    .header-drag {
      display: inline-block;
      width: calc(100vw - 60px);
      position: absolute;
      height: 30px;
      -webkit-app-region: drag;
    }

    .header-item {
      float: right;
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 4px;
      text-align: center;
      margin-top: 7px;
      cursor: pointer;
    }

    //.header-item:hover {
    //  cursor: ;
    //}

    .header-item-min {
      margin-right: 5px;
      color: #ffffff;
    }

    .header-item-close {
      //background: red;
      color: #ffffff;
    }
  }

  .todo-body {
    height: calc(100vh - 64px);
  }

  .todo-bottom {
    height: 30px;
    line-height: 30px;
    border-top: 1px solid var(--el-border-color-base);
    padding: 0px 10px;


    .todo-bottom-item {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .todo-bottom-canlendar {
    //display: block !important;
    .el-popper__arrow {
      display: none;
    }
  }
</style>
