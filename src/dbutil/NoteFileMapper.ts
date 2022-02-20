import {DaoMapper} from '@/dbutil/nedbutil/DaoMapper';
import {NoteFile, NoteFileProperty} from "@/domain/NoteFile";
import {NeDBExample} from "@/dbutil/nedbutil/NeDBExample";

class NoteFileMapper extends DaoMapper<NoteFile> {
    // 新增文档
    public insert(value: NoteFile): Promise<NoteFile> {
        return this.dataStore.insert(value);
    }

    public async getNoteFileById(id: string): Promise<NoteFile> {
        let neDBExample = new NeDBExample();
        neDBExample.createCriteria().eq(NoteFileProperty.id, id);
        return await this.find(neDBExample).then((noteFileList: Array<NoteFile>) => {
            return noteFileList[0]
        })
    }

    protected getDBName(): string {
        return 'notefile';
    }
}

const noteFileMapper = new NoteFileMapper();
export { noteFileMapper };