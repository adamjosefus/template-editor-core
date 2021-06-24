export class ControllerEvent extends CustomEvent {
  constructor(typeArg, controller, data, valid) {
    super(typeArg, {
      detail: {controller, data, valid},
      bubbles: true,
      composed: true
    });
  }
}
