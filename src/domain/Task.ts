export enum  TaskProperty {
    id = 'id',
    code = 'code',
    title = 'title',
    content = 'content',
    level = 'level',
    endDate = 'endDate', // 结束日期
    createdDate = 'createdDate', // 创建日期
}

export interface Task {
    [ TaskProperty.id ]: number; // id
    [ TaskProperty.code ]: string; // code
    [ TaskProperty.title ]: string; // 任务标题
    [ TaskProperty.content ]: string; // todo内容
    [ TaskProperty.level ]: number; // 任务级别
    [ TaskProperty.endDate ]: any; // 结束日期
    [ TaskProperty.createdDate ]: any; // 完成日期
}
