<template>
  <div class="note-home">
    <span class="note-block-plus note-block-item" @click="addNote">
      <el-icon><plus/></el-icon>
    </span>
  </div>
  <el-dialog v-model="modalControl" title="新增标题" :width="300">
    <el-input v-model="title" placeholder="请输入标题" />
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" @click="modalControl = false">取消</el-button>
        <el-button type="primary" size="small" @click="addNewNote">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">

  import {ref} from "vue";
  import {useRouter} from "vue-router";

  const router = useRouter()

  const modalControl = ref(false)
  const title = ref('')

  const addNote = () => {
    modalControl.value = true
  }

  const addNewNote = () => {
    modalControl.value = false

    router.push({name: 'notedetail', params:{title: title.value}})
  }
</script>
<style lang="scss">
.note-home {

  .note-block-plus {
    display: inline-block;
    border: 2px dotted #409EFF;
  }
  .note-block-item {
    cursor: pointer;
    width: 65px;
    height: 65px;
    line-height: 65px;
    text-align: center;
    border-radius: 4px;
    float: left;
  }
}
</style>