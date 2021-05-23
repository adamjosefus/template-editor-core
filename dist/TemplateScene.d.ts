import { LitElement } from 'lit';
import { ConfigType } from "./Config.js";
export declare abstract class TemplateScene<DATA> extends LitElement {
    private _storePath;
    get storePath(): string;
    constructor(width: number | {
        (): number;
    }, height: number | {
        (): number;
    }, getOutputFileName: {
        (): string;
    });
    private _lastWidth;
    private _lastHeight;
    private _getWidthCallback?;
    private _getHeightCallback?;
    getWidth(): number;
    getHeight(): number;
    private _getOutputFileNameCallback;
    getOutputFilename(): string;
    private _data;
    private isDataUpdatedToggle;
    private isDataValidToggle;
    private _updateData;
    getData(): DATA;
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
    startup(): Promise<void>;
    getExportDependencies(): {
        outputName: string;
        canvas: HTMLCanvasElement;
    };
    export(): void;
    private _downloadImages;
    private _onControllerUpdate;
    private _onEditorExportRequest;
    private _fireEvent;
    private _fireReadyEvent;
    private _fireSourceLoadEvent;
    private _fireResizeReadyEvent;
}
