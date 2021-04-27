export class TemplateSceneEvent extends CustomEvent {
    constructor(typeArg, scene) {
        super(typeArg, {
            detail: {
                scene
            }
        });
    }
}
TemplateSceneEvent.READY = "template-scene-ready" /* READY */;
TemplateSceneEvent.LOAD = "template-scene-load" /* LOAD */;
TemplateSceneEvent.UPDATE = "template-scene-update" /* UPDATE */;
TemplateSceneEvent.RESIZE = "template-scene-resize" /* RESIZE */;
