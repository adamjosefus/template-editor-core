import {LitElement} from "./web-modules/pkg/lit.js";
import {ControllerEvent} from "./ControllerEvent.js";
export class ControllerElement extends LitElement {
  constructor(defaultData) {
    super();
    this._isSceneReady = false;
    this._isControllerReady = false;
    this._data = defaultData;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("scene-ready", (e) => {
      e.stopPropagation();
      this._isSceneReady = true;
      if (this._isControllerReady && this._isSceneReady) {
        this._fireDataUpdateEvent();
      }
    }, {once: true});
    window.addEventListener("editor-saving-snapshot", (e) => {
      e.stopPropagation();
      this._onSavingSnapshot(e);
    });
    window.addEventListener("editor-load-snapshot", (e) => {
      e.stopPropagation();
      this._onLoadSnapshot(e);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.init();
  }
  isReady() {
    return this._isControllerReady;
  }
  async init() {
    await this._startup();
  }
  async _startup() {
    await this.startup();
    this._isControllerReady = true;
    this._fireReadyEvent();
  }
  async startup() {
    throw new Error(`${this.tagName}: method "startup" is not defined.`);
  }
  getData() {
    return this._data;
  }
  setData(data) {
    if (this.isStructureValid(data)) {
      this._data = data;
      this._fireDataUpdateEvent();
      this.reflectDataToControls(data);
    } else {
      throw new Error("Data structure is not valid.");
    }
  }
  hasSameDataAs(value) {
    throw new Error(`${this.tagName}: method "hasSameDataAs" is not defined.`);
  }
  reflectDataToControls(data) {
    throw new Error(`${this.tagName}: method "reflectDataToControls" is not defined.`);
  }
  isValid() {
    return this.isDataValid(this.getData());
  }
  isDataValid(data) {
    throw new Error(`${this.tagName}: method "isValid" is not defined.`);
  }
  isStructureValid(data) {
    throw new Error(`${this.tagName}: method "isStructureValid" is not defined.`);
  }
  _onSavingSnapshot(e) {
    this._fireSnapshotDataEvent();
  }
  _onLoadSnapshot(e) {
    if (e.detail.data !== null) {
      this.setData(e.detail.data);
    }
  }
  _fireReadyEvent() {
    const data = this.getData();
    const event = new ControllerEvent("controller-ready", this, data, this.isDataValid(data));
    this.dispatchEvent(event);
  }
  _fireDataUpdateEvent() {
    const data = this.getData();
    const event = new ControllerEvent("controller-data-update", this, data, this.isDataValid(data));
    this.dispatchEvent(event);
  }
  _fireSnapshotDataEvent() {
    const data = this.getData();
    const event = new ControllerEvent("controller-create-snapshot", this, data, this.isDataValid(data));
    this.dispatchEvent(event);
  }
}
