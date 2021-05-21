const enum EVENT_TYPE {
    EXPORT_REQUEST = 'templateEditor-exportRequest', 
}


export class TemplateEditorEvent extends CustomEvent<undefined> {

    static EXPORT_REQUEST = EVENT_TYPE.EXPORT_REQUEST;

    constructor(typeArg: EVENT_TYPE ) {
        super(typeArg);
    }
}