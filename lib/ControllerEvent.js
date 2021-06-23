export class ControllerEvent extends CustomEvent {
  constructor(typeArg, data, valid) {
    super(typeArg, {
      detail: {data, valid},
      bubbles: true,
      composed: true
    });
  }
}
