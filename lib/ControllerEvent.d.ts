import type { IData } from "./IData.js";
export interface ControllerEventHandlersEventMap<D> {
    'controller-ready': ControllerEvent<D>;
    'controller-update': ControllerEvent<D>;
    'controller-snapshot': ControllerEvent<D>;
}
declare global {
    interface GlobalEventHandlersEventMap extends ControllerEventHandlersEventMap<any> {
    }
}
export declare class ControllerEvent<DataType extends IData = IData> extends CustomEvent<{
    data: DataType;
    valid: boolean;
}> {
    constructor(typeArg: keyof ControllerEventHandlersEventMap<DataType>, data: DataType, valid: boolean);
}
