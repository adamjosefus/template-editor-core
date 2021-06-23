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
    window.addEventListener("editor-snapshot-data-request", (e) => {
      e.stopPropagation();
      this._onSnapshotDataRequest(e);
    });
    window.addEventListener("editor-snapshot-data", (e) => {
      e.stopPropagation();
      this._onSnapshotData(e);
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
  reflectDataToControls(data) {
    throw new Error(`${this.tagName}: method "reflectDataToControls" is not defined.`);
  }
  isDataValid(data) {
    throw new Error(`${this.tagName}: method "isValid" is not defined.`);
  }
  isStructureValid(data) {
    throw new Error(`${this.tagName}: method "isStructureValid" is not defined.`);
  }
  _onSnapshotDataRequest(e) {
    this._fireSnapshotDataEvent();
  }
  _onSnapshotData(e) {
    if (e.detail.data !== null) {
      this.setData(e.detail.data);
    }
  }
  _fireEvent(event) {
    this.dispatchEvent(event);
    window.dispatchEvent(event);
  }
  _fireReadyEvent() {
    const data = this.getData();
    const event = new ControllerEvent("controller-ready", data, this.isDataValid(data));
    this._fireEvent(event);
  }
  _fireDataUpdateEvent() {
    const data = this.getData();
    const event = new ControllerEvent("controller-update", data, this.isDataValid(data));
    this._fireEvent(event);
  }
  _fireSnapshotDataEvent() {
    const data = this.getData();
    const event = new ControllerEvent("controller-snapshot", data, this.isDataValid(data));
    this._fireEvent(event);
  }
}
