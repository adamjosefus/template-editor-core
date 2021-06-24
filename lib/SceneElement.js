var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {LitElement} from "./web-modules/pkg/lit.js";
import {state} from "./web-modules/pkg/lit/decorators.js";
import {WebFonts as WebFontUtils} from "./web-modules/pkg/@templatone/utils.js";
import {updateConfig} from "./ConfigType.js";
import {SceneEvent} from "./SceneEvent.js";
export class SceneElement extends LitElement {
  constructor(width, height) {
    super();
    this._templateDataUrl = null;
    this._config = null;
    this._isLoadedToggle = false;
    this._lastWidth = 0;
    this._lastHeight = 0;
    this._data = null;
    this._lastValidityState = false;
    this._isReadyToggle = false;
    this._getWidthCallback = typeof width === "number" ? () => width : width;
    this._getHeightCallback = typeof height === "number" ? () => height : height;
  }
  get templateDataUrl() {
    if (this._templateDataUrl == null)
      throw new Error("storePath has not been set yet.");
    return this._templateDataUrl;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("controller-ready", this._onControllerReadyHandle.bind(this), {once: true});
    window.addEventListener("controller-data-update", this._onControllerUpdateHandle.bind(this), false);
    window.addEventListener("editor-export-request", this._onEditorExportRequestHandle.bind(this), false);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("controller-data-update", this._onControllerUpdateHandle);
    window.removeEventListener("editor-export-request", this._onEditorExportRequestHandle);
  }
  firstUpdated() {
    this.init();
  }
  async init() {
    await this._load();
    await this._startup();
  }
  async _load() {
    this._templateDataUrl = this.getAttribute("tempalte-data-url");
    await this._loadConfig();
    await this._loadFonts();
    this._isLoadedToggle = true;
    this._fireLoadEvent();
  }
  async startup() {
    throw new Error(`${this.tagName}: Method 'startup' is not defined.`);
  }
  async _startup() {
    await this.startup();
    this._isReadyToggle = true;
    this._fireReadyEvent();
  }
  async _loadConfig() {
    const path = `${this.templateDataUrl}/config.json`;
    const response = await fetch(path);
    const data = await response.json();
    this._config = updateConfig(data);
  }
  async _loadFonts() {
    const config = this.getConfig();
    if (!config.assets.fonts)
      return;
    const fontCssPath = `${this.templateDataUrl}/fonts.css`;
    const familyDescriptions = WebFontUtils.convertFacesToFamilies(config.assets.fonts.map((f) => {
      return {
        family: f.family,
        path: f.filename,
        style: f.italic ? "italic" : "normal",
        weight: f.weight
      };
    }));
    const families = familyDescriptions.map((f) => WebFontUtils.computeFamilyQuery(f.family, f.variations));
    const webFontConfig = {
      classes: false,
      timeout: 30 * 1e3,
      custom: {
        families,
        urls: [fontCssPath]
      }
    };
    await WebFontUtils.load(webFontConfig);
  }
  getConfig() {
    if (this._config == null)
      throw new Error("Config has not been set yet.");
    return this._config;
  }
  isLoaded() {
    return this._isLoadedToggle;
  }
  getWidth() {
    if (this._getWidthCallback === void 0)
      return 0;
    const value = this._getWidthCallback();
    if (value !== this._lastWidth) {
      this._lastWidth = value;
      this._fireResizeEvent();
    }
    return value;
  }
  getHeight() {
    if (this._getHeightCallback === void 0)
      return 0;
    const value = this._getHeightCallback();
    if (value !== this._lastHeight) {
      this._lastHeight = value;
      this._fireResizeEvent();
    }
    return value;
  }
  getData() {
    if (this._data === null)
      throw new Error("Data is null. Test int by method hasData");
    return this._data;
  }
  hasData() {
    return this._data !== null;
  }
  isValid() {
    throw new Error(`${this.tagName}: method "isValid" is not defined.`);
  }
  setValidityState(valid) {
    if (this._lastValidityState !== valid) {
      this._fireChangeValidityEvent();
    }
    this._lastValidityState = valid;
  }
  isReady() {
    return this._isReadyToggle;
  }
  async getExportData() {
    throw new Error(`${this.tagName}: Method 'ExportDataType' is not defined.`);
  }
  _onEditorExportRequestHandle(e) {
    e.stopPropagation();
    this._fireExportEvent();
  }
  _onControllerReadyHandle(e) {
    e.stopPropagation();
    console.log("this", this);
    this._fireReadyEvent();
  }
  _onControllerUpdateHandle(e) {
    e.stopPropagation();
    this._data = e.detail.data;
  }
  _fireReadyEvent() {
    const event = new SceneEvent("scene-ready", this, this.isValid());
    this.dispatchEvent(event);
  }
  _fireLoadEvent() {
    const event = new SceneEvent("scene-load", this, this.isValid());
    this.dispatchEvent(event);
  }
  _fireResizeEvent() {
    const event = new SceneEvent("scene-resize", this, this.isValid());
    this.dispatchEvent(event);
  }
  _fireExportEvent() {
    const event = new SceneEvent("scene-export", this, this.isValid());
    this.dispatchEvent(event);
  }
  _fireChangeValidityEvent() {
    const event = new SceneEvent("scene-change-validity", this, this.isValid());
    this.dispatchEvent(event);
  }
}
__decorate([
  state()
], SceneElement.prototype, "_lastWidth", 2);
__decorate([
  state()
], SceneElement.prototype, "_lastHeight", 2);
