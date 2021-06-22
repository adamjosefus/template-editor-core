var EventType;
(function(EventType2) {
  EventType2["ExportRequest"] = "templateEditor-exportRequest";
  EventType2["SnapshotDataRequest"] = "templateEditor-snapshotDataRequest";
  EventType2["SnapshotData"] = "templateEditor-snapshotData";
})(EventType || (EventType = {}));
export class EditorEvent extends CustomEvent {
  constructor(typeArg, data = null) {
    super(typeArg, {
      detail: {data},
      bubbles: true,
      composed: true
    });
  }
}
EditorEvent.ExportRequest = EventType.ExportRequest;
EditorEvent.SnapshotDataRequest = EventType.SnapshotDataRequest;
EditorEvent.SnapshotData = EventType.SnapshotData;
