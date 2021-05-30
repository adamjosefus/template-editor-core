export type { ConfigType as TemplateConfigType } from "./Config";

export { TemplateController } from "./TemplateController";
export { TemplateControllerEvent } from "./TemplateControllerEvent";

export { TemplateScene } from "./TemplateScene";
export { TemplateSceneEvent } from "./TemplateSceneEvent";

export { TemplateEditor } from "./TemplateEditor";
export { TemplateEditorEvent } from "./TemplateEditorEvent";

export const enum TagNames {
    'Controller' = 'template-controller',
    'Scene' = 'template-scene',
}