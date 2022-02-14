import {TodoItemEdiable} from "@/domain/TodoItem";
import {CommonUtil} from "@/common/CommonUtil";

class TodoService {
	public valueList: Array<TodoItemEdiable> = []
	public date = ''
	constructor(todoList: Array<TodoItemEdiable>, date: string) {
		this.valueList = todoList;
		this.date = date;
	}

	public addTodo(value: string): void {
		const todoItem: TodoItemEdiable = {
			id: CommonUtil.getUUID(),
			content: value,
			completed: false,
			createdDate: '',
			completedDate: new Date(0),
			edit: false,
			tempContent: '',
		};
		console.log(value)
		console.log(this)
		this.valueList.push(todoItem)
	}
}

export default TodoService