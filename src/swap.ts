import {Inputfield} from "./inputfield.ts";

export type SwapOperation = { R_left: number, R_right: number };

export class Swap extends Inputfield {
  private readonly _lhs = this._placeholder("lhs");
  private readonly _rhs = this._placeholder("rhs");

  public constructor() {
    super("#input-swap");
    window.addEventListener("load", () => this._mfe.setValue(`R_${this._lhs}=R_${this._rhs}`));
  }

  public override evaluate(data: string[][]): string[][] | null {
    const { R_left, R_right } = this._operation();
    if (isNaN(R_left) || isNaN(R_right) ||
        R_left > data.length - 1 || R_left < 0 ||
        R_right > data.length - 1 || R_right < 0) {
      return null;
    }

    [data[R_left], data[R_right]] = [data[R_right], data[R_left]];
    return data;
  }

  protected override _operation(): SwapOperation {
    return {
      R_left: (+this._mfe.getPromptValue("lhs")) - 1,
      R_right: (+this._mfe.getPromptValue("rhs")) - 1,
    };
  }
}
