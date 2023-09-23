import { Add } from "./add.ts";
import { Swap } from "./swap.ts";
import { Scale } from "./scale.ts";
import { Matrix } from "./matrix.ts";

export type AutoEvaluation = { data: Matrix["_data"] };

export class AutoEval extends Matrix {
    constructor() {
        super();
        
    }

    autoEvaluation(matrix: AutoEval) {
    /*
    Function Name: autoEvaluation
    Parameters: 2D Array called "matrix"
    Name Meaning: Automatic Evaluation
    
    Description:
    
    - Checks pivot locations and performs
    row operation based on pivot locations.
    
    - Needs a new operation tab on the web GUI
    
    - Outputs what operation was performed.
    
    - Undo button functionality should still operate
    so that end-user can go back and forth and inspect the work.
    */
    }
}