import {DaoMapper} from '@/dbutil/nedbutil/DaoMapper';
import {Task} from '@/domain/Task';

class TaskMapper extends DaoMapper<Task> {
    // 新增文档
    public insert(value: Task): Promise<Task> {
        return this.dataStore.insert(value);
    }

    protected getDBName(): string {
        return 'task';
    }
}

const taskMapper = new TaskMapper();
export { taskMapper };
