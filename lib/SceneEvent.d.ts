import type { SceneElement } from "./SceneElement.js";
declare const enum EventType {
    Ready = "template-scene-ready",
    Load = "template-scene-load",
    Update = "template-scene-update",
    Resize = "template-scene-resize"
}
export declare class SceneEvent<DataType> extends CustomEvent<{
    scene: SceneElement<DataType>;
}> {
    static Ready: EventType;
    static Load: EventType;
    static Update: EventType;
    static Resize: EventType;
    constructor(typeArg: EventType, scene: SceneElement<DataType>);
}
export {};
