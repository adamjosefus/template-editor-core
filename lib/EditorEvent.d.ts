declare const enum EventType {
    ExportRequest = "templateEditor-exportRequest",
    GetLinkRequest = "templateEditor-getLink"
}
export declare class EditorEvent extends CustomEvent<undefined> {
    static ExportRequest: EventType;
    static GetLinkRequest: EventType;
    constructor(typeArg: EventType);
}
export {};
