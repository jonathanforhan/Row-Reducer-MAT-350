import {ComputeEngine} from "@cortex-js/compute-engine";
import {Input} from "./input.ts";

const ce = new ComputeEngine();
const lhs0 = "{\\placeholder[lhs0]{}}";
const rhs0 = "{\\placeholder[rhs0]{}}";
const scalar0 = "{\\placeholder[scalar0]{}}";

export type ScaleOperation = { R0: number, S0: number | null };

export class Scale extends Input {
  private _prev_R: string;

  constructor() {
    super("#input-scale");
    this._prev_R = "";

    window.addEventListener("load", () => this._mfe.setValue(`R_${lhs0}=${scalar0}R_${rhs0}`));

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

  getOperation(): ScaleOperation {
    let S0 = this._mfe.getPromptValue("scalar0") === "" ? 1 : null;

    return {
      R0: +this._mfe.getPromptValue("lhs0"),
      S0: S0 || +ce.parse(this._mfe.getPromptValue("scalar0"))?.N().valueOf() || null,
    };
  }
}
