var EventType;
(function(EventType2) {
  EventType2["ExportRequest"] = "templateEditor-exportRequest";
  EventType2["GetEditorLinkRequest"] = "templateEditor-getEditorLink";
})(EventType || (EventType = {}));
export class EditorEvent extends CustomEvent {
  constructor(typeArg) {
    super(typeArg);
  }
}
EditorEvent.ExportRequest = EventType.ExportRequest;
EditorEvent.GetEditorLinkRequest = EventType.GetEditorLinkRequest;
