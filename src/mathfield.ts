import {MathfieldElement} from "mathlive";
import {ComputeEngine} from "@cortex-js/compute-engine";

declare var mathVirtualKeyboard: any;

export default class Mathfield {
  protected _mfe: MathfieldElement;
  protected _ce: ComputeEngine;

  constructor(tag: string) {
    this._mfe = document.querySelector<MathfieldElement>(tag)!;
    this._mfe.addEventListener("focus", () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      mathVirtualKeyboard.layouts = ["numeric"];
      mathVirtualKeyboard.visible = isMobile;
    });

    this._ce = new ComputeEngine();
    this._ce.latexOptions.precision = 6;
  }

  protected _placeholder(prompt: string, value?: string): string {
    return `{\\placeholder[${prompt}]{${value || ""}}}`;
  }

  public cloneNode(): MathfieldElement {
    const clone = this._mfe.cloneNode(true) as MathfieldElement;
    clone.setValue(this._mfe.getValue().replace(/\{\\placeholder\[.*?]\{(.*?)}}/g, `$1`));
    clone.style.setProperty("font-size", "1.5rem");
    const container = document.createElement("div").appendChild(clone);
    container.style.setProperty("display", "flex");
    container.style.setProperty("justify-content", "center");
    container.style.setProperty("margin-bottom", "1em");
    return container;
  }
}
