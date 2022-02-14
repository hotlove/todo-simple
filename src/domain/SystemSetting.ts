export enum  SystemSettingProperty {
    id = 'id',
    code = 'code',
    opcity = 'opcity', // 透明度
    quitType = 'quitType',
    remeberQuit = 'remeberQuit',
    width = 'width',
    height = 'height'
}

export interface SystemSetting {
    [ SystemSettingProperty.id ]: number; // id
    [ SystemSettingProperty.code ]: string; // code
    [ SystemSettingProperty.opcity ]: number; // 透明度
    [ SystemSettingProperty.quitType ]: number; // 退出方式 1.最小化到系统托盘 2.直接退出
    [ SystemSettingProperty.remeberQuit ]: boolean; // 记住我的选择
    [ SystemSettingProperty.width ]: number; // 窗口宽度
    [ SystemSettingProperty.height ]: number; // 窗口高度
}

let defaultSystemSetting: SystemSetting = {
    id: 0,
    code: '0',
    opcity: 100,
    quitType: 1,
    remeberQuit: false,
    width: 1200,
    height: 800,
};

export {defaultSystemSetting};
