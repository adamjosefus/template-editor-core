import type { IData } from "./IData.js";
import type { SceneElement } from "./SceneElement.js";
interface SceneEventHandlersEventMap<D> {
    'scene-ready': SceneEvent<D>;
    'scene-load': SceneEvent<D>;
    'scene-update': SceneEvent<D>;
    'scene-resize': SceneEvent<D>;
    'scene-export': SceneEvent<D>;
}
declare global {
    interface GlobalEventHandlersEventMap extends SceneEventHandlersEventMap<any> {
    }
}
export declare class SceneEvent<DataType extends IData = IData> extends CustomEvent<{
    scene: SceneElement<DataType>;
}> {
    constructor(typeArg: keyof SceneEventHandlersEventMap<DataType>, scene: SceneElement<DataType>);
}
export {};
