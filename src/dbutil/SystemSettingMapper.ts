import {DaoMapper} from '@/dbutil/nedbutil/DaoMapper';
import {SystemSetting} from '@/domain/SystemSetting';

class SystemSettingMapper extends DaoMapper<SystemSetting> {
    // 新增文档
    public insert(value: SystemSetting): Promise<SystemSetting> {
        return this.dataStore.insert(value);
    }

    protected getDBName(): string {
        return 'systemSetting';
    }
}

const systemSettingMapper = new SystemSettingMapper();
export { systemSettingMapper };
