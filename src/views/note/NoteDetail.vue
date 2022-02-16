<template>
  <div class="note-detail-home">
    <div class="note-detail-title">
      <span style="cursor: pointer">
        <el-icon @click="goBack"><arrow-left /></el-icon>
      </span>
      <span style="margin-left: 10px; font-size: 17px">{{ title}}</span>
    </div>
    <el-divider></el-divider>
    <div class="note-detail-content">
      <el-input
          v-model="textarea"
          :rows="2"
          type="textarea"
          placeholder="请输入内容"
          @input="inputContent"/>
    </div>
  </div>
</template>
<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import _ from "lodash";
  import {useRoute, useRouter} from "vue-router";

  const route = useRoute()
  const router = useRouter()

  const title = ref('')
  const textarea = ref('')

  onMounted(() => {
    title.value = route.params.title
  })

  const goBack = () => {
    router.back()
  }

  const inputContent = _.debounce((value) => {
    console.log(value)
  }, 1000)
</script>
<style lang="scss">
  .note-detail-home {
    .el-divider--horizontal {
      margin: 0;
    }
    .note-detail-title {
      height: 45px;
      line-height: 45px;
    }

    .note-detail-content {
      height: calc(100vh - 120px);
      //border: 1px solid red;

      .el-textarea {
        height: calc(100vh - 120px);
        .el-textarea__inner {
          height: calc(100vh - 120px) !important;
          border: none;
        }
      }
    }

  }
</style>