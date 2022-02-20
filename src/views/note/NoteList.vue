<template>
  <div class="note-home">
    <span class="note-block-plus note-block-item" @click="addNote">
      <el-icon color="#ffffff"><plus/></el-icon>
    </span>
    <span class="note-list-item" v-for="(item, index) in noteFileList" :key="index">
      <span class="note-list-item-title">
        {{ item.name }}
      </span>
      <span class="note-mark-operate">
        <span style="margin-right: 5px" @click="editNoteFile(item)">
           <el-icon color="#409EFF"><edit-pen /></el-icon>
        </span>
        <span>
          <el-icon color="#409EFF" @click="deleteNoteFile(item)"><delete /></el-icon>
        </span>
      </span>
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

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {NoteFile, NoteFileProperty} from "@/domain/NoteFile";
import {CommonUtil} from "@/common/CommonUtil";
import {noteFileMapper} from "@/dbutil";
import {NeDBExample} from "@/dbutil/nedbutil/NeDBExample";

const router = useRouter()

  const modalControl = ref(false)
  const title = ref('')

  const noteFileList = ref<Array<NoteFile>>([])

  onMounted(() => {
    getNoteFileList()
  })

  const getNoteFileList = () => {
    let neDBExample = new NeDBExample();

    noteFileMapper.find(neDBExample).then((notefiles: Array<NoteFile>) => {
      if (CommonUtil.collectionNotEmpty(notefiles)){
        console.log(notefiles)
        noteFileList.value = notefiles.sort((a: NoteFile, b: NoteFile) => a.createdDate < b.createdDate);
      } else {
        noteFileList.value = []
      }
    });
  }

  const addNote = () => {
    modalControl.value = true
  }

  const addNewNote = () => {
    modalControl.value = false

    let noteFile: NoteFile = {
      id: CommonUtil.getUUID(),
      name: title.value, // 文件名称
      type: '2', // 1文件夹，2文件
      content: '', // 文件内容
      createdDate: new Date(), // 创建时间
      updateDate: new Date(), // 修改时间
    }

    noteFileMapper.insert(noteFile)

    router.push({name: 'notedetail', params:{id: noteFile.id}})
  }

  const editNoteFile = (note: NoteFile) => {
    router.push({name: 'notedetail', params:{id: note.id}})
  }

  const deleteNoteFile = (note: NoteFile) => {
    let neDBExample = new NeDBExample();
    neDBExample.createCriteria().eq(NoteFileProperty.id, note.id);

    noteFileMapper.delete(neDBExample).then((number) => {
      if (number > 0) {
        getNoteFileList()
      }
    });


  }
</script>
<style lang="scss">
.note-home {
  height: calc(100vh - 64px);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;

  .note-block-plus {
    display: inline-block;
  }

  .note-block-item {
    cursor: pointer;
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #409EFF;
    box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.2);
    bottom: 20px;
    right: 10px;
    text-align: center;
    line-height: 40px;
  }

  .note-list-item {
    margin: 5px;
    cursor: pointer;
    width: 65px;
    height: 65px;
    border-radius: 4px;
    float: left;
    box-shadow: 0 2px 1px -1px rgba(64,158,255,.2), 0 1px 1px 0 rgba(64,158,255,.14), 0 1px 3px 0 rgba(64,158,255,.12);
    position: relative;
    padding: 5px;

    .note-list-item-title {
      overflow:hidden; //超出的文本隐藏
      text-overflow:ellipsis; //溢出用省略号显示
      display: inline-block;
      height: 45px;
      width: 100%;
      float: left;
    }

    .note-mark-operate {
      display: inline-block;
      height: 20px;
      width: 100%;
      float: left;
      text-align: right;
    }
  }
  .note-list-item:hover {
    box-shadow: 0 6px 6px -3px rgba(64,158,255,.2), 0 10px 14px 1px rgba(64,158,255,.14), 0 4px 18px 3px rgba(64,158,255,.12);
  }
  .note-list-item:hover .note-mark-operate {
    display: inline-block;
  }
}
</style>