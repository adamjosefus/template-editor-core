var EVENT_TYPE;
(function(EVENT_TYPE2) {
  EVENT_TYPE2["READY"] = "template-scene-ready";
  EVENT_TYPE2["LOAD"] = "template-scene-load";
  EVENT_TYPE2["UPDATE"] = "template-scene-update";
  EVENT_TYPE2["RESIZE"] = "template-scene-resize";
})(EVENT_TYPE || (EVENT_TYPE = {}));
export class TemplateSceneEvent extends CustomEvent {
  constructor(typeArg, scene) {
    super(typeArg, {
      detail: {
        scene
      }
    });
  }
}
TemplateSceneEvent.READY = EVENT_TYPE.READY;
TemplateSceneEvent.LOAD = EVENT_TYPE.LOAD;
TemplateSceneEvent.UPDATE = EVENT_TYPE.UPDATE;
TemplateSceneEvent.RESIZE = EVENT_TYPE.RESIZE;
