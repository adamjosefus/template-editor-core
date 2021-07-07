import type { IData } from "./IData.js";

export interface EditorEventHandlersEventMap<D> {
    'editor-scene-request': EditorEvent<D>,
    'editor-controller-request': EditorEvent<D>,
}


declare global {
    interface GlobalEventHandlersEventMap extends EditorEventHandlersEventMap<any> { }
}


export class EditorEvent<DataType extends IData = IData> extends CustomEvent<{
    data: DataType | null
}> {
    constructor(typeArg: keyof EditorEventHandlersEventMap<DataType>, data: DataType | null = null) {
        super(typeArg, {
            detail: { data },
            bubbles: true,
            composed: true,
        });
    }
}