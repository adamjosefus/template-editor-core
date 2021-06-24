import { LitElement } from 'lit';
import type { ExportDataType } from './ExportDataType.js';
import type { ConfigType } from "./ConfigType.js";
import type { IData } from './IData.js';
export declare abstract class SceneElement<D extends IData> extends LitElement {
    private _templateDataUrl;
    get templateDataUrl(): string;
    constructor(width: number | {
        (): number;
    }, height: number | {
        (): number;
    });
    connectedCallback(): void;
    disconnectedCallback(): void;
    private startup;
    private _load;
    private _loadConfig;
    private _loadFonts;
    private _config;
    getConfig(): ConfigType;
    private _isLoadedToggle;
    isLoaded(): boolean;
    private _lastWidth;
    private _getWidthCallback?;
    getWidth(): number;
    private _lastHeight;
    private _getHeightCallback?;
    getHeight(): number;
    private _data;
    getData(): D;
    hasData(): boolean;
    isValid(): boolean;
    private _lastValidityState;
    setValidityState(valid: boolean): void;
    private _isReadyToggle;
    isReady(): boolean;
    getExportData(): Promise<ExportDataType>;
    private _onEditorExportRequestHandle;
    private _onControllerReadyHandle;
    private _onControllerUpdateHandle;
    private _fireReadyEvent;
    private _fireLoadEvent;
    private _fireResizeEvent;
    private _fireExportEvent;
    private _fireChangeValidityEvent;
}
