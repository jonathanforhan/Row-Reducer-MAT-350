import {Input} from "./input.ts";

const lhs0 = "{\\placeholder[lhs0]{}}";
const rhs0 = "{\\placeholder[rhs0]{}}";

export type SwapOperation = { R0: number, R1: number };

export class Swap extends Input {
  constructor() {
    super("#input-swap");
    window.addEventListener("load", () => this._mfe.setValue(`R_${lhs0}=R_${rhs0}`));
  }

  getOperation(): SwapOperation {
    return {
      R0: +this._mfe.getPromptValue("lhs0"),
      R1: +this._mfe.getPromptValue("rhs0"),
    };
  }
}
