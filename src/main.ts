import "./style.css";
import Matrix from "./matrix.ts";
import Add from "./add.ts";
import Scale from "./scale.ts";
import Swap from "./swap.ts";
import {MathfieldElement} from "mathlive";

function saveAsMarkdown(content: string) {
  const link = document.createElement("a");
  const file = new Blob([content], { type: 'text/markdown' });
  link.href = URL.createObjectURL(file);
  const date = new Date();
  link.download = "matrix_" + date.getTime().toString() + ".md";
  link.click();
  URL.revokeObjectURL(link.href);
}

function saveAsPdf() {
  window.print();
}

function defaultMatrix(matrix: Matrix) {
  matrix.addRow(false);
  matrix.addRow(false);
  matrix.addColumn(false);
  matrix.addColumn(false);
  matrix.addColumn(false);
}

(function main() {
  const matrix = new Matrix();
  const [add ,scale, swap] = [new Add(), new Scale(), new Swap()];
  const display = document.querySelector("#display")!;
  if (display.firstChild) display.removeChild(display.firstChild);

  window.addEventListener("load", () => defaultMatrix(matrix));

  document.querySelector("#reset-btn")!.addEventListener("click", () => {
    matrix.clear();
    defaultMatrix(matrix);
    display.innerHTML = '';
  })

  document.querySelector("#evaluate")!.addEventListener("click", () => {
    let expr = null;
    let operation;
    if (document.querySelector<HTMLInputElement>("#tab-add")!.checked) {
      expr = add.evaluate(matrix.getData());
      operation = add.cloneNode();
    } else if (document.querySelector<HTMLInputElement>("#tab-scale")!.checked) {
      expr = scale.evaluate(matrix.getData());
      operation = scale.cloneNode();
    } else if (document.querySelector<HTMLInputElement>("#tab-swap")!.checked) {
      expr = swap.evaluate(matrix.getData());
      operation = swap.cloneNode();
    }
    if (expr === null) return alert("Invalid Data");

    if (!display.hasChildNodes()) {
      display.appendChild(matrix.cloneNode());
    }

    matrix.addUndoAction();
    matrix.setData(expr);

    display.appendChild(operation!);
    display.appendChild(matrix.cloneNode());
  });

  document.querySelector("#export-md")!.addEventListener("click", () => {
    const nodes = display.childNodes;
    let content = "";
    nodes.forEach(node => content += "$$" + (node as MathfieldElement).getValue() + "$$\n\n");
    saveAsMarkdown(content);
  });
  document.querySelector("#export-pdf")!.addEventListener("click", () => {
    saveAsPdf();
  });
})();
