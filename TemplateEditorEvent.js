export class TemplateEditorEvent extends CustomEvent {
    constructor(typeArg) {
        super(typeArg);
    }
}
TemplateEditorEvent.EXPORT_REQUEST = "templateEditor-exportRequest" /* EXPORT_REQUEST */;
