import {MathfieldElement} from "mathlive";

declare var mathVirtualKeyboard: any;

export class Input {
  protected _mfe: MathfieldElement;

  constructor(tag: string) {
    this._mfe = document.querySelector<MathfieldElement>(tag)!;
    this._mfe.addEventListener("focus", () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      mathVirtualKeyboard.layouts = ["numeric"];
      mathVirtualKeyboard.visible = isMobile;
    });
  }
}
