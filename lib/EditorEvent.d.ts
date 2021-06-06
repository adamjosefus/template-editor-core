declare const enum EventType {
    ExportRequest = "templateEditor-exportRequest"
}
export declare class EditorEvent extends CustomEvent<undefined> {
    static readonly ExportRequest = EventType.ExportRequest;
    constructor(typeArg: EventType);
}
export {};
