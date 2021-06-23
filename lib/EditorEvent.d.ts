import type { IData } from "./IData.js";
interface TemplatoneEditorEventHandlersEventMap<D> {
    'editor-export-request': EditorEvent<D>;
    'editor-snapshot-data-request': EditorEvent<D>;
    'editor-snapshot-data': EditorEvent<D>;
}
declare global {
    interface GlobalEventHandlersEventMap extends TemplatoneEditorEventHandlersEventMap<any> {
    }
}
export declare class EditorEvent<DataType extends IData = IData> extends CustomEvent<{
    data: DataType | null;
}> {
    constructor(typeArg: keyof TemplatoneEditorEventHandlersEventMap<unknown>, data?: DataType | null);
}
export {};
