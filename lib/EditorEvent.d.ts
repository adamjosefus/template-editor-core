declare const enum EventType {
    ExportRequest = "templateEditor-exportRequest",
    GetEditorLinkRequest = "templateEditor-getEditorLink"
}
export declare class EditorEvent extends CustomEvent<undefined> {
    static ExportRequest: EventType;
    static GetEditorLinkRequest: EventType;
    constructor(typeArg: EventType);
}
export {};
