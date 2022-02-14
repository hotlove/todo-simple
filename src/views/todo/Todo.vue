<template>
  <div class="todo-content" style="padding: 5px 10px;">
    <div>
      <el-input v-model="todoContent" autosize placeholder="请输入内容回车添加..." @change="addTodo" />
    </div>
    <div class="todo-list">
      <!-- todoitem 列表块 -->
      <div class="todo-list-item" v-for="(item, index) in todoItemList" :key="index">
        <!-- todoitem未编辑 -->
        <div v-if="!item.edit" class="todo-item-unedit">
          <!-- todoitemdot -->
          <el-checkbox v-model="item.completed" size="large" @change="markTodoCompleted(item)"></el-checkbox>
          <!-- todoitem内容 -->
          <span class="todo-list-item-content" :class="{'todo-list-item-content-completed': item.completed}"
                v-html="item.content"></span>
          <!-- todoitem操作 -->
          <span class="todo-item-oper">
              <i class="iconfont icon-edit" @click="editTodoItem(item)"></i>
              <i class="iconfont icon-del" @click="deleteTodoItem(index)"></i>
          </span>
        </div>
      </div>
    </div>
    <!-- todoitem编辑 -->
    <el-drawer
        v-model="drawer"
        size="70%"
        title="编辑"
        direction="rtl">
      <template #default>
        <div>
          <el-input
              v-model="tempTodoContent"
              :rows="10"
              type="textarea"
          />
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
<script setup lang="ts">
  import {ref, onMounted, reactive} from 'vue'
  import {TodoItemEdiable, TodoItemProperty} from "@/domain/TodoItem";
  import {NeDBExample} from "@/dbutil/nedbutil/NeDBExample";
  import {todoItemMapper} from "@/dbutil";
  import {CommonUtil} from "@/common/CommonUtil";
  import {onBeforeRouteUpdate, useRoute} from "vue-router";

  const route = useRoute()

  const todoContent = ref('')
  const todoItemList = ref<Array<TodoItemEdiable>>([])
  const drawer = ref(false)
  const tempTodoContent = ref('')
  let tempTodo = null
  let date: string = ''

  onMounted(() => {
    date = route.params.date
    console.log('传递值', date)
    getTodoItemList(date)
  })

  // 监听路由变化
  onBeforeRouteUpdate(to => {
    date = to.params.date
    getTodoItemList(date)
  })

  // 获取todo列表
  const getTodoItemList = (date: string) => {
    let neDBExample = new NeDBExample();
    neDBExample.createCriteria().eq(TodoItemProperty.createdDate, date);

    todoItemMapper.find(neDBExample).then((todoList: Array<TodoItemEdiable>) => {
      if (CommonUtil.collectionNotEmpty(todoList)){
        todoItemList.value = todoList.sort((a: TodoItemEdiable, b: TodoItemEdiable) => a.createdDate < b.createdDate);
      } else {
        todoItemList.value = []
      }
    });
  }

  // 增加todo
  const addTodo = (value: string) => {
    if (value) {
      // ts 好像判断 != "" 有问题
      let todoItem: TodoItemEdiable = {
        id: CommonUtil.getUUID(),
        content: value,
        completed: false,
        createdDate: date,
        completedDate: new Date(0),
        edit: false,
        tempContent: '',
      };

      // 最新的排在最上面
      todoItemList.value.unshift(todoItem)
      // 保存到本地数据库
      todoItemMapper.insert(todoItem).then((value) => {console.log(value)}, (err) => err)
      todoContent.value = ''
    }
  }

  // 编辑内容
  const editTodoItem = (item) => {
    drawer.value = true
    tempTodoContent.value = item.content
    tempTodo = item
  }

  // 确认编辑
  const ensuerEditTodo = () => {
    tempTodo.content = tempTodoContent
    drawer.value = false

    let example = new NeDBExample();
    example.createCriteria().eq(TodoItemProperty.id, tempTodo.id);
    todoItemMapper.update(example, tempTodo).then((number) => {
      console.log("update sucess", tempTodo)
    }).catch((err: Error) => {
      console.log(err)
    });
  }

  // 标记完成
  const markTodoCompleted = (item) => {

    let neDBExample = new NeDBExample();
    neDBExample.createCriteria().eq(TodoItemProperty.id, item.id);

    todoItemMapper.update(neDBExample, item).then( result => {
      console.log('mark success')
    });
  }

  // 删除todo
  const deleteTodoItem = (index) => {
    let todoItemEdiable = todoItemList.value[index];
    let neDBExample = new NeDBExample();
    neDBExample.createCriteria().eq(TodoItemProperty.id, todoItemEdiable.id);

    todoItemMapper.delete(neDBExample).then((number) => {
      if (number > 0) {
        getTodoItemList(date);
      }
    });
  }

</script>
<style lang="scss">
.todo-content {
  .el-input__inner {
    border: none;
    border-bottom: 1px solid #409EFF;
    border-radius: 0px;
  }

  .todo-list {
    height: calc(100vh - 97px);
    overflow: hidden;
    overflow-y: auto;

    .todo-list-item {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;

      float: left;
      width: 98%;
      padding: 5px;
      //margin-bottom: 10px;
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
        width: 93%;
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
</style>