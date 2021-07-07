import {LitElement} from "./web-modules/pkg/lit.js";
import {ControllerEvent} from "./ControllerEvent.js";
export class ControllerElement extends LitElement {
  constructor(defaultData) {
    super();
    this._sceneReadyState = false;
    this._controllerReadyState = false;
    this._data = defaultData;
    this._startup();
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("scene-ready", this._onSceneReadyHandle.bind(this), {once: true});
    window.addEventListener("editor-controller-request", this._onControllerRequestHandle.bind(this), false);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("editor-controller-request", this._onControllerRequestHandle);
  }
  firstUpdated() {
  }
  async _startup() {
    await this.startup();
    this._controllerReadyState = true;
    this._fireReadyEvent();
  }
  isReady() {
    return this._controllerReadyState;
  }
  getData() {
    return this._data;
  }
  setData(data) {
    if (this.isStructureValid(data)) {
      this._data = {...data};
      this._fireDataUpdateEvent();
      this.reflectDataToControls(data);
    } else {
      throw new Error("Data structure is not valid.");
    }
  }
  isValid() {
    return this.isDataValid(this.getData());
  }
  _onSceneReadyHandle(e) {
    e.stopPropagation();
    this._sceneReadyState = true;
    if (this._controllerReadyState && this._sceneReadyState) {
      this._fireDataUpdateEvent();
    }
  }
  _onControllerRequestHandle(e) {
    e.stopPropagation();
    this._fireResponseEvent();
  }
  _fireReadyEvent() {
    const data = this.getData();
    const valid = this.isDataValid(data);
    const event = new ControllerEvent("controller-ready", this, valid);
    this.dispatchEvent(event);
  }
  _fireDataUpdateEvent() {
    const data = this.getData();
    const valid = this.isDataValid(data);
    const event = new ControllerEvent("controller-data-update", this, valid);
    this.dispatchEvent(event);
  }
  _fireResponseEvent() {
    const data = this.getData();
    const valid = this.isDataValid(data);
    const event = new ControllerEvent("controller-response", this, valid);
    this.dispatchEvent(event);
  }
}
