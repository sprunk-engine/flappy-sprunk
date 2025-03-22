import {ScrollingLogicBehavior} from "./ScrollingLogicBehavior.ts";

/**
 * Scrolling logic behavior for creating horizontal movement effects
 */
export class RepeatableScrollingLogicBehavior extends ScrollingLogicBehavior {
    private readonly _resetPosition: number;
    private readonly _startPosition: number;
    
    constructor(startPosition: number, resetPosition: number, scrollSpeed: number) {
        super(scrollSpeed);
        this._startPosition = startPosition;
        this._resetPosition = resetPosition;
    }
    
    public tick(deltaTime: number): void {
        super.tick(deltaTime);
        // Reset position when it has scrolled too far
        if (this.gameObject.transform.position.x < this._resetPosition) {
            this.gameObject.transform.position.x = this._startPosition;
        }
    }
} 