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
    this._storePath = null;
    this._lastWidth = 0;
    this._lastHeight = 0;
    this._data = null;
    this.isDataUpdatedToggle = false;
    this.isDataValidToggle = false;
    this._config = null;
    this._isLoadedToggle = false;
    this._isReadyToggle = false;
    this._getWidthCallback = typeof width === "number" ? () => width : width;
    this._getHeightCallback = typeof height === "number" ? () => height : height;
    window.addEventListener("controller-ready", (e) => {
      this._fireReadyEvent();
    }, {once: true});
    window.addEventListener("controller-update", (e) => {
      this._onControllerUpdate(e);
    });
    window.addEventListener("editor-export-request", (e) => {
      this._onEditorExportRequest(e);
    });
    this.init();
  }
  get storePath() {
    if (this._storePath == null)
      throw new Error("storePath has not been set yet.");
    return this._storePath;
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
  isDataUpdatedFromLastGet() {
    return this.isDataUpdatedToggle;
  }
  getConfig() {
    if (this._config == null)
      throw new Error("Config has not been set yet.");
    return this._config;
  }
  async init() {
    await this._load();
    await this._startup();
  }
  isLoaded() {
    return this._isLoadedToggle;
  }
  async _load() {
    this._storePath = this.getAttribute("store-path");
    await this._loadConfig();
    await this._loadFonts();
    this._isLoadedToggle = true;
    this._fireSourceLoadEvent();
  }
  async _loadConfig() {
    const path = `${this.storePath}/config.json`;
    const response = await fetch(path);
    const data = await response.json();
    this._config = updateConfig(data);
  }
  async _loadFonts() {
    const config = this.getConfig();
    if (!config.assets.fonts)
      return;
    const fontCssPath = `${this.storePath}/fonts.css`;
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
  async getExportData() {
    throw new Error(`${this.tagName}: Method 'ExportDataType' is not defined.`);
  }
  _onControllerUpdate(e) {
    this._updateData(e.detail.data, e.detail.valid);
  }
  _onEditorExportRequest(e) {
    this._fireExportEvent();
  }
  _fireEvent(event) {
    this.dispatchEvent(event);
    window.dispatchEvent(event);
  }
  _fireReadyEvent() {
    const event = new SceneEvent("scene-ready", this);
    this._fireEvent(event);
  }
  _fireSourceLoadEvent() {
    const event = new SceneEvent("scene-load", this);
    this._fireEvent(event);
  }
  _fireResizeEvent() {
    const event = new SceneEvent("scene-resize", this);
    this._fireEvent(event);
  }
  _fireExportEvent() {
    const event = new SceneEvent("scene-export", this);
    this._fireEvent(event);
  }
}
__decorate([
  state()
], SceneElement.prototype, "_lastWidth", 2);
__decorate([
  state()
], SceneElement.prototype, "_lastHeight", 2);
