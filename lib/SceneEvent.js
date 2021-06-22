var EventType;
(function(EventType2) {
  EventType2["Ready"] = "template-scene-ready";
  EventType2["Load"] = "template-scene-load";
  EventType2["Update"] = "template-scene-update";
  EventType2["Resize"] = "template-scene-resize";
  EventType2["Export"] = "template-scene-export";
})(EventType || (EventType = {}));
export class SceneEvent extends CustomEvent {
  constructor(typeArg, scene) {
    super(typeArg, {
      detail: {
        scene
      },
      bubbles: true,
      composed: true
    });
  }
}
SceneEvent.Ready = EventType.Ready;
SceneEvent.Load = EventType.Load;
SceneEvent.Update = EventType.Update;
SceneEvent.Resize = EventType.Resize;
SceneEvent.Export = EventType.Export;
