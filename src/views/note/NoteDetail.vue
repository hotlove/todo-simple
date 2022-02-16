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
<!--      <el-input-->
<!--          v-model="textarea"-->
<!--          :rows="2"-->
<!--          type="textarea"-->
<!--          placeholder="请输入内容"-->
<!--          @input="inputContent"/>-->
      <div id="vditor"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Vditor from 'vditor'
  import 'vditor/dist/index.css'
  import {onMounted, ref} from "vue";
  import _ from "lodash";
  import {useRoute, useRouter} from "vue-router";

  const route = useRoute()
  const router = useRouter()

  const title = ref('')
  const textarea = ref('')

  const contentEditor = ref("");


  onMounted(() => {
    title.value = route.params.title

    contentEditor.value = new Vditor("vditor", {
      height: 'auto',
      mode: 'ir',
      toolbarConfig: {
        pin: true,
      },
      toolbar: ['headings', 'bold', 'italic', 'strike', 'list', 'ordered-list', 'quote','check', 'link', 'code', 'inline-code', 'code-theme', 'content-theme', 'table',
        {
          name: 'save',
          tipPosition: 's',
          tip: '保存',
          className: '',
          icon: '<span class="note-detail-title-item iconfont icon-baocun"></span>',
          click: saveContent,
        },
        {
          name: 'del',
          tipPosition: 's',
          tip: '删除',
          className: '',
          icon: '<span class="note-detail-title-item iconfont icon-del"></span>',
          // icon: 'note-detail-title-item iconfont icon-baocun',
          click: delContent,
        }
      ],
      cache: {
        enable: false
      },
      after: () => {},
      // 这里写上传
      upload: {
      },
      input: inputContent
    })
  })

  const goBack = () => {
    router.back()
  }

  const inputContent = _.debounce((value) => {
    console.log(value)
  }, 1000)

  const saveContent = () => {
    console.log('保存')
  }

  const delContent = () => {
    console.log('删除')
  }
</script>
<style lang="scss">
  .note-detail-home {
    .note-detail-title-item {
      font-size: 16px;
      color: #1f2d3d;
    }
    .el-divider--horizontal {
      margin: 0;
    }
    .note-detail-title {
      height: 30px;
      line-height: 30px;
    }

    .note-detail-content {
      height: calc(100vh - 105px);
      //border: 1px solid red;

      .el-textarea {
        height: calc(100vh - 118px);
        .el-textarea__inner {
          height: calc(100vh - 118px) !important;
          border: none;
        }
      }

      .vditor {
        height: calc(100vh - 105px);
        border: none;
        background: #ffffff;
        .vditor-toolbar {
          background-color: #ffffff;
          border-bottom: none;
          height: 22px;
          line-height: 22px;
          padding: 0 5px !important;
          .vditor-toolbar__item {
            height: 21px;
            line-height: 21px;
            padding: 0 5px;
          }
          .vditor-toolbar__item .vditor-tooltipped {
            height: 20px;
            line-height: 20px;
          }
          .vditor-toolbar__item .vditor-tooltipped {
            padding: 0;
            width: 10px;
          }
          .vditor-toolbar__item svg {
            width: 11px;
            height: 11px;
          }
        }

        .vditor-content {
          background-color: #ffffff;
          .vditor-reset {
            padding-top: 10px;
            font-size: 14px;
          }
          .vditor-ir pre.vditor-reset:focus {
            background-color: #ffffff;
          }
        }
      }
    }

  }
</style>