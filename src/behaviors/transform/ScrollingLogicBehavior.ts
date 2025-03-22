import { LogicBehavior } from "sprunk-engine";

/**
 * Scrolling logic behavior for creating horizontal movement effects
 */
export class ScrollingLogicBehavior extends LogicBehavior<void> {
    public scrollSpeed: number;
    
    constructor(scrollSpeed: number) {
        super();
        this.scrollSpeed = scrollSpeed;
    }
    
    public tick(deltaTime: number): void {
        // Update texture offset for scrolling effect
        // Note: In a real implementation, we would modify texture coordinates
        // As a simplified version, we're moving the object itself
        this.gameObject.transform.position.x -= this.scrollSpeed * deltaTime;
    }
} 