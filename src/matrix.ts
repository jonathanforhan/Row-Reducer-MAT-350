import Mathfield from "./mathfield.ts";

let [
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
const display = document.querySelector("#display")!;

export default class Matrix extends Mathfield {
  private readonly _begin: string;
  private readonly _end: string;
  private _data: string[][];
  private _undoTree: string[] = [];

  public constructor() {
    super("#matrix");
    this._begin = "\\begin{align*}\\left[\\begin{array}";
    this._end = "\\end{array}\\right]\\end{align*}";
    this._data = [[this._placeholder(""+ 0 + 0)]];

    rowNumber.innerHTML = "1";
    columnNumber.innerHTML = "1";
    rowText.innerHTML = "Row";
    columnText.innerHTML = "Column";

    window.addEventListener("load", () => this._mfe.setValue(this.toLatex()));

    document.querySelector("#row-sub")!.addEventListener("click", () => this.subtractRow());
    document.querySelector("#row-add")!.addEventListener("click", () => this.addRow());
    document.querySelector("#column-sub")!.addEventListener("click", () => this.subtractColumn());
    document.querySelector("#column-add")!.addEventListener("click", () => this.addColumn());

    document.querySelector("#undo-btn")!.addEventListener("click", () => {
      const undoAction = this._undoTree.pop();
      if (undoAction) {
        const undoData = JSON.parse(undoAction);

        let undoSize = undoData.length * undoData[0].length;
        let dataSize = this._data.length * this._data[0].length;

        if (undoSize !== dataSize) {
          this.resize(undoData);
        } else {
          if (display.lastChild) display.removeChild(display.lastChild);
          if (display.lastChild) display.removeChild(display.lastChild);
          if (display.childNodes.length === 1) {
            display.removeChild(display.lastChild!);
          }
        }
        this.setData(undoData);
      }
    })
  }


public subtractRow(addUndo: boolean = true) {
    if (this._data.length > 1) {
      if (addUndo) {
        this.addUndoAction();
      }
      this._data.pop();
      this._mfe.setValue(this.toLatex());
      rowNumber.innerHTML = (+rowNumber.innerHTML - 1).toString();
      rowText.innerHTML = +rowNumber.innerHTML === 1 ? "Row" : "Rows";
    }
  }

  public addRow(addUndo: boolean = true) {
    if (this._data.length < 10) {
      if (addUndo) {
        this.addUndoAction();
      }
      const [x, y] = [this._data[0].length - 1, this._data.length];
      this._data.push(Array(this._data[0].length).fill(`${this._placeholder(""+ y + x)}`));
      this._mfe.setValue(this.toLatex());
      rowNumber.innerHTML = (+rowNumber.innerHTML + 1).toString();
      rowText.innerHTML = "Rows";
    }
  }

  public subtractColumn(addUndo: boolean = true) {
    if (this._data[0].length > 1) {
      if (addUndo) {
        this.addUndoAction();
      }
      this._data.forEach((row) => row.pop());
      this._mfe.setValue(this.toLatex());
      columnNumber.innerHTML = (+columnNumber.innerHTML - 1).toString();
      columnText.innerHTML = +columnNumber.innerHTML === 1 ? "Column" : "Columns";
    }
  }

  public addColumn(addUndo: boolean = true) {
    if (this._data[0].length < 10) {
      if (addUndo) {
        this.addUndoAction();
      }
      for (let i = 0; i < this._data.length; i++) {
        const [x, y] = [this._data[i].length, i];
        this._data[i].push(this._placeholder(""+ y + x));
      }
      this._mfe.setValue(this.toLatex());
      columnNumber.innerHTML = (+columnNumber.innerHTML + 1).toString();
      columnText.innerHTML = "Columns";
    }
  }

  public toLatex(): string {
    const format = `{${"c".repeat(this._data[0].length - 1)}|c}`;

    let contents = "";
    for (let i = 0; i < this._data.length; i++) {
      for (let j = 0; j < this._data[i].length; j++) {
        const delim = j !== this._data[i].length - 1 ? " & " : " \\\\ ";
        contents += this._placeholder(""+ i + j) + delim;
      }
    }
    return `${this._begin}${format}${contents}${this._end}`
  }

  public getData(): string[][] {
    let data = JSON.parse(JSON.stringify(this._data));
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        data[i][j] = this._mfe.getPromptValue(""+ i + j);
      }
    }
    return data;
  }

  public setData(data: string[][]) {
    this._data = data;
    for (let i = 0; i < this._data.length; i++) {
      for (let j = 0; j < this._data[i].length; j++) {
        this._mfe.setPromptContent(""+ i + j, this._data[i][j], {});
      }
    }
    (document.activeElement! as HTMLElement).blur();
  }

  public addUndoAction() {
    this._undoTree.push(JSON.stringify(this.getData()));
    if (this._undoTree.length > 256) {
      this._undoTree.shift();
    }
  }

  public getRowNumber(): number {
    return +rowNumber.innerHTML;
  }

  public getColumnNumber(): number {
    return +columnNumber.innerHTML;
  }

  public resize(data: string[][]) {
    while(data.length > this.getRowNumber()) this.addRow(false);
    while(data.length < this.getRowNumber()) this.subtractRow(false);
    while(data[0].length > this.getColumnNumber()) this.addColumn(false);
    while(data[0].length < this.getColumnNumber()) this.subtractColumn(false);
  }

  public clear() {
    const data = [[""]];
    this.resize(data);
    this.setData(data);
    this._undoTree = [];
  }
}
