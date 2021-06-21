var EventType;
(function(EventType2) {
  EventType2["ExportRequest"] = "templateEditor-exportRequest";
  EventType2["GetLinkRequest"] = "templateEditor-getLink";
})(EventType || (EventType = {}));
export class EditorEvent extends CustomEvent {
  constructor(typeArg) {
    super(typeArg);
  }
}
EditorEvent.ExportRequest = EventType.ExportRequest;
EditorEvent.GetLinkRequest = EventType.GetLinkRequest;
