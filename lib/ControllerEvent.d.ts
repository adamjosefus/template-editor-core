import type { IData } from "./IData.js";
export interface ControllerEventHandlersEventMap<D> {
    'controller-ready': ControllerEvent<D>;
    'controller-data-update': ControllerEvent<D>;
    'controller-create-snapshot': ControllerEvent<D>;
}
declare global {
    interface GlobalEventHandlersEventMap extends ControllerEventHandlersEventMap<any> {
    }
}
export declare class ControllerEvent<D extends IData = IData> extends CustomEvent<{
    data: D;
    valid: boolean;
}> {
    constructor(typeArg: keyof ControllerEventHandlersEventMap<D>, /*controller: ControllerElement<D>,*/ data: D, valid: boolean);
}
