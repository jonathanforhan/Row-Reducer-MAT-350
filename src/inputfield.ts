import {Mathfield} from "./mathfield.ts";

export abstract class Inputfield extends Mathfield {
  public evaluate?(data: string[][]): string[][] | null;
  protected _operation?(): Object;

  protected constructor(tag: string) {
    super(tag);
  }
}