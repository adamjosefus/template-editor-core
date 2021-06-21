declare const enum EventType {
    ExportRequest = "templateEditor-exportRequest",
    DataRequest = "templateEditor-dataRequest"
}
export declare class EditorEvent extends CustomEvent<undefined> {
    static ExportRequest: EventType;
    static ShareDataRequest: EventType;
    constructor(typeArg: EventType);
}
export {};
