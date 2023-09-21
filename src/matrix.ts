import { MathfieldElement } from "mathlive";

declare var mathVirtualKeyboard: any;

const rowNumber = document.querySelector("#row-number")!;
const columnNumber = document.querySelector("#column-number")!;
const rowText = document.querySelector("#row-text")!;
const columnText = document.querySelector("#column-text")!;

function getPlaceholder(x: number, y: number): string {
  return `{\\placeholder[${y.toString()}${x.toString()}]{}}`;
}

export default class Matrix {
  private readonly _begin: string;
  private readonly _end: string;
  private _data: string[][];
  private _mfe: MathfieldElement;

  constructor() {
    this._begin = "\\left[\\begin{array}";
    this._end = "\\end{array}\\right]";
    this._data = [[getPlaceholder(0, 0)]];

    this._mfe = document.querySelector<MathfieldElement>("#matrix")!;
    this._mfe.addEventListener("focus", () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      mathVirtualKeyboard.layouts = ["numeric"];
      mathVirtualKeyboard.visible = isMobile;
    });
    window.addEventListener("load", () => this._mfe.setValue(this.toLatex()));

    document.querySelector("#row-sub")!.addEventListener("click", () => this.subtractRow());
    document.querySelector("#row-add")!.addEventListener("click", () => this.addRow());
    document.querySelector("#column-sub")!.addEventListener("click", () => this.subtractColumn());
    document.querySelector("#column-add")!.addEventListener("click", () => this.addColumn());
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
    if (this._data.length < 10)
    {
      const [x, y] = [this._data[0].length - 1, this._data.length];
      this._data.push(Array(this._data[0].length).fill(`${getPlaceholder(x, y)}`));
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
    if (this._data[0].length < 10)
    {
      for (let i = 0; i < this._data.length; i++) {
        const [x, y] = [this._data[i].length, i];
        this._data[i].push(getPlaceholder(x, y));
      }
      this._mfe.setValue(this.toLatex());
      columnNumber.innerHTML = (+columnNumber.innerHTML + 1).toString();
      columnText.innerHTML = "Columns";
    }
  }

  toLatex(): string {
    const format = "{" + "c".repeat(this._data[0].length - 1) + "|c}";

    let contents = "";
    for (let i = 0; i < this._data.length; i++) {
      for (let j = 0; j < this._data[i].length; j++) {
        contents += j !== this._data[i].length - 1
          ? getPlaceholder(j, i) + " & "
          : getPlaceholder(j, i) + " \\\\ ";
      }
    }
    return `${this._begin}${format}${contents}${this._end}`
  }

  getData(): string[][] {
    let data = JSON.parse(JSON.stringify(this._data));
    for (let i = 0; i < this._data.length; i++) {
      for (let j = 0; j < this._data[0].length; j++) {
        data[i][j] = +this._mfe.getPromptValue(i.toString() + j.toString());
      }
    }
    return data;
  }

  setData(data: string[][]) {
    this._data = data;
    for (let i = 0; i < this._data.length; i++) {
      for (let j = 0; j < this._data[i].length; j++) {
        this._mfe.setPromptContent(`${i}${j}`, this._data[i][j], {});
      }
    }
    (document.activeElement! as HTMLElement).blur();
  }
};
