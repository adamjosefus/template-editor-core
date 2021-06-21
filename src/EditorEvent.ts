const enum EventType {
    ExportRequest = 'templateEditor-exportRequest',
    GetLinkRequest = 'templateEditor-getLink',
}


export class EditorEvent extends CustomEvent<undefined> {
    static ExportRequest = EventType.ExportRequest;
    static GetLinkRequest = EventType.GetLinkRequest;

    constructor(typeArg: EventType) {
        super(typeArg);
    }
}