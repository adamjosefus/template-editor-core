import type { SceneElement } from "./SceneElement.js";


const enum EventType {
    Ready = 'template-scene-ready',
    Load = 'template-scene-load',
    Update = 'template-scene-update',
    Resize = 'template-scene-resize',
}


export class SceneEvent<DataType> extends CustomEvent<{
    scene: SceneElement<DataType>
}> {

    static Ready = EventType.Ready;
    static Load = EventType.Load;
    static Update = EventType.Update;
    static Resize = EventType.Resize;

    constructor(typeArg: EventType, scene: SceneElement<DataType>) {
        super(typeArg, {
            detail: {
                scene
            }
        });
    }
}