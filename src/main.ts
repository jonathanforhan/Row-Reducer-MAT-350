import "./style.css";
import {Matrix} from "./matrix.ts";
import {Add} from "./add.ts";
import {Scale} from "./scale.ts";
import {Swap} from "./swap.ts";

(function main() {
  const matrix = new Matrix();
  const [add ,scale, swap] = [new Add(), new Scale(), new Swap()];
  let undoTree: string[] = [];

  window.addEventListener("load", () => {
    matrix.addRow();
    matrix.addRow();
    matrix.addColumn();
    matrix.addColumn();
    matrix.addColumn();
  })

  document.querySelector("#undo-btn")!.addEventListener("click", () => {
    const undoAction = undoTree.pop();
    if (undoAction) {
      matrix.setData(JSON.parse(undoAction));
    }
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

    undoTree.push(JSON.stringify(matrix.getData()));
    if (undoTree.length > 256) {
      undoTree.shift();
    }
    matrix.setData(expr);
  });
})();
