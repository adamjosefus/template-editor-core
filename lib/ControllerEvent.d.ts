import type { IData } from "./IData.js";
declare const enum ControllerEventType {
    Ready = "templateEditor-controller-ready",
    DataUpdate = "templateEditor-controller-dataUpdate",
    SnapshotData = "templateEditor-controller-snapshotData"
}
export declare class ControllerEvent<ControllerDataType extends IData> extends CustomEvent<{
    data: ControllerDataType;
    valid: boolean;
}> {
    static readonly Ready = ControllerEventType.Ready;
    static readonly DataUpdate = ControllerEventType.DataUpdate;
    static readonly SnapshotData = ControllerEventType.SnapshotData;
    constructor(typeArg: ControllerEventType, data: ControllerDataType, valid: boolean);
}
export {};
