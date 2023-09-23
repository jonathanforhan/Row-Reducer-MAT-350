import Inputfield from "./inputfield.ts";

type AddOperation = { R_left: number, S_left: string | null, R_right: number, S_right: string | null };

export default class Add extends Inputfield {
  private readonly _lhs_0 = this._placeholder("lhs_0");
  private readonly _rhs_0 = this._placeholder("rhs_0");
  private readonly _rhs_1 = this._placeholder("rhs_1");
  private readonly _scalar_0 = this._placeholder("scalar_0");
  private readonly _scalar_1 = this._placeholder("scalar_1");
  private _prev_R = "";

  public constructor() {
    super("#input-add");
    window.addEventListener("load", () => {
      this._mfe.setValue(`R_${this._lhs_0}=${this._scalar_0}R_${this._rhs_0}+${this._scalar_1}R_${this._rhs_1}`);
    });

    this._mfe.addEventListener("input", () => {
      const new_lhs0 = this._mfe.getPromptValue("lhs_0");
      const new_rhs0 = this._mfe.getPromptValue("rhs_0");
      if (new_lhs0 !== new_rhs0) {
        let newVal = new_lhs0 !== this._prev_R ? new_lhs0 : new_rhs0;
        this._mfe.setPromptContent("lhs_0", newVal, {});
        this._mfe.setPromptContent("rhs_0", newVal, {});
        this._prev_R = newVal;
      }
    })
  }

  public override evaluate(data: string[][]): string[][] | null {
    const { R_left, S_left, R_right, S_right } = this._operation();

    if (S_left === null || S_right === null ||
        isNaN(R_left) || isNaN(R_right) ||
        R_left < 0 || R_left > data.length - 1 ||
        R_right < 0 || R_right > data.length - 1) {
      return null;
    }

    for (let i = 0; i < data[R_left].length; i++) {
      const expr = this._ce.parse(`(${S_left} * ${data[R_left][i]}) +  (${S_right} * ${data[R_right][i]})`)
        .evaluate()
        .simplify();

      if (!expr.isValid) {
        return null;
      } else {
        data[R_left][i] = expr.latex;
      }
    }

    return data;
  }

  protected override _operation(): AddOperation {
    let scalar_0 = this._mfe.getPromptValue("scalar_0") === "" ? "1" : null;
    let scalar_1 = this._mfe.getPromptValue("scalar_1") === "" ? "1" : null;

    return {
      R_left: +this._mfe.getPromptValue("lhs_0") - 1,
      S_left: scalar_0 || this._ce.parse(this._mfe.getPromptValue("scalar_0")).simplify().latex,
      R_right: +this._mfe.getPromptValue("rhs_1") - 1,
      S_right: scalar_1 || this._ce.parse(this._mfe.getPromptValue("scalar_1")).simplify().latex,
    };
  }
}
