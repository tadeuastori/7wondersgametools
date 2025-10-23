import { StateContext } from "@ngxs/store";

export class BaseState {

  private displayConsoleLog: boolean = true;


  public _successSnakBar(message: string) {
    if (this.displayConsoleLog) console.log(message);
  }

  public _errorSnakBar(message: string) {
    if (this.displayConsoleLog) console.log(message);
  }

  public _warningSnakBar(message: string) {
    if (this.displayConsoleLog) console.log(message);
  }

  public _infoSnakBar(message: string) {
    if (this.displayConsoleLog) console.log(message);
  }

  public _startPathState(ctx: StateContext<any>) {
    ctx.patchState({
      isStateReady: false,
    });
  }

  public _endPathState(ctx: StateContext<any>) {
    ctx.patchState({
      isStateReady: true,
    });
  }
}
