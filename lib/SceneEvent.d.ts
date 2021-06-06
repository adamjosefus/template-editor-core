import type { SceneElement } from "./SceneElement.js";
declare const enum EventType {
    Ready = "template-scene-ready",
    Load = "template-scene-load",
    Update = "template-scene-update",
    Resize = "template-scene-resize",
    Export = "template-scene-export"
}
export declare class SceneEvent<DataType> extends CustomEvent<{
    scene: SceneElement<DataType>;
}> {
    static readonly Ready = EventType.Ready;
    static readonly Load = EventType.Load;
    static readonly Update = EventType.Update;
    static readonly Resize = EventType.Resize;
    static readonly Export = EventType.Export;
    constructor(typeArg: EventType, scene: SceneElement<DataType>);
}
export {};
