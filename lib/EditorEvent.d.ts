declare const enum EventType {
    ExportRequest = "templateEditor-exportRequest",
    SnapshotDataRequest = "templateEditor-snapshotDataRequest",
    SnapshotData = "templateEditor-snapshotData"
}
export declare class EditorEvent<DataType> extends CustomEvent<{
    data: DataType | null;
}> {
    static ExportRequest: EventType;
    static SnapshotDataRequest: EventType;
    static SnapshotData: EventType;
    constructor(typeArg: EventType, data?: DataType | null);
}
export {};
