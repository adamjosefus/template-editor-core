import type { IData } from "./IData.js";
declare const enum ControllerEventType {
    Ready = "templateEditor-controller-ready",
    DataUpdate = "templateEditor-controller-dataUpdate"
}
export declare class ControllerEvent<ControllerDataType extends IData> extends CustomEvent<{
    data: ControllerDataType;
    valid: boolean;
}> {
    static Ready: ControllerEventType;
    static DataUpdate: ControllerEventType;
    constructor(typeArg: ControllerEventType, data: ControllerDataType, valid: boolean);
}
export {};
