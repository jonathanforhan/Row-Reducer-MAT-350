import {ComputeEngine} from "@cortex-js/compute-engine";
import {Input} from "./input.ts";

const ce = new ComputeEngine();
const lhs0 = "{\\placeholder[lhs0]{}}";
const rhs0 = "{\\placeholder[rhs0]{}}";
const rhs1 = "{\\placeholder[rhs1]{}}";
const scalar0 = "{\\placeholder[scalar0]{}}";
const scalar1 = "{\\placeholder[scalar1]{}}";

export type AddOperation = { R0: number, S0: number | null, R1: number, S1: number | null};

export class Add extends Input {
  private _prev_R: string;

  constructor() {
    super("#input-add");
    this._prev_R = "";

    window.addEventListener("load", () => this._mfe.setValue(`R_${lhs0}=${scalar0}R_${rhs0}+${scalar1}R_${rhs1}`));

    this._mfe.addEventListener("input", () => {
      const new_lhs0 = this._mfe.getPromptValue("lhs0");
      const new_rhs0 = this._mfe.getPromptValue("rhs0");

      if (new_lhs0 === new_rhs0) return;

      let new_val = new_lhs0 !== this._prev_R ? new_lhs0 : new_rhs0;
      this._mfe.setPromptContent("lhs0", new_val, {});
      this._mfe.setPromptContent("rhs0", new_val, {});
      this._prev_R = new_val;
    })
  }

  getOperation(): AddOperation {
    let S0 = this._mfe.getPromptValue("scalar0") === "" ? 1 : null;
    let S1 = this._mfe.getPromptValue("scalar1") === "" ? 1 : null;

    return {
      R0: +this._mfe.getPromptValue("lhs0"),
      S0: S0 || +ce.parse(this._mfe.getPromptValue("scalar0"))?.N().valueOf() || null,
      R1: +this._mfe.getPromptValue("rhs1"),
      S1: S1 || +ce.parse(this._mfe.getPromptValue("scalar1"))?.N().valueOf() || null,
    };
  }
}