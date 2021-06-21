const enum EventType {
    ExportRequest = 'templateEditor-exportRequest',
    DataRequest = 'templateEditor-dataRequest',
}


export class EditorEvent extends CustomEvent<undefined> {
    static ExportRequest = EventType.ExportRequest;
    static ShareDataRequest = EventType.DataRequest;

    constructor(typeArg: EventType) {
        super(typeArg);
    }
}