import {MathfieldElement} from "mathlive";
import {ComputeEngine} from "@cortex-js/compute-engine";

declare var mathVirtualKeyboard: any;

export class Mathfield {
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
}
