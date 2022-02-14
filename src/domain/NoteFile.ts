import {TreeData} from "element-ui/types/tree";

export enum NoteFileProperty {
    id = 'id',
    code = 'code',
    parentCode = 'parentCode', // 父code
    name = 'name', // 文件名称
    type = 'type', // 1文件夹，2文件
    content = 'content', // 文件内容
    createdDate = 'createdDate', // 创建时间
    updateDate = 'updateDate', // 修改时间

}

export interface NoteFile extends TreeData{
    [ NoteFileProperty.id ]: number; // id
    [ NoteFileProperty.code ]: string; // code
    [ NoteFileProperty.parentCode ]: string; // 父code
    [ NoteFileProperty.name ]: string; // 文件名称
    [ NoteFileProperty.type ]: string; // 类型
    [ NoteFileProperty.content ]: string; // 内容
    [ NoteFileProperty.createdDate ]: Date; // 创建时间
    [ NoteFileProperty.updateDate ]: Date; // 修改时间
}