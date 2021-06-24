import { ControllerElement } from "./ControllerElement.js";
import type { IData } from "./IData.js";

export interface ControllerEventHandlersEventMap<D> {
    'controller-ready': ControllerEvent<D>,
    'controller-update': ControllerEvent<D>,
    'controller-snapshot': ControllerEvent<D>,
}


declare global {
    interface GlobalEventHandlersEventMap extends ControllerEventHandlersEventMap<any> { }
}


export class ControllerEvent<D extends IData = IData> extends CustomEvent<{
    controller: ControllerElement<D>,
    data: D,
    valid: boolean,
}> {
    constructor(typeArg: keyof ControllerEventHandlersEventMap<D>, controller: ControllerElement<D>, data: D, valid: boolean) {
        super(typeArg, {
            detail: { controller, data, valid },
            bubbles: true,
            composed: true,
        });
    }
}