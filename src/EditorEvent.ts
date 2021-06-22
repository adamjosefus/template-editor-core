const enum EventType {
    ExportRequest = 'templateEditor-exportRequest',
    SnapshotDataRequest = 'templateEditor-snapshotDataRequest',
    SnapshotData = 'templateEditor-snapshotData',
}


export class EditorEvent<DataType> extends CustomEvent<{ data: DataType | null }> {
    static ExportRequest = EventType.ExportRequest;
    static SnapshotDataRequest = EventType.SnapshotDataRequest;
    static SnapshotData = EventType.SnapshotData;

    constructor(typeArg: EventType, data: DataType | null = null) {
        super(typeArg, {
            detail: { data },
            bubbles: true,
            composed: true,
        });
    }
}