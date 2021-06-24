import type { IData } from "./IData.js";

export interface EditorEventHandlersEventMap<D> {
    'editor-export-request': EditorEvent<D>,
    'editor-saving-snapshot': EditorEvent<D>,
    'editor-load-snapshot': EditorEvent<D>,
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