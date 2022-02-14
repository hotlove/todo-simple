export enum  TodoItemProperty {
    id = 'id',
    content = 'content',
    completed = 'completed',
    createdDate = 'createdDate',
    completedDate = 'completedDate',
}

export interface TodoItem {
    [ TodoItemProperty.id ]: string; // id
    [ TodoItemProperty.content ]: string; // todo内容
    [ TodoItemProperty.completed ]: boolean; // 是否完成
    [ TodoItemProperty.createdDate ]: string; // 创建日期
    [ TodoItemProperty.completedDate ]: Date; // 完成日期
}

export interface TodoItemEdiable extends TodoItem {
    edit: boolean;
    tempContent: string;
}
