import Inputfield from "./inputfield.ts";

type ScaleOperation = { R_left: number, S_right: string | null };

export default class Scale extends Inputfield {
  private readonly _lhs = this._placeholder("lhs");
  private readonly _rhs = this._placeholder("rhs");
  private readonly _scalar = this._placeholder("scalar");
  private _prev_R = "";

  public constructor() {
    super("#input-scale");
    window.addEventListener("load", () => this._mfe.setValue(`R_${this._lhs}=${this._scalar}R_${this._rhs}`));

    this._mfe.addEventListener("input", () => {
      const new_lhs = this._mfe.getPromptValue("lhs");
      const new_rhs = this._mfe.getPromptValue("rhs");
      if (new_lhs !== new_rhs) {
        let newVal = new_lhs !== this._prev_R ? new_lhs : new_rhs;
        this._mfe.setPromptContent("lhs", newVal, {});
        this._mfe.setPromptContent("rhs", newVal, {});
        this._prev_R = newVal;
      }
    })
  }

  public override evaluate(data: string[][]): string[][] | null {
    const { R_left, S_right } = this._operation();

    if (S_right === null || isNaN(R_left) || R_left < 0 || R_left > data.length - 1) {
      return null;
    }

    for (let i = 0; i < data[R_left].length; i++) {
      if (data[R_left][i] === "") return null;

      const expr = this._ce.parse(`${data[R_left][i]} * ${S_right}`).evaluate().simplify();
      if (!expr.isValid) {
        return null;
      } else {
        data[R_left][i] = expr.latex;
      }
    }

    return data;
  }

  protected override _operation(): ScaleOperation {
    let scalar = this._mfe.getPromptValue("scalar") === "" ? "1" : null;

    return {
      R_left: +this._mfe.getPromptValue("lhs") - 1,
      S_right: scalar || this._ce.parse(this._mfe.getPromptValue("scalar")).simplify().latex,
    };
  }
}
