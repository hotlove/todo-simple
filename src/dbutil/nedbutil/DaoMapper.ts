// import Datastore from 'nedb'
import { NeDBExample } from '@/dbutil/nedbutil/NeDBExample';
import {remote} from 'electron';
import Datastore from 'nedb-promises';
import path from 'path';
import {CommonUtil} from "@/common/CommonUtil";
import Nedb from "nedb";

abstract class DaoMapper<T> {

    protected dataStore: Datastore;

    constructor() {
        const dbName: string = this.getDBName();
        this.dataStore = Datastore.create({
            autoload: true,
            filename: path.join(remote.app.getPath('userData'), '/db/' + dbName + '.db'),
        });
    }

    // 新增文档
    public abstract insert(value: T): Promise<T>;

    // 修改文档
    public update(example: NeDBExample, updateQuery: T): Promise<number> {
        const criteria = example.getCriteria();
        const options: any = {
            multi: true,
        };
        return this.dataStore.update(criteria, updateQuery, options);
    }
    // 修改文档
    public testupdate(example: NeDBExample, updateQuery: T): void {
        const criteria = example.getCriteria();
        const options: any = {
            muti: true,
        };
        this.dataStore.update(criteria, updateQuery, options).then((result: number) => {
            console.log(result);
        });
    }

    // 删除文档
    public delete(example: NeDBExample): Promise<number> {
        const criteria = example.getCriteria();
        const options: Nedb.RemoveOptions = {
            multi: true,
        };
        console.log(options);
        console.log(criteria);
        // {code: {$in: []}}
        return this.dataStore.remove(criteria, options);
    }

    // 查询文档
    public find(example: NeDBExample = new NeDBExample(), colums: string[] = [], page = 1, pagesize = 0): any {
        const criteria = example.getCriteria();

        let projections: any = null;
        if (CommonUtil.collectionNotEmpty(colums)) {
            projections = {};
            colums.forEach((colum, index) => {
                projections[colum] = 1;
            })
        }

        if (pagesize === 0) {
            return projections != null
                ? this.dataStore.find(criteria, projections)
                : this.dataStore.find(criteria);
        } else {
            return projections != null
                ? this.dataStore.find(criteria, projections).skip((page - 1) * pagesize).limit(pagesize)
                : this.dataStore.find(criteria).skip((page - 1) * pagesize).limit(pagesize);
        }
    }
    // 子方法用于获取本地数据库名称
    protected abstract getDBName(): string;
}

export { DaoMapper };
