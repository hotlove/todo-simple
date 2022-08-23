<template>
  <div class="todo-list">
    <el-row>
      <el-col :span="8">
        <div class="todo-block todo-canlendar">
          <div class="todo-nav-item todo-date">
            <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
              <n-date-picker panel type="date" v-model:value="choseDate"/>
            </n-config-provider>
          </div>
          <span class="todo-nav-item todo-tag">

          </span>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="todo-block todo-list-container">
          <div class="todo-input">
            <el-input v-model="todoContent" @keyup.enter.native="addTodo" placeholder="来吧，管理好自己的每一天"
            />
          </div>
          <div class="todo-list-item-container">
            <div class="todo-list-item" v-for="(item, index) in todoItemList" :key="index">
              <!-- todoitem未编辑 -->
              <div v-if="!item.edit" class="todo-item-unedit">
                <!-- todoitemdot -->
                <el-row>
                  <el-col :span="1">
                    <el-checkbox v-model="item.completed" size="large" @change="markTodoCompleted(1, item)"></el-checkbox>
                  </el-col>
                  <el-col :span="23">
                    <!-- todoitem内容 -->
                    <span class="todo-list-item-content" @click.stop="markTodoCompleted(2, item)" :class="{'todo-list-item-content-completed': item.completed}"
                          v-html="item.content"></span>
                    <!-- todoitem操作 -->
                    <span class="todo-item-oper">
                    <i class="iconfont icon-edit" @click="editTodoItem(item)"></i>
                    <i class="iconfont icon-del" @click="deleteTodoItem(index)"></i>
                </span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- todoitem编辑 -->
    <el-drawer  v-model="drawer" size="50%" title="编辑" direction="rtl">
      <template #default>
        <div>
          <el-input v-model="tempTodoContent" :rows="10" type="textarea" />
        </div>
      </template>
      <template #footer>
        <div>
          <el-button size="small" @click="drawer=false">取消</el-button>
          <el-button type="primary" size="small" @click="ensuerEditTodo">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { NDatePicker } from 'naive-ui'
import { NConfigProvider } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
import {getCurrentInstance, onMounted, ref, watch} from "vue";
import {TodoItemEdiable, TodoItemProperty} from "@/domain/TodoItem";
import {NeDBExample} from "@/dbutil/nedbutil/NeDBExample";
import {todoItemMapper} from "@/dbutil";
import {CommonUtil} from "@/common/CommonUtil";

// 全局对昂
const {proxy} = getCurrentInstance()

// const locale = ref(zhCN)
// const dateLocale = ref(dateZhCN)
const choseDate: number = ref<number>(new Date().getTime())
const todoItemList = ref<Array<TodoItemEdiable>>([])
const drawer = ref(false)
const todoContent = ref('')
const tempTodoContent = ref('')
let tempTodo: TodoItemEdiable

onMounted(() => {
  getTodoItemList(proxy.$moment().format("YYYY/MM/DD"))
})

watch(choseDate, (newDate: Date, oldDate: Date) => {
  if (newDate !== oldDate) {
    getTodoItemList(proxy.$moment(newDate).format("YYYY/MM/DD"))
  }
})

// 获取todo列表
const getTodoItemList = (date: string) => {
  let neDBExample = new NeDBExample();
  neDBExample.createCriteria().eq(TodoItemProperty.createdDate, date);
  neDBExample.setSort(TodoItemProperty.createdDate, NeDBExample.DESC);

  todoItemMapper.find(neDBExample).then((todoList: Array<TodoItemEdiable>) => {
    if (CommonUtil.collectionNotEmpty(todoList)){
      todoItemList.value = todoList
    } else {
      todoItemList.value = []
    }
  });
}

// 增加todo
const addTodo = (value: string) => {
  if (value) {
    // ts 好像判断 != "" 有问题
    const todoItem: TodoItemEdiable = {
      id: CommonUtil.getUUID(),
      content: todoContent.value,
      completed: false,
      createdDate: proxy.$moment(choseDate.value).format("YYYY/MM/DD"),
      completedDate: new Date(0),
      edit: false,
      tempContent: '',
      priority: ''
    };

    // 最新的排在最上面
    todoItemList.value.unshift(todoItem)
    // 保存到本地数据库
    todoItemMapper.insert(todoItem).then((value) => {console.log(value)}, (err) => err)
    todoContent.value = ''
  }
}

// 编辑内容
const editTodoItem = (item: TodoItemEdiable) => {
  drawer.value = true
  tempTodoContent.value = item.content
  tempTodo = item
}

// 确认编辑
const ensuerEditTodo = () => {
  tempTodo.content = tempTodoContent.value
  drawer.value = false

  let example = new NeDBExample();
  example.createCriteria().eq(TodoItemProperty.id, tempTodo.id);
  todoItemMapper.update(example, tempTodo).then((number) => {
  }).catch((err: Error) => {
    console.log(err)
  });
}



// 标记完成
const markTodoCompleted = (oper: number, item: TodoItemEdiable) => {
  let neDBExample = new NeDBExample();
  neDBExample.createCriteria().eq(TodoItemProperty.id, item.id);

  todoItemMapper.update(neDBExample, item).then( result => {
    if (oper === 2) {
      item.completed = !item.completed;
    }
    console.log('mark success')
  });
}

// 删除todo
const deleteTodoItem = (index: number) => {
  let todoItemEdiable = todoItemList.value[index];
  let neDBExample = new NeDBExample();
  neDBExample.createCriteria().eq(TodoItemProperty.id, todoItemEdiable.id);

  todoItemMapper.delete(neDBExample).then((number) => {
    if (number > 0) {
      getTodoItemList(proxy.$moment(choseDate.value).format("YYYY/MM/DD"));
    }
  });
}

</script>

<style lang="scss">
.todo-list {
  padding: 18px 0;
  .todo-block {
    height: calc(100vh - 36px);
  }
  .todo-list-container {
    padding: 10px 20px;
    .todo-input {
      .el-input__inner {
        padding: 0;
        border-right: none;
        border-top: none;
        border-left: none;
        border-radius: 0;
      }
    }

    .todo-list-item-container {
      height: calc(100vh - 80px);
      padding-top: 10px;
      overflow-y: auto;

      .todo-list-item {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;

        float: left;
        width: 100%;
        padding: 5px 0;
        .el-checkbox {
          align-items: flex-start;
          margin-top: 3px;
          height: 0;
        }
        .el-checkbox.el-checkbox--large {
          height: 0;
        }
        position: relative;
        .todo-item-unedit {
          float: left;
          width: 100%;
          .el-checkbox__input {
            margin-top: 1px;
          }
        }
        .todo-item-oper {
          display: none;
          position: absolute;
          height: 20px;
          line-height: 20px;
          width: 70px;
          right: 0;
          top: 50%; /*偏移*/
          transform: translateY(-50%);
          text-align: center;

          & i {
            padding: 2px;
            border-radius: 50px;
            text-align: center;
            color: #ffffff;
            background: rgba(32,160,255, 0.7);
          }

          & i:last-child {
            margin-left: 5px;
          }
        }

        .todo-list-item-mark {
          display: inline-block;
          float: left;
          width: 3%;
          text-align: center;

          .todo-list-item-dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            background: #304760;
            /*border-radius: 50px;*/
            vertical-align: middle;
          }
        }

        .todo-list-item-content {
          float: right;
          width: 100%;
          word-break:break-all;
          text-align: left;
          font-size: 14px;
          color: #524c4c;
          //letter-spacing: 1px;
          /*color: #499C54;*/
        }

        .todo-list-item-content-completed {
          text-decoration: line-through;
          color: #8c939d;
        }
      }
      .todo-list-item:hover {
        cursor: pointer;
        /*background: #fdfdfd;*/
        & .todo-item-oper {
          display: inline-block;
        }
      }
    }
  }

  .todo-canlendar {
    position: relative;
    text-align: center;
    border-right: 1px solid #f3eded;
    .todo-nav-item {
      display: inline-block;
      width: 100%;

    }
    .todo-date {
      .n-date-panel {
        display: inline-block !important;
        .n-date-panel-calendar {
          padding: 0 !important;
        }
        .n-date-panel-actions {
          display: none;
        }
      }


    }

    .todo-tag {

    }

  }

}
</style>