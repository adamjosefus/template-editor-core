import type { IData } from "./IData.js";


const enum ControllerEventType {
    Ready = 'templateEditor-controller-ready',
    DataUpdate = 'templateEditor-controller-dataUpdate',
}


export class ControllerEvent<ControllerDataType extends IData> extends CustomEvent<{
    data: ControllerDataType,
    valid: boolean,
}> {

    static readonly Ready = ControllerEventType.Ready;
    static readonly DataUpdate = ControllerEventType.DataUpdate;

    constructor(typeArg: ControllerEventType, data: ControllerDataType, valid: boolean) {
        super(typeArg, {
            detail: {
                data,
                valid,
            }
        })
    }
}