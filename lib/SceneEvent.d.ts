import type { IData } from "./IData.js";
import type { SceneElement } from "./SceneElement.js";
export interface SceneEventHandlersEventMap<D> {
    'scene-ready': SceneEvent<D>;
    'scene-load': SceneEvent<D>;
    'scene-update': SceneEvent<D>;
    'scene-resize': SceneEvent<D>;
    'scene-change-validity': SceneEvent<D>;
    'scene-response': SceneEvent<D>;
}
declare global {
    interface GlobalEventHandlersEventMap extends SceneEventHandlersEventMap<any> {
    }
}
export declare class SceneEvent<DataType extends IData = IData> extends CustomEvent<{
    scene: SceneElement<DataType>;
    valid: boolean;
}> {
    constructor(typeArg: keyof SceneEventHandlersEventMap<DataType>, scene: SceneElement<DataType>, valid: boolean);
}
