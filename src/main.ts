import "./style.css";
import Matrix from "./matrix.ts";
import { Input } from "./input.ts";

(function main() {
  const matrix = new Matrix();
  const input = new Input();

  window.addEventListener("load", () => {
    matrix.addRow();
    matrix.addRow();
    matrix.addColumn();
    matrix.addColumn();
  })

  document.querySelector("#evaluate")!.addEventListener("click", () => {
    try {
      const data = matrix.getData();
      const operation = input.getOperation();
      let R0 = data[operation.R0 - 1];
      let R1 = data[operation.R1 - 1];

      if (!operation.S0 || !operation.S1) {
        alert("Invalid Input");
        return;
      }

      for (let i = 0; i < R0.length; i++) {
        R0[i] = (+R0[i] * operation.S0 + operation.S1 * +R1[i]).toString();
      }
      data[operation.R0 - 1] = R0;
      matrix.setData(data);
    } catch (e) {
      alert("Invalid Input");
    }
  })
})();
