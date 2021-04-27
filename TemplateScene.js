import { CustomElement } from "../CustomElement.js";
import { WebFontLoader } from "../utils/WebFontLoader.js";
import { TemplateEditorEvent as EditorEvent, TemplateControllerEvent as ControllerEvent, TemplateSceneEvent as SceneEvent, } from "./index.js";
export class TemplateScene extends CustomElement {
    constructor(getWidth, getHeight, getOutputFileName) {
        super();
        this._storePath = null;
        // Size
        this._lastWidth = 0;
        this._lastHeight = 0;
        // Data
        this._data = null;
        this.isDataUpdatedToggle = false;
        this.isDataValidToggle = false;
        // Config
        this._config = null;
        // - Load
        this._isLoadedToggle = false;
        // - Ready
        this._isReadyToggle = false;
        this._getWidthCallback = getWidth;
        this._getHeightCallback = getHeight;
        this._getOutputFileNameCallback = getOutputFileName;
        // Init
        window.addEventListener(ControllerEvent.READY, (e) => {
            const evnt = e;
            this._fireReadyEvent();
        }, { once: true });
        window.addEventListener(ControllerEvent.DATA_UPDATE, (e) => {
            const evnt = e;
            this._onControllerUpdate(evnt);
        });
        window.addEventListener(EditorEvent.EXPORT_REQUEST, (e) => {
            const evnt = e;
            this._onEditorExportRequest(evnt);
        });
        this.init();
    }
    get storePath() {
        if (this._storePath == null)
            throw new Error("storePath has not been set yet.");
        return this._storePath;
    }
    getWidth() {
        if (this._getWidthCallback === undefined)
            return 0;
        const value = this._getWidthCallback();
        if (value !== this._lastWidth) {
            this._lastWidth = value;
            this.invalidate();
            this._fireResizeReadyEvent();
        }
        return value;
    }
    getHeight() {
        if (this._getHeightCallback === undefined)
            return 0;
        const value = this._getHeightCallback();
        if (value !== this._lastHeight) {
            this._lastHeight = value;
            this.invalidate();
            this._fireResizeReadyEvent();
        }
        return value;
    }
    getOutputFilename() {
        return this._getOutputFileNameCallback();
    }
    _updateData(data, isValid) {
        this._data = data;
        this.isDataValidToggle = isValid;
        this.isDataUpdatedToggle = true;
    }
    getData() {
        if (this._data === null)
            throw new Error("Data is null. Test int by method hasData");
        this.isDataUpdatedToggle = false;
        return this._data;
    }
    hasData() {
        return this._data !== null;
    }
    isDataValid() {
        return this.hasData() && this.isDataValidToggle;
    }
    /**
     * Check it data was updated from last get. The data can be identical.
     * @deprecated
     */
    isDataUpdatedFromLastGet() {
        return this.isDataUpdatedToggle;
    }
    getConfig() {
        if (this._config == null)
            throw new Error("Config has not been set yet.");
        return this._config;
    }
    // Cycle
    async init() {
        await this._load();
        await this._startup();
    }
    isLoaded() {
        return this._isLoadedToggle;
    }
    async _load() {
        this._storePath = this.getAttribute('store-path');
        await this._loadConfig();
        await this._loadFonts();
        this._isLoadedToggle = true;
        this._fireSourceLoadEvent();
    }
    async _loadConfig() {
        const path = `${this.storePath}/config.json`;
        const response = await fetch(path);
        const data = await response.json();
        this._config = data;
    }
    async _loadFonts() {
        const config = this.getConfig();
        if (!config.assets.fonts)
            return;
        const fontCssPath = `${this.storePath}/fonts.css`;
        if (!window.WebFont)
            throw new Error("window.WebFont is undefined. Please load this file first.");
        const familyBundles = [];
        for (let i = 0; i < config.assets.fonts.length; i++) {
            const font = config.assets.fonts[i];
            const family = familyBundles.find(fml => fml.name == font.family);
            if (family) {
                family.fonts.push(font);
            }
            else {
                familyBundles.push({
                    name: font.family,
                    fonts: [font]
                });
            }
        }
        const families = familyBundles.map(fml => {
            const fvds = fml.fonts.map(f => WebFontLoader.getFvd(f.italic ? 'italic' : 'normal', f.weight));
            return WebFontLoader.getFamily(fml.name, fvds);
        });
        const webConfig = {
            classes: false,
            timeout: 30 * 1000,
            custom: {
                families: families,
                urls: [fontCssPath]
            },
        };
        await WebFontLoader.load(webConfig);
    }
    isReady() {
        return this._isReadyToggle;
    }
    async _startup() {
        await this.startup();
        this._isReadyToggle = true;
        this._fireReadyEvent();
    }
    async startup() {
        throw new Error(`${this.tagName}: Method 'startup' is not defined.`);
    }
    // Methods
    getExportDependencies() {
        throw new Error(`${this.tagName}: Method 'getCanvases' is not defined.`);
    }
    export() {
        this._downloadImages();
    }
    _downloadImages() {
        const dependencies = this.getExportDependencies();
        const filename = `${dependencies.outputName}.png`;
        const url = dependencies.canvas.toDataURL('image/png');
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        anchor.click();
    }
    // Callbacks
    _onControllerUpdate(e) {
        this._updateData(e.detail.data, e.detail.valid);
    }
    _onEditorExportRequest(e) {
        this.export();
    }
    // Events
    _fireEvent(event) {
        this.dispatchEvent(event);
        window.dispatchEvent(event);
    }
    _fireReadyEvent() {
        const event = new SceneEvent(SceneEvent.READY, this);
        this._fireEvent(event);
    }
    _fireSourceLoadEvent() {
        const event = new SceneEvent(SceneEvent.LOAD, this);
        this._fireEvent(event);
    }
    _fireResizeReadyEvent() {
        const event = new SceneEvent(SceneEvent.RESIZE, this);
        this._fireEvent(event);
    }
}
