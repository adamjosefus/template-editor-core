export class EditorEvent extends CustomEvent {
  constructor(typeArg, data = null) {
    super(typeArg, {
      detail: {data},
      bubbles: true,
      composed: true
    });
  }
}
