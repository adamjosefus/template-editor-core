export class SceneEvent extends CustomEvent {
  constructor(typeArg, scene, valid) {
    super(typeArg, {
      detail: {scene},
      bubbles: true,
      composed: true
    });
  }
}
