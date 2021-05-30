const enum EventType {
    ExportRequest = 'templateEditor-exportRequest',
}


export class EditorEvent extends CustomEvent<undefined> {

    static ExportRequest = EventType.ExportRequest;

    constructor(typeArg: EventType) {
        super(typeArg);
    }
}