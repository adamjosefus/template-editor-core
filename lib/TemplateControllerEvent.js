var EVENT_TYPE;
(function(EVENT_TYPE2) {
  EVENT_TYPE2["READY"] = "templateEditor-controller-ready";
  EVENT_TYPE2["DATA_UPDATE"] = "templateEditor-controller-dataUpdate";
})(EVENT_TYPE || (EVENT_TYPE = {}));
export class TemplateControllerEvent extends CustomEvent {
  constructor(typeArg, data, valid) {
    super(typeArg, {
      detail: {
        data,
        valid
      }
    });
  }
}
TemplateControllerEvent.READY = EVENT_TYPE.READY;
TemplateControllerEvent.DATA_UPDATE = EVENT_TYPE.DATA_UPDATE;
