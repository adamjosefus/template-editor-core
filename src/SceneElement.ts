import { LitElement } from 'lit';
import { state } from 'lit/decorators.js'
import { WebFonts as WebFontUtils } from "@templatone/utils";
import { ControllerEvent } from "./ControllerEvent.js";
import { updateConfig } from "./ConfigType.js";
import { SceneEvent } from "./SceneEvent.js";
import { EditorEvent } from './EditorEvent.js';
import type { ExportDataType } from './ExportDataType.js';
import type { ConfigType } from "./ConfigType.js";
import type { IData } from './IData.js';
import type { WeightType as FontWeightType } from "@templatone/utils/lib/WebFonts.js";


export abstract class SceneElement<D extends IData> extends LitElement {

    private _storePath: string | null = null;
    get storePath(): string {
        if (this._storePath == null) throw new Error("storePath has not been set yet.");
        return this._storePath;
    }


    constructor(width: number | { (): number }, height: number | { (): number }) {
        super();

        this._getWidthCallback = typeof width === 'number' ? (() => width) : width;
        this._getHeightCallback = typeof height === 'number' ? (() => height) : height;

        // Init
        window.addEventListener('controller-ready', (e) => this._onControllerReady(e), { once: true });
        window.addEventListener('controller-update', (e) => this._onControllerUpdate(e));
        window.addEventListener('editor-export-request', (e) => this._onEditorExportRequest(e));

        this.init();
    }


    // Size
    @state()
    private _lastWidth = 0;

    @state()
    private _lastHeight = 0;

    private _getWidthCallback?: { (): number };
    private _getHeightCallback?: { (): number };


    getWidth(): number {
        if (this._getWidthCallback === undefined) return 0;

        const value = this._getWidthCallback()

        if (value !== this._lastWidth) {
            this._lastWidth = value;

            this._fireResizeEvent();
        }

        return value;
    }


    getHeight(): number {
        if (this._getHeightCallback === undefined) return 0;

        const value = this._getHeightCallback();

        if (value !== this._lastHeight) {
            this._lastHeight = value;
            this._fireResizeEvent();
        }

        return value;
    }


    // Data
    private _data: D | null = null;
    private isDataUpdatedToggle = false;
    private isDataValidToggle = false;

    private _updateData(data: D, isValid: boolean): void {
        this._data = data;
        this.isDataValidToggle = isValid;
        this.isDataUpdatedToggle = true;
    }


    getData(): D {
        if (this._data === null) throw new Error("Data is null. Test int by method hasData");

        this.isDataUpdatedToggle = false;


        return this._data;
    }


    hasData(): boolean {
        return this._data !== null;
    }


    isDataValid(): boolean {
        return this.hasData() && this.isDataValidToggle;
    }


    /**
     * Check it data was updated from last get. The data can be identical. 
     * @deprecated
     */
    isDataUpdatedFromLastGet(): boolean {
        return this.isDataUpdatedToggle;
    }


    // Config
    private _config: ConfigType | null = null;
    getConfig(): ConfigType {
        if (this._config == null) throw new Error("Config has not been set yet.");
        return this._config;
    }



    // Cycle
    async init(): Promise<void> {
        await this._load();
        await this._startup();
    }


    // - Load
    private _isLoadedToggle: boolean = false;
    isLoaded(): boolean {
        return this._isLoadedToggle;
    }


    private async _load(): Promise<void> {
        this._storePath = this.getAttribute('store-path')!;

        await this._loadConfig();
        await this._loadFonts();

        this._isLoadedToggle = true;
        this._fireSourceLoadEvent();
    }


    private async _loadConfig(): Promise<void> {
        const path = `${this.storePath}/config.json`;

        const response = await fetch(path);
        const data = await response.json();

        this._config = updateConfig(data);
    }


    private async _loadFonts(): Promise<void> {
        const config = this.getConfig();

        if (!config.assets.fonts) return;

        const fontCssPath = `${this.storePath}/fonts.css`;


        const familyDescriptions = WebFontUtils.convertFacesToFamilies(config.assets.fonts.map(f => {
            return {
                family: f.family,
                path: f.filename,
                style: f.italic ? 'italic' : 'normal',
                weight: f.weight as FontWeightType,
            }
        }));


        const families = familyDescriptions.map(f => WebFontUtils.computeFamilyQuery(f.family, f.variations));

        const webFontConfig: WebFont.Config = {
            classes: false,
            timeout: 30 * 1000,
            custom: {
                families: families,
                urls: [fontCssPath]
            },
        };

        await WebFontUtils.load(webFontConfig);
    }


    // - Ready
    private _isReadyToggle: boolean = false;
    isReady(): boolean {
        return this._isReadyToggle;
    }


    private async _startup(): Promise<void> {
        await this.startup();

        this._isReadyToggle = true;
        this._fireReadyEvent();
    }


    /**
     * @override
     */
    async startup(): Promise<void> {
        throw new Error(`${this.tagName}: Method 'startup' is not defined.`);
    }


    // Methods
    /**
     * @override
     */
    async getExportData(): Promise<ExportDataType> {
        throw new Error(`${this.tagName}: Method 'ExportDataType' is not defined.`);
    }


    // Handlers
    private _onEditorExportRequest(e: EditorEvent<D>) {
        e.stopPropagation();
        this._fireExportEvent();
    }


    private _onControllerReady(e: ControllerEvent<D>) {
        e.stopPropagation();
        this._fireReadyEvent();
    }


    private _onControllerUpdate(e: ControllerEvent<D>) {
        e.stopPropagation();
        this._updateData(e.detail.data, e.detail.valid);
    }


    // Events
    private _fireEvent(event: SceneEvent<D>): void {
        this.dispatchEvent(event);
    }


    private _fireReadyEvent(): void {
        const event = new SceneEvent('scene-ready', this)
        this._fireEvent(event);
    }


    private _fireSourceLoadEvent(): void {
        const event = new SceneEvent('scene-load', this)
        this._fireEvent(event);
    }


    private _fireResizeEvent(): void {
        const event = new SceneEvent('scene-resize', this)
        this._fireEvent(event);
    }


    private _fireExportEvent(): void {
        const event = new SceneEvent('scene-export', this)
        this._fireEvent(event);
    }

}