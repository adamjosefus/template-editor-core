import { TemplateScene } from "./TemplateScene.js";


const enum EVENT_TYPE {
    READY = 'template-scene-ready',
    LOAD = 'template-scene-load',
    UPDATE = 'template-scene-update',
    RESIZE = 'template-scene-resize',
}



export class TemplateSceneEvent<DATA> extends CustomEvent<{
    scene: TemplateScene<DATA>
}> {

    static READY = EVENT_TYPE.READY;
    static LOAD = EVENT_TYPE.LOAD;
    static UPDATE = EVENT_TYPE.UPDATE;
    static RESIZE = EVENT_TYPE.RESIZE;

    constructor(typeArg: EVENT_TYPE, scene: TemplateScene<DATA>) {
        super(typeArg, {
            detail: {
                scene
            }
        });
    }
}