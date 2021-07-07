export class ControllerEvent extends CustomEvent {
  constructor(typeArg, controller, valid) {
    super(typeArg, {
      detail: {controller, valid},
      bubbles: true,
      composed: true
    });
  }
}
