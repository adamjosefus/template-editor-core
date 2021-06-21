import type { IData } from "./IData.js";
declare const enum ControllerEventType {
    Ready = "templateEditor-controller-ready",
    DataUpdate = "templateEditor-controller-dataUpdate",
    GetLink = "templateEditor-controller-getLink"
}
export declare class ControllerEvent<ControllerDataType extends IData> extends CustomEvent<{
    data: ControllerDataType;
    valid: boolean;
}> {
    static readonly Ready = ControllerEventType.Ready;
    static readonly DataUpdate = ControllerEventType.DataUpdate;
    static readonly GetLink = ControllerEventType.GetLink;
    constructor(typeArg: ControllerEventType, data: ControllerDataType, valid: boolean);
}
export {};
