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
import { ControllerElement } from './ControllerElement.js';


export abstract class SceneElement<D extends IData> extends LitElement {

    private _templateDataUrl: string | null = null;
    get templateDataUrl(): string {
        if (this._templateDataUrl == null) throw new Error("storePath has not been set yet.");
        return this._templateDataUrl;
    }

    /**
     * @deprecated Use `templateDataUrl`.
     */
    get storePath(): string {
        return this.templateDataUrl;
    }


    constructor(width: number | { (): number }, height: number | { (): number }) {
        super();

        this._getWidthCallback = typeof width === 'number' ? (() => width) : width;
        this._getHeightCallback = typeof height === 'number' ? (() => height) : height;

        // Init
        window.addEventListener('controller-ready', (e) => this._onControllerReady(e), { once: true });
        window.addEventListener('controller-data-update', (e) => this._onControllerUpdate(e));
        window.addEventListener('editor-export-request', (e) => this._onEditorExportRequest(e));

        this.init();
    }

    private _controller: ControllerElement<D> | null = null;


    // Sizes
    @state()
    private _lastWidth = 0;
    private _getWidthCallback?: { (): number };


    getWidth(): number {
        if (this._getWidthCallback === undefined) return 0;

        const value = this._getWidthCallback()

        if (value !== this._lastWidth) {
            this._lastWidth = value;

            this._fireResizeEvent();
        }

        return value;
    }


    @state()
    private _lastHeight = 0;
    private _getHeightCallback?: { (): number };


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
    // private _controllerValidity = false;


    getData(): D {
        if (this._data === null) throw new Error("Data is null. Test int by method hasData");

        return this._data;
    }


    hasData(): boolean {
        return this._data !== null;
    }

    
    isValid(): boolean {
        throw new Error(`${this.tagName}: method "isValid" is not defined.`);
    }

    private _lastValidityState: boolean = false;
    setValidityState(valid: boolean) {
        if (this._lastValidityState !== valid) {
            this._fireChangeValidityEvent();
        }

        this._lastValidityState = valid;
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
        this._templateDataUrl = this.getAttribute('tempalte-data-url')!;

        await this._loadConfig();
        await this._loadFonts();

        this._isLoadedToggle = true;
        this._fireLoadEvent();
    }


    private async _loadConfig(): Promise<void> {
        const path = `${this.templateDataUrl}/config.json`;

        const response = await fetch(path);
        const data = await response.json();

        this._config = updateConfig(data);
    }


    private async _loadFonts(): Promise<void> {
        const config = this.getConfig();

        if (!config.assets.fonts) return;

        const fontCssPath = `${this.templateDataUrl}/fonts.css`;


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


    async startup(): Promise<void> {
        throw new Error(`${this.tagName}: Method 'startup' is not defined.`);
    }


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

        this._controller = e.detail.controller;
        this._fireReadyEvent();
    }


    private _onControllerUpdate(e: ControllerEvent<D>) {
        e.stopPropagation();

        this._data = e.detail.data;
    }


    // Event fireing
    private _fireReadyEvent(): void {
        const event = new SceneEvent('scene-ready', this, this.isValid())
        this.dispatchEvent(event);
    }


    private _fireLoadEvent(): void {
        const event = new SceneEvent('scene-load', this, this.isValid())
        this.dispatchEvent(event);
    }


    private _fireResizeEvent(): void {
        const event = new SceneEvent('scene-resize', this, this.isValid())
        this.dispatchEvent(event);
    }


    private _fireExportEvent(): void {
        const event = new SceneEvent('scene-export', this, this.isValid())
        this.dispatchEvent(event);
    }


    private _fireChangeValidityEvent(): void {
        const event = new SceneEvent('scene-change-validity', this, this.isValid())
        this.dispatchEvent(event);
    }

}