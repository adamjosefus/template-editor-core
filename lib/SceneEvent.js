export class SceneEvent extends CustomEvent {
  constructor(typeArg, scene, valid) {
    super(typeArg, {
      detail: {scene, valid},
      bubbles: true,
      composed: true
    });
  }
}
