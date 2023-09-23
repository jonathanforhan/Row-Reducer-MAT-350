import { Mathfield } from "./mathfield.ts";
//Import the operation classes for use with autoEvaluation
import { Add } from "./add.ts";
import { Swap } from "./swap.ts";
import { Scale } from "./scale.ts";

const [
  rowNumber,
  columnNumber,
  rowText,
  columnText,
] = [
    document.querySelector("#row-number")!,
    document.querySelector("#column-number")!,
    document.querySelector("#row-text")!,
    document.querySelector("#column-text")!,
  ];

export class Matrix extends Mathfield {
  private readonly _begin: string;
  private readonly _end: string;
  private _data: string[][];

  constructor() {
    super("#matrix");
    this._begin = "\\left[\\begin{array}";
    this._end = "\\end{array}\\right]";
    this._data = [[this._placeholder("" + 0 + 0)]];

    window.addEventListener("load", () => this._mfe.setValue(this.toLatex()));

    document.querySelector("#row-sub")!.addEventListener("click", () => this.subtractRow());
    document.querySelector("#row-add")!.addEventListener("click", () => this.addRow());
    document.querySelector("#column-sub")!.addEventListener("click", () => this.subtractColumn());
    document.querySelector("#column-add")!.addEventListener("click", () => this.addColumn());
  }

  autoEvaluation() {
    /*
    Function Name: autoEvaluation
    Name Meaning: Automatic Evaluation
    
    Description:

    - Checks pivot locations and performs
    row operation based on pivot locations.

    - Only able to do automatic evaluation
    if there's nothing inputted in the operation
    text boxes.

    - Uses same "Evaluate" button to activate this function.

    - Outputs what operation was performed.

    - Undo button functionality should still operate
    so that end-user can go back and forth and inspect the work.
    */
  }

  subtractRow() {
    if (this._data.length > 1) {
      this._data.pop();
      this._mfe.setValue(this.toLatex());
      rowNumber.innerHTML = (+rowNumber.innerHTML - 1).toString();
      rowText.innerHTML = +rowNumber.innerHTML === 1 ? "Row" : "Rows";
    }
  }

  addRow() {
    if (this._data.length < 10) {
      const [x, y] = [this._data[0].length - 1, this._data.length];
      this._data.push(Array(this._data[0].length).fill(`${this._placeholder("" + y + x)}`));
      this._mfe.setValue(this.toLatex());
      rowNumber.innerHTML = (+rowNumber.innerHTML + 1).toString();
      rowText.innerHTML = "Rows";
    }
  }

  subtractColumn() {
    if (this._data[0].length > 1) {
      this._data.forEach((row) => row.pop());
      this._mfe.setValue(this.toLatex());
      columnNumber.innerHTML = (+columnNumber.innerHTML - 1).toString();
      columnText.innerHTML = +columnNumber.innerHTML === 1 ? "Column" : "Columns";
    }
  }

  addColumn() {
    if (this._data[0].length < 10) {
      for (let i = 0; i < this._data.length; i++) {
        const [x, y] = [this._data[i].length, i];
        this._data[i].push(this._placeholder("" + y + x));
      }
      this._mfe.setValue(this.toLatex());
      columnNumber.innerHTML = (+columnNumber.innerHTML + 1).toString();
      columnText.innerHTML = "Columns";
    }
  }

  toLatex(): string {
    const format = `{${"c".repeat(this._data[0].length - 1)}|c}`;

    let contents = "";
    for (let i = 0; i < this._data.length; i++) {
      for (let j = 0; j < this._data[i].length; j++) {
        const delim = j !== this._data[i].length - 1 ? " & " : " \\\\ ";
        contents += this._placeholder("" + i + j) + delim;
      }
    }
    return `${this._begin}${format}${contents}${this._end}`
  }

  getData(): string[][] {
    let data = JSON.parse(JSON.stringify(this._data));
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        data[i][j] = this._mfe.getPromptValue("" + i + j);
      }
    }
    return data;
  }

  setData(data: string[][]) {
    this._data = data;
    for (let i = 0; i < this._data.length; i++) {
      for (let j = 0; j < this._data[i].length; j++) {
        this._mfe.setPromptContent("" + i + j, this._data[i][j], {});
      }
    }
    (document.activeElement! as HTMLElement).blur();
  }
}
