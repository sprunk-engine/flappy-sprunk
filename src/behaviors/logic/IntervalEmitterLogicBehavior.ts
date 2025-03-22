import { LogicBehavior } from "sprunk-engine";

/**
 * Logic behavior that emits events at regular intervals
 */
export class IntervalEmitterLogicBehavior extends LogicBehavior<void> {
    private _timeSinceLastEmit: number = 0;
    private _emitInterval: number;
    private _isActive: boolean = true;
    
    /**
     * Creates a new IntervalEmitterLogicBehavior
     * @param emitInterval The interval in milliseconds between emissions
     */
    constructor(emitInterval: number) {
        super();
        this._emitInterval = emitInterval;
    }
    
    public tick(deltaTime: number): void {
        if (!this._isActive) return;
        
        this._timeSinceLastEmit += deltaTime;
        
        // Emit event at regular intervals
        if (this._timeSinceLastEmit >= this._emitInterval) {
            this.notifyDataChanged();
            this._timeSinceLastEmit = 0;
        }
    }
    
    /**
     * Sets whether the emitter is active
     */
    public setActive(isActive: boolean): void {
        this._isActive = isActive;
    }
    
    /**
     * Gets whether the emitter is active
     */
    public isActive(): boolean {
        return this._isActive;
    }
    
    /**
     * Sets the interval between emissions
     */
    public setInterval(interval: number): void {
        this._emitInterval = interval;
    }
    
    /**
     * Gets the interval between emissions
     */
    public getInterval(): number {
        return this._emitInterval;
    }
} 