<template>
  <div class="note-home">
    <span class="note-block-plus note-block-item" @click="addNote">
      <el-icon color="#ffffff"><plus/></el-icon>
    </span>
    <span class="note-list-item" v-right-click:[item]="menus"  v-for="(item, index) in noteFileList" :key="index">
      <span class="note-list-item-title iconfont icon-notebook" @click="editNoteFile(item)">
      </span>
      <span class="note-mark-operate">
        {{ item.name }}
      </span>
    </span>
  </div>
  <el-dialog v-model="modalControl" title="文件" :width="300">
    <el-input v-model="title" placeholder="请输入标题" />
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" @click="modalControl = false; title=''">取消</el-button>
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
  import { rightMenuType } from "vue-right-click-menu-next/dist/lib/type/pluginsType";

  const router = useRouter()

  const modalControl = ref(false)
  const title = ref('')

  const noteFileList = ref<Array<NoteFile>>([])

  let op: number = 1 //1.新增 2.编辑

  let currentNote: NoteFile

  onMounted(() => {
    getNoteFileList()
  })

  const getNoteFileList = () => {
    let neDBExample = new NeDBExample();

    noteFileMapper.find(neDBExample).then((notefiles: Array<NoteFile>) => {
      if (CommonUtil.collectionNotEmpty(notefiles)){
        console.log(notefiles)
        noteFileList.value = notefiles.sort((a: any, b: any) => a.createdDate < b.createdDate);
      } else {
        noteFileList.value = []
      }
    });
  }

  const addNote = () => {
    modalControl.value = true
  }

  // 新增文件弹出框确定按钮
  const addNewNote = () => {
    modalControl.value = false

    if (op === 1) {
      let noteFile: NoteFile = {
        id: CommonUtil.getUUID(),
        name: title.value, // 文件名称
        type: '2', // 1文件夹，2文件
        content: '', // 文件内容
        createdDate: new Date(), // 创建时间
        updateDate: new Date(), // 修改时间
      }
      noteFileMapper.insert(noteFile)

      getNoteFileList()
    }

    if (op === 2) {
      op = 1
      
      let example = new NeDBExample();
      example.createCriteria().eq(NoteFileProperty.id, currentNote.id);
      currentNote.name = title.value
      noteFileMapper.update(example, currentNote).then((number) => {
        console.log("update sucess", currentNote)
      }).catch((err: Error) => {
        console.log(err)
      });
    }

    // router.push({name: 'notedetail', params:{id: noteFile.id}})
  }

  // 编辑并跳转到notefile详情页
  const editNoteFile = (note: NoteFile) => {
    router.push({name: 'notedetail', params:{id: note.id}})
  }

  // 删除文件
  const deleteNoteFile = (note: NoteFile) => {
    let neDBExample = new NeDBExample();
    neDBExample.createCriteria().eq(NoteFileProperty.id, note.id);

    noteFileMapper.delete(neDBExample).then((number) => {
      if (number > 0) {
        getNoteFileList()
      }
    });
  }

  // 菜单
  const menus: rightMenuType = {
        this: this,
        text: [
          "编辑",
          "重命名",
          "删除",
        ],
        handler: {
          editNoteFile(note:NoteFile) {
            editNoteFile(note)
          },
          renameFile(note: NoteFile) {
            currentNote = note;
            modalControl.value = true;
            op = 2;
            title.value = note.name;

          },
          removeNoteFile(note: NoteFile) {
            deleteNoteFile(note)
          }
        }
      };
</script>
<style lang="scss">
// .v3-menus-item {
//   font-size: 1.2rem;
// }
.right-menu {
  width: 100px !important;
  border: none !important;
  background-color: #ffffff !important;
}
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
    width: 60px;
    height: 80px;
    float: left;
    position: relative;

    .note-list-item-title {
      font-size: 60px;
    }

    .note-mark-operate {
      font-size: 10px;
      display: inline-block;
      width: 100%;
      text-align: center;
      overflow:hidden; //超出的文本隐藏
      text-overflow:ellipsis; //溢出用省略号显示
      white-space:nowrap; //溢出不换行
    }
  }
}
</style>