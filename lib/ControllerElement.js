import {LitElement} from "./web-modules/pkg/lit.js";
import {ControllerEvent} from "./ControllerEvent.js";
export class ControllerElement extends LitElement {
  constructor(defaultData) {
    super();
    this._sceneReadyState = false;
    this._controllerReadyState = false;
    this._data = defaultData;
  }
  connectedCallback() {
    super.connectedCallback();
    this._onSceneReadyHandle.bind(this);
    window.addEventListener("scene-ready", this._onSceneReadyHandle, {once: true});
    this._onSavingSnapshotHandle.bind(this);
    window.addEventListener("editor-saving-snapshot", this._onSavingSnapshotHandle, false);
    this._onLoadSnapshothandle.bind(this);
    window.addEventListener("editor-load-snapshot", this._onLoadSnapshothandle, false);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("editor-saving-snapshot", this._onSavingSnapshotHandle);
    window.removeEventListener("editor-load-snapshot", this._onLoadSnapshothandle);
  }
  firstUpdated() {
    this.init();
  }
  async init() {
    await this._startup();
  }
  async _startup() {
    await this.startup();
    this._controllerReadyState = true;
    this._fireReadyEvent();
  }
  async startup() {
    throw new Error(`${this.tagName}: method "startup" is not defined.`);
  }
  isReady() {
    return this._controllerReadyState;
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
  _onSceneReadyHandle(e) {
    e.stopPropagation();
    this._sceneReadyState = true;
    if (this._controllerReadyState && this._sceneReadyState) {
      this._fireDataUpdateEvent();
    }
  }
  _onSavingSnapshotHandle(e) {
    e.stopPropagation();
    this._fireSnapshotDataEvent();
  }
  _onLoadSnapshothandle(e) {
    e.stopPropagation();
    if (e.detail.data !== null) {
      this.setData(e.detail.data);
    }
  }
  _fireReadyEvent() {
    const data = this.getData();
    const event = new ControllerEvent("controller-ready", data, this.isDataValid(data));
    this.dispatchEvent(event);
  }
  _fireDataUpdateEvent() {
    const data = this.getData();
    const event = new ControllerEvent("controller-data-update", data, this.isDataValid(data));
    this.dispatchEvent(event);
  }
  _fireSnapshotDataEvent() {
    const data = this.getData();
    const event = new ControllerEvent("controller-create-snapshot", data, this.isDataValid(data));
    this.dispatchEvent(event);
  }
}
