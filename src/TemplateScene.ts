import {html, css, LitElement} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js'
import { WebFonts as WebFontUtils, WeightType as FontWeightType } from "@templatone/utils/dist/WebFonts.js";
import { TemplateControllerEvent as ControllerEvent } from "./TemplateControllerEvent";
import { TemplateEditorEvent as EditorEvent } from "./TemplateEditorEvent";
import { updateConfig, ConfigType } from "./Config";
import { TemplateSceneEvent as SceneEvent } from "./TemplateSceneEvent";


export abstract class TemplateScene<DATA> extends LitElement {

    private _storePath: string | null = null;
    get storePath(): string {
        if (this._storePath == null) throw new Error("storePath has not been set yet.");
        return this._storePath;
    }


    constructor(width: number | { (): number }, height: number | { (): number }, getOutputFileName: { (): string }) {
        super();

        this._getWidthCallback = typeof width === 'number' ? (() => width) : width;
        this._getHeightCallback = typeof height === 'number' ? (() => height) : height;
        this._getOutputFileNameCallback = getOutputFileName;

        // Init
        window.addEventListener(ControllerEvent.READY, (e: Event) => {
            const evnt = e as ControllerEvent<DATA>;
            this._fireReadyEvent();
        }, { once: true });

        window.addEventListener(ControllerEvent.DATA_UPDATE, (e: Event) => {
            const evnt = e as ControllerEvent<DATA>;
            this._onControllerUpdate(evnt);
        });

        window.addEventListener(EditorEvent.EXPORT_REQUEST, (e: Event) => {
            const evnt = e as EditorEvent;
            this._onEditorExportRequest(evnt);
        });

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

            this._fireResizeReadyEvent();
        }

        return value;
    }


    getHeight(): number {
        if (this._getHeightCallback === undefined) return 0;

        const value = this._getHeightCallback();

        if (value !== this._lastHeight) {
            this._lastHeight = value;

            this._fireResizeReadyEvent();
        }

        return value;
    }


    // Export
    private _getOutputFileNameCallback: { (): string }

    getOutputFilename(): string {
        return this._getOutputFileNameCallback();
    }


    // Data
    private _data: DATA | null = null;
    private isDataUpdatedToggle = false;
    private isDataValidToggle = false;

    private _updateData(data: DATA, isValid: boolean): void {
        this._data = data;
        this.isDataValidToggle = isValid;
        this.isDataUpdatedToggle = true;
    }


    getData(): DATA {
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



    async startup(): Promise<void> {
        throw new Error(`${this.tagName}: Method 'startup' is not defined.`);
    }


    // Methods
    getExportDependencies(): {
        outputName: string,
        canvas: HTMLCanvasElement,
    } {
        throw new Error(`${this.tagName}: Method 'getCanvases' is not defined.`);
    }


    export() {
        this._downloadImages();
    }


    private _downloadImages() {
        const dependencies = this.getExportDependencies();

        const filename = `${dependencies.outputName}.png`;
        const url = dependencies.canvas.toDataURL('image/png');

        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;

        anchor.click();
    }


    // Callbacks
    private _onControllerUpdate(e: ControllerEvent<DATA>) {
        this._updateData(e.detail.data, e.detail.valid);
    }


    private _onEditorExportRequest(e: EditorEvent): void {
        this.export();
    }


    // Events
    private _fireEvent(event: SceneEvent<DATA>): void {
        this.dispatchEvent(event);
        window.dispatchEvent(event);
    }


    private _fireReadyEvent(): void {
        const event = new SceneEvent(SceneEvent.READY, this)
        this._fireEvent(event);
    }


    private _fireSourceLoadEvent(): void {
        const event = new SceneEvent(SceneEvent.LOAD, this)
        this._fireEvent(event);
    }


    private _fireResizeReadyEvent(): void {
        const event = new SceneEvent(SceneEvent.RESIZE, this)
        this._fireEvent(event);
    }

}