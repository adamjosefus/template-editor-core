declare const enum EventType {
    ExportRequest = "templateEditor-exportRequest"
}
export declare class EditorEvent extends CustomEvent<undefined> {
    static ExportRequest: EventType;
    constructor(typeArg: EventType);
}
export {};
