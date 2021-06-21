const enum EventType {
    ExportRequest = 'templateEditor-exportRequest',
    GetEditorLinkRequest = 'templateEditor-getEditorLink',
}


export class EditorEvent extends CustomEvent<undefined> {
    static ExportRequest = EventType.ExportRequest;
    static GetEditorLinkRequest = EventType.GetEditorLinkRequest;

    constructor(typeArg: EventType) {
        super(typeArg);
    }
}