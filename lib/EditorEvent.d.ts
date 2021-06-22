declare const enum EventType {
    ExportRequest = "templateEditor-exportRequest",
    SnapshotDataRequest = "templateEditor-snapshotDataRequest"
}
export declare class EditorEvent extends CustomEvent<undefined> {
    static ExportRequest: EventType;
    static SnapshotDataRequest: EventType;
    constructor(typeArg: EventType);
}
export {};
