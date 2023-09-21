import "./style.css";
import Matrix from "./matrix.ts";
import { Add } from "./add.ts";
import {Scale} from "./scale.ts";
import {Swap} from "./swap.ts";

const matrix = new Matrix();
const add = new Add();
const scale = new Scale();
const swap = new Swap();

function evaluateAdd() {
  try {
    const data = matrix.getData();
    const operation = add.getOperation();
    let R0 = data[operation.R0 - 1];
    let R1 = data[operation.R1 - 1];

    if (operation.S0 === null || operation.S1 === null) {
      return alert("Invalid Input");
    }

    for (let i = 0; i < R0.length; i++) {
      R0[i] = (+R0[i] * operation.S0 + operation.S1 * +R1[i]).toString();
    }
    data[operation.R0 - 1] = R0;
    matrix.setData(data);
  } catch (e) {
    alert("Invalid Input");
  }
}

function evaluateScale() {
  try {
    const data = matrix.getData();
    const operation = scale.getOperation();
    let R0 = data[operation.R0 - 1];

    if (operation.S0 === null) {
      return alert("Invalid Input");
    }

    for (let i = 0; i < R0.length; i++) {
      R0[i] = (+R0[i] * operation.S0).toString();
    }

    data[operation.R0 - 1] = R0;
    matrix.setData(data);
  } catch (e) {
    alert("Invalid Input");
  }
}

function evaluateSwap() {
  try {
    let data = matrix.getData();
    const operation = swap.getOperation();

    let R0 = data[operation.R0 - 1];
    let R1 = data[operation.R1 - 1];

    for (let i = 0; i < R0.length; i++) {
      [R0[i], R1[i]] = [(+R1[i]).toString(), (+R0[i]).toString()];
    }
    data[operation.R0 - 1] = R0;
    data[operation.R1 - 1] = R1;

    matrix.setData(data);
  } catch (e) {
    alert("Invalid Input");
  }
}

(function main() {

  window.addEventListener("load", () => {
    matrix.addRow();
    matrix.addRow();
    matrix.addColumn();
    matrix.addColumn();
  })

  document.querySelector("#evaluate")!.addEventListener("click", () => {
    if (document.querySelector<HTMLInputElement>("#tab-add")!.checked) {
      evaluateAdd();
    } else if (document.querySelector<HTMLInputElement>("#tab-scale")!.checked) {
      evaluateScale();
    } else if (document.querySelector<HTMLInputElement>("#tab-swap")!.checked) {
      evaluateSwap();
    }
  });
})();
