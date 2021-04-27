export class TemplateControllerEvent extends CustomEvent {
    constructor(typeArg, data, valid) {
        super(typeArg, {
            detail: {
                data,
                valid,
            }
        });
    }
}
TemplateControllerEvent.READY = "templateEditor-controller-ready" /* READY */;
TemplateControllerEvent.DATA_UPDATE = "templateEditor-controller-dataUpdate" /* DATA_UPDATE */;
