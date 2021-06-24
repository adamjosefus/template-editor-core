import { LitElement } from 'lit';
import type { ExportDataType } from './ExportDataType.js';
import type { ConfigType } from "./ConfigType.js";
import type { IData } from './IData.js';
export declare abstract class SceneElement<D extends IData> extends LitElement {
    private _templateDataUrl;
    get templateDataUrl(): string;
    /**
     * @deprecated Use `templateDataUrl`.
     */
    get storePath(): string;
    constructor(width: number | {
        (): number;
    }, height: number | {
        (): number;
    });
    private _controller;
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
    private _config;
    getConfig(): ConfigType;
    init(): Promise<void>;
    private _isLoadedToggle;
    isLoaded(): boolean;
    private _load;
    private _loadConfig;
    private _loadFonts;
    private _isReadyToggle;
    isReady(): boolean;
    private _startup;
    startup(): Promise<void>;
    getExportData(): Promise<ExportDataType>;
    private _onEditorExportRequest;
    private _onControllerReady;
    private _onControllerUpdate;
    private _fireReadyEvent;
    private _fireLoadEvent;
    private _fireResizeEvent;
    private _fireExportEvent;
    private _fireChangeValidityEvent;
}
