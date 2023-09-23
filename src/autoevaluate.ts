import { Add } from "./add.ts";
import { Swap } from "./swap.ts";
import { Scale } from "./scale.ts";
import { Matrix } from "./matrix.ts";

export type AutoEvaluation = { data: Matrix["getData"] };

export class AutoEval extends Matrix {
    constructor() {
        super();
    }

    evaluate(matrix: AutoEvaluation["data"]) {
    /*
    Function Name: autoEvaluation
    Parameters: 2D Array called "matrix"
    Name Meaning: Automatic Evaluation
    
    Description:
    
    - Checks pivot locations and performs
    row operation based on pivot locations.
    
    - Outputs what operation was performed.
    
    --------------- DONE ---------------------
    - Needs a new operation tab on the web GUI

    */
    }
}