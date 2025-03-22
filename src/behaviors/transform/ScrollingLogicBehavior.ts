import { LogicBehavior } from "sprunk-engine";

/**
 * Scrolling logic behavior for creating horizontal movement effects
 */
export class ScrollingLogicBehavior extends LogicBehavior<void> {
    public scrollSpeed: number;

    private readonly _resetPosition: number;
    private readonly _startPosition: number;
    
    constructor(startPosition: number, resetPosition: number, scrollSpeed: number) {
        super();
        this._startPosition = startPosition;
        this._resetPosition = resetPosition;
        this.scrollSpeed = scrollSpeed;
    }
    
    public tick(deltaTime: number): void {
        // Update texture offset for scrolling effect
        // Note: In a real implementation, we would modify texture coordinates
        // As a simplified version, we're moving the object itself
        this.gameObject.transform.position.x -= this.scrollSpeed * deltaTime;
        
        // Reset position when it has scrolled too far
        if (this.gameObject.transform.position.x < this._resetPosition) {
            this.gameObject.transform.position.x = this._startPosition;
        }
    }
} 