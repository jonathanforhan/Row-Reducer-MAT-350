import "./style.css";
import {Matrix} from "./matrix.ts";
import {Add} from "./add.ts";
import {Scale} from "./scale.ts";
import {Swap} from "./swap.ts";

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

  window.addEventListener("load", () => defaultMatrix(matrix));

  document.querySelector("#reset-btn")!.addEventListener("click", () => {
    matrix.clear();
    defaultMatrix(matrix);
  })

  document.querySelector("#evaluate")!.addEventListener("click", () => {
    let expr = null;
    if (document.querySelector<HTMLInputElement>("#tab-add")!.checked) {
      expr = add.evaluate(matrix.getData());
    } else if (document.querySelector<HTMLInputElement>("#tab-scale")!.checked) {
      expr = scale.evaluate(matrix.getData());
    } else if (document.querySelector<HTMLInputElement>("#tab-swap")!.checked) {
      expr = swap.evaluate(matrix.getData());
    }
    if (expr === null) return alert("Invalid Data");

    matrix.addUndoAction();
    matrix.setData(expr);
  });
})();
