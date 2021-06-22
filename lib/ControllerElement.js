import {LitElement} from "./web-modules/pkg/lit.js";
import {ControllerEvent} from "./ControllerEvent.js";
import {SceneEvent} from "./SceneEvent.js";
import {EditorEvent} from "./EditorEvent.js";
export class ControllerElement extends LitElement {
  constructor(defaultData) {
    super();
    this._isSceneReady = false;
    this._isControllerReady = false;
    this.data = defaultData;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(SceneEvent.Ready, (e) => {
      const event = e;
      this._isSceneReady = true;
      if (this._isControllerReady && this._isSceneReady) {
        this._fireDataUpdateEvent();
      }
    }, {once: true});
    window.addEventListener(EditorEvent.SnapshotDataRequest, (e) => {
      const evnt = e;
      this._onSnapshotDataRequest(evnt);
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
    throw new Error(`${this.tagName}: method startup is not defined.`);
  }
  isValid(data) {
    throw new Error(`${this.tagName}: method isValid is not defined.`);
  }
  _onSnapshotDataRequest(e) {
    this._fireSnapshotDataEvent();
  }
  _fireEvent(event) {
    this.dispatchEvent(event);
    window.dispatchEvent(event);
  }
  _fireReadyEvent() {
    const event = new ControllerEvent(ControllerEvent.Ready, this.data, this.isValid(this.data));
    this._fireEvent(event);
  }
  _fireDataUpdateEvent() {
    const event = new ControllerEvent(ControllerEvent.DataUpdate, this.data, this.isValid(this.data));
    this._fireEvent(event);
  }
  _fireSnapshotDataEvent() {
    const event = new ControllerEvent(ControllerEvent.SnapshotData, this.data, this.isValid(this.data));
    this._fireEvent(event);
  }
}
