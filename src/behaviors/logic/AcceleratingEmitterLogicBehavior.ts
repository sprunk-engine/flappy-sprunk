import { IntervalEmitterLogicBehavior } from "./IntervalEmitterLogicBehavior";

/**
 * Logic behavior that emits events at intervals that get progressively shorter
 */
export class AcceleratingEmitterLogicBehavior extends IntervalEmitterLogicBehavior {
    private _initialInterval: number;
    private _accelerationFactor: number;
    private _minInterval: number;
    
    /**
     * Creates a new AcceleratingEmitterLogicBehavior
     * @param initialInterval The starting interval in milliseconds between emissions
     * @param accelerationFactor The factor by which to decrease the interval after each emission (0.9 = 90% of previous interval)
     * @param minInterval The minimum interval allowed (to prevent too rapid emissions)
     */
    constructor(initialInterval: number = 1, accelerationFactor: number = 0.9, minInterval: number = 0.1) {
        super(initialInterval);
        this._initialInterval = initialInterval;
        this._accelerationFactor = accelerationFactor;
        this._minInterval = minInterval;
    }
    
    public override tick(deltaTime: number): void {
        if (!this.isPlaying()) return;
        
        let currentInterval = this.getCurrentInterval();
        let timeSinceLastEmit = this._getTimeSinceLastEmit() + deltaTime;
        
        // If it's time to emit
        if (timeSinceLastEmit >= currentInterval) {
            // Accelerate by reducing the interval
            let newInterval = Math.max(currentInterval * this._accelerationFactor, this._minInterval);
            this.changeInterval(newInterval);
            
            // Reset timer and emit
            this._setTimeSinceLastEmit(0);
            this.notifyDataChanged();
        } else {
            // Update time without emitting
            this._setTimeSinceLastEmit(timeSinceLastEmit);
        }
    }
    
    /**
     * Resets the interval to the initial value
     */
    public resetAcceleration(): void {
        this.changeInterval(this._initialInterval);
    }
    
    /**
     * Gets the current interval value
     */
    public getCurrentInterval(): number {
        // This assumes IntervalEmitterLogicBehavior has a way to get the current interval
        // We'll need to access the protected member directly or add a getter
        return this._getEmitInterval();
    }
    
    /**
     * These methods access the protected/private members of the parent class
     * You may need to modify the parent class to expose these values
     */
    private _getTimeSinceLastEmit(): number {
        // This would need to access the parent's _timeSinceLastEmit
        return (this as any)._timeSinceLastEmit;
    }
    
    private _setTimeSinceLastEmit(value: number): void {
        (this as any)._timeSinceLastEmit = value;
    }
    
    private _getEmitInterval(): number {
        return (this as any)._emitInterval;
    }
} 