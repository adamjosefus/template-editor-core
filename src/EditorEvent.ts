const enum EventType {
    ExportRequest = 'templateEditor-exportRequest',
    SnapshotDataRequest = 'templateEditor-snapshotDataRequest',
}


export class EditorEvent extends CustomEvent<undefined> {
    static ExportRequest = EventType.ExportRequest;
    static SnapshotDataRequest = EventType.SnapshotDataRequest;

    constructor(typeArg: EventType) {
        super(typeArg);
    }
}