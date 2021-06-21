import type { IData } from "./IData.js";


const enum ControllerEventType {
    Ready = 'templateEditor-controller-ready',
    DataUpdate = 'templateEditor-controller-dataUpdate',
    ShareData = 'templateEditor-controller-shareData',
}


export class ControllerEvent<ControllerDataType extends IData> extends CustomEvent<{
    data: ControllerDataType,
    valid: boolean,
}> {

    static readonly Ready = ControllerEventType.Ready;
    static readonly DataUpdate = ControllerEventType.DataUpdate;
    static readonly ShareData = ControllerEventType.ShareData;

    constructor(typeArg: ControllerEventType, data: ControllerDataType, valid: boolean) {
        super(typeArg, {
            detail: {
                data,
                valid,
            }
        })
    }
}