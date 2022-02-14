import {DaoMapper} from '@/dbutil/nedbutil/DaoMapper';
import {NoteFile} from "@/domain/NoteFile";

class NoteFileMapper extends DaoMapper<NoteFile> {
    // 新增文档
    public insert(value: NoteFile): Promise<NoteFile> {
        return this.dataStore.insert(value);
    }

    protected getDBName(): string {
        return 'notefile';
    }
}

const noteFileMapper = new NoteFileMapper();
export { noteFileMapper };