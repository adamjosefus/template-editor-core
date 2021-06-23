export class SceneEvent extends CustomEvent {
  constructor(typeArg, scene) {
    super(typeArg, {
      detail: {scene},
      bubbles: true,
      composed: true
    });
  }
}
