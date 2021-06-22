var EventType;
(function(EventType2) {
  EventType2["ExportRequest"] = "templateEditor-exportRequest";
  EventType2["SnapshotDataRequest"] = "templateEditor-snapshotDataRequest";
})(EventType || (EventType = {}));
export class EditorEvent extends CustomEvent {
  constructor(typeArg) {
    super(typeArg);
  }
}
EditorEvent.ExportRequest = EventType.ExportRequest;
EditorEvent.SnapshotDataRequest = EventType.SnapshotDataRequest;
