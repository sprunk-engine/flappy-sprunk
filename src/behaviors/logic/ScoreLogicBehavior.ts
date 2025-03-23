import { LogicBehavior } from "sprunk-engine";

/**
 * Score manager logic
 */
export class ScoreLogicBehavior extends LogicBehavior<number> {
    constructor() {
        super();
        this.data = 0
        this.notifyDataChanged();
    }
    
    /**
     * Increase the score by 1
     */
    public increaseScore(): void {
        this.data += 1;
        this.notifyDataChanged();
    }

    /**
     * Reset the score to 0
     */
    public resetScore(): void {
        this.data = 0;
        this.notifyDataChanged();
    }
} 