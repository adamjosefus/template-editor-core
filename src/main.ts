export type { IData as ITemplateData } from "./IData.js";
export type { ConfigType as TemplateConfigType } from "./ConfigType.js";

export { EditorElement as TemplateEditorElement } from "./EditorElement.js";
export { ControllerElement as TemplateControllerElement } from "./ControllerElement.js";
export { SceneElement as TemplateSceneElement } from "./SceneElement.js";

export { EditorEvent as TemplateEditorEvent } from "./EditorEvent.js";
export { ControllerEvent as TemplateControllerEvent } from "./ControllerEvent.js";
export { SceneEvent as TemplateSceneEvent } from "./SceneEvent.js";

export const enum TagNames {
    'Editor' = 'template-editor',
    'Controller' = 'template-controller',
    'Scene' = 'template-scene',
}