import {LitElement} from "./web-modules/pkg/lit.js";
import {TemplateControllerEvent as ControllerEvent} from "./TemplateControllerEvent.js";
import {TemplateSceneEvent as SceneEvent} from "./TemplateSceneEvent.js";
export class TemplateController extends LitElement {
  constructor(defaultData) {
    super();
    this._isSceneReady = false;
    this._isControllerReady = false;
    this.data = defaultData;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(SceneEvent.READY, (e) => {
      const event = e;
      this._isSceneReady = true;
      if (this._isControllerReady && this._isSceneReady) {
        this.fireDataUpdateEvent();
      }
    }, {once: true});
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
  _fireEvent(event) {
    this.dispatchEvent(event);
    window.dispatchEvent(event);
  }
  _fireReadyEvent() {
    const event = new ControllerEvent(ControllerEvent.READY, this.data, this.isValid(this.data));
    this._fireEvent(event);
  }
  fireDataUpdateEvent() {
    const event = new ControllerEvent(ControllerEvent.DATA_UPDATE, this.data, this.isValid(this.data));
    this._fireEvent(event);
  }
}
