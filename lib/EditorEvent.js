var EventType;
(function(EventType2) {
  EventType2["ExportRequest"] = "templateEditor-exportRequest";
  EventType2["DataRequest"] = "templateEditor-dataRequest";
})(EventType || (EventType = {}));
export class EditorEvent extends CustomEvent {
  constructor(typeArg) {
    super(typeArg);
  }
}
EditorEvent.ExportRequest = EventType.ExportRequest;
EditorEvent.ShareDataRequest = EventType.DataRequest;
