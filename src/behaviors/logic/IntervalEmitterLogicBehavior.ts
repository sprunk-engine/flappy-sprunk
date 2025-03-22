import { LogicBehavior } from "sprunk-engine";

/**
 * Logic behavior that emits events at regular intervals
 */
export class IntervalEmitterLogicBehavior extends LogicBehavior<void> {
    protected _timeSinceLastEmit: number = 0;
    protected _emitInterval: number;
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

    public pause(): void {
        this._isActive = false;
    }

    public resume(): void {
        this._isActive = true;
    }

    public changeInterval(interval: number): void {
        this._emitInterval = interval;
    }

    public isPlaying(): boolean {
        return this._isActive;
    }

    public getTimeSinceLastEmit(): number {
        return this._timeSinceLastEmit;
    }
    
    public getCurrentInterval(): number {
        return this._emitInterval;
    }
    
    public setTimeSinceLastEmit(time: number): void {
        this._timeSinceLastEmit = time;
    }
} 