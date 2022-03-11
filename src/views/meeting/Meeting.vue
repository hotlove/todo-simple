<template>
  <div class="meeting-main">
    <div class="meeting-time-block" v-for="(time, index) in meetingTimes" :key="index" @click="addMeeting">
        <span class="meeting-time">{{ time }}</span>
        <span class="meeting-time-line"></span>
    </div>

    <el-dialog v-model="modalControl" title="会议" :width="300" custom-class="meeting-add">
        <template #footer>
            <div class="dialog-footer">
                <el-button size="small" @click="modalControl = false; title=''">取消</el-button>
                <el-button type="primary" size="small" @click="addNewNote">确定</el-button>
            </div>
        </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import {onMounted,getCurrentInstance, ref, reactive} from "vue";
  import {useRouter} from "vue-router";
  const {proxy} = getCurrentInstance()
  const router = useRouter()
  
  const meetingTimes = ref<Array<string>>([])
  const modalControl = ref(false)

  let firstTime: string = '08:30'
  let lastTime: string = '21:00'
  meetingTimes.value.push(firstTime)


  onMounted(() => {
    let ft = proxy.$moment(firstTime, 'HH:mm')

    let timeStr = ''
    do {
      timeStr = ft.add(5, 'm').format('HH:mm')
      meetingTimes.value.push(timeStr)

    } while(timeStr != lastTime)
  })

  const addMeeting = () => {
    modalControl.value = true
  }
</script>
<style lang="scss">
    .meeting-main {
        height: calc(100vh - 78px);
        overflow: hidden;
        overflow-y: auto;
        padding: 10px 10px 0 10px;

        .meeting-time-block {
            height: 20px;
            line-height: 20px;
            padding: 10px 0;
            cursor: pointer;
        }

        .meeting-time {
            display: inline-block;
            color: #d7dce0;
        }

        .meeting-time-line {
            display: inline-block;
            border-top: 1px solid #d7dce0;
            width: 88%;
            margin-left: 5px;
            position: relative;
            top: -20%;
        }
    }

    .meeting-add {
        .el-dialog__header {
            padding: 0;
            padding-bottom: 0;
            height: 20px;
            line-height: 20px;
            padding: 10px;

            .el-dialog__title {
                font-size: 14px;
            }

            .el-dialog__headerbtn {
                top: 13px;
            }
        }
    }
</style>