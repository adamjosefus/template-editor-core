import { TemplateScene } from "./TemplateScene.js";
declare const enum EVENT_TYPE {
    READY = "template-scene-ready",
    LOAD = "template-scene-load",
    UPDATE = "template-scene-update",
    RESIZE = "template-scene-resize"
}
export declare class TemplateSceneEvent<DATA> extends CustomEvent<{
    scene: TemplateScene<DATA>;
}> {
    static READY: EVENT_TYPE;
    static LOAD: EVENT_TYPE;
    static UPDATE: EVENT_TYPE;
    static RESIZE: EVENT_TYPE;
    constructor(typeArg: EVENT_TYPE, scene: TemplateScene<DATA>);
}
export {};
