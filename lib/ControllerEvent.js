var ControllerEventType;
(function(ControllerEventType2) {
  ControllerEventType2["Ready"] = "templateEditor-controller-ready";
  ControllerEventType2["DataUpdate"] = "templateEditor-controller-dataUpdate";
  ControllerEventType2["SnapshotData"] = "templateEditor-controller-snapshotData";
})(ControllerEventType || (ControllerEventType = {}));
export class ControllerEvent extends CustomEvent {
  constructor(typeArg, data, valid) {
    super(typeArg, {
      detail: {
        data,
        valid
      }
    });
  }
}
ControllerEvent.Ready = ControllerEventType.Ready;
ControllerEvent.DataUpdate = ControllerEventType.DataUpdate;
ControllerEvent.SnapshotData = ControllerEventType.SnapshotData;
