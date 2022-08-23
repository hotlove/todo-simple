<template>
  <div class="home">
    <div class="nav">
      <div class="nav-drag"></div>
      <div class="nav-oper">
        <span @click="closeApp" class="header-item header-item-close iconfont icon-close"></span>
        <span @click="minWin" class="header-item header-item-min iconfont icon-min"></span>
      </div>
    </div>
    <el-row>
      <el-col :span="2">
        <div class="grid-content background-blur">
          <div class="user-info">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="50"/>
          </div>
          <div class="function-item-list">
            <div class="fun-item">待办</div>
            <div class="fun-item">已办</div>
            <div class="fun-item">文档</div>
          </div>
          <div class="bottom-setting">
            <div>
              <el-icon><Setting/></el-icon>设置
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="22">
        <div class="grid-content">
          <router-view/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import {onMounted} from "vue";
  import {APP_CLOSE_EVENT, APP_MIN_EVENT} from "@/common/EventType";
  import { ipcRenderer } from 'electron';
  import {useRouter} from "vue-router";

  // 路由
  const router = useRouter();
  //
  onMounted(() => {
    router.push({name: 'todo-list'})
  })

  // 退出app
  const closeApp = () => {
    ipcRenderer.send(APP_CLOSE_EVENT)
  }

  // 最小化app
  const minWin = () => {
    ipcRenderer.send(APP_MIN_EVENT)
  }

</script>

<style lang="scss">
  .home {
    .nav {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      height: 18px;
      line-height: 18px;
      z-index: 1;
      .nav-drag {
        display: inline-block;
        height: 17px;
        width: calc(100vw - 55px);
        -webkit-app-region: drag;
      }
      .nav-oper {
        display: inline-block;
        height: 17px;
        width: 55px;
        .header-item {
          float: right;
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          cursor: pointer;
        }

        .header-item-min {
          margin-right: 2px;
          color: #000;
        }

        .header-item-close {
          margin-right: 6px;
          color: #000;
        }
      }

    }
    .grid-content{
      height: 100vh;
      position: relative;

      .user-info {
        height: 100px;
        line-height: 127px;
        text-align: center;
        .el-avatar--circle {
          box-shadow: 4px 4px 10px #969494;
        }
      }

      .function-item-list {
        height: calc(100vh - 156px);
        .fun-item {
          cursor: pointer;
          margin: 8px 0;
        }
      }

      .bottom-setting {
        height: 56px;
        line-height: 40px;
      }
    }

    .background-blur {
      width: 100%;
      height: 100vh;
      //background: hsla(0, 0%, 100%, .4);
      color: #fff;
      text-align: center;
      overflow: hidden;
      //position: relative;

      &::before {
        position: absolute;
        z-index: -1;
        background: #409EFF;
        background-size: cover;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        filter: blur(50px);
      }
    }
  }
</style>
