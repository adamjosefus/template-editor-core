declare const enum EVENT_TYPE {
    EXPORT_REQUEST = "templateEditor-exportRequest"
}
export declare class TemplateEditorEvent extends CustomEvent<undefined> {
    static EXPORT_REQUEST: EVENT_TYPE;
    constructor(typeArg: EVENT_TYPE);
}
export {};
