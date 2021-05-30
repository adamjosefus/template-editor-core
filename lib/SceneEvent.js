var EventType;
(function(EventType2) {
  EventType2["Ready"] = "template-scene-ready";
  EventType2["Load"] = "template-scene-load";
  EventType2["Update"] = "template-scene-update";
  EventType2["Resize"] = "template-scene-resize";
})(EventType || (EventType = {}));
export class SceneEvent extends CustomEvent {
  constructor(typeArg, scene) {
    super(typeArg, {
      detail: {
        scene
      }
    });
  }
}
SceneEvent.Ready = EventType.Ready;
SceneEvent.Load = EventType.Load;
SceneEvent.Update = EventType.Update;
SceneEvent.Resize = EventType.Resize;
