var EVENT_TYPE;
(function(EVENT_TYPE2) {
  EVENT_TYPE2["EXPORT_REQUEST"] = "templateEditor-exportRequest";
})(EVENT_TYPE || (EVENT_TYPE = {}));
export class TemplateEditorEvent extends CustomEvent {
  constructor(typeArg) {
    super(typeArg);
  }
}
TemplateEditorEvent.EXPORT_REQUEST = EVENT_TYPE.EXPORT_REQUEST;
