import { LitElement } from 'lit';
import type { ExportDataType } from './ExportDataType.js';
import type { ConfigType } from "./ConfigType.js";
import type { IData } from './IData.js';
export declare abstract class SceneElement<D extends IData> extends LitElement {
    private _storePath;
    get storePath(): string;
    constructor(width: number | {
        (): number;
    }, height: number | {
        (): number;
    });
    private _lastWidth;
    private _lastHeight;
    private _getWidthCallback?;
    private _getHeightCallback?;
    getWidth(): number;
    getHeight(): number;
    private _data;
    private isDataUpdatedToggle;
    private isDataValidToggle;
    private _updateData;
    getData(): D;
    hasData(): boolean;
    isDataValid(): boolean;
    /**
     * Check it data was updated from last get. The data can be identical.
     * @deprecated
     */
    isDataUpdatedFromLastGet(): boolean;
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
    /**
     * @override
     */
    startup(): Promise<void>;
    /**
     * @override
     */
    getExportData(): Promise<ExportDataType>;
    private _onEditorExportRequest;
    private _onControllerReady;
    private _onControllerUpdate;
    private _fireEvent;
    private _fireReadyEvent;
    private _fireSourceLoadEvent;
    private _fireResizeEvent;
    private _fireExportEvent;
}
