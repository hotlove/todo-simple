import {DaoMapper} from '@/dbutil/nedbutil/DaoMapper';
import {TodoItem} from '@/domain/TodoItem';

class TotoItemMapper extends DaoMapper<TodoItem> {
    // 新增文档
    public insert(value: TodoItem): Promise<TodoItem> {
        return this.dataStore.insert(value);
    }

    protected getDBName(): string {
        return 'todoItem';
    }
}

const todoItemMapper = new TotoItemMapper();
export { todoItemMapper };
