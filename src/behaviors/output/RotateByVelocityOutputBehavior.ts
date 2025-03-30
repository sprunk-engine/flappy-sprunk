import {OutputBehavior, Rigidbody, Vector3} from "sprunk-engine";

/**
 * Rotates the object based on the velocity of the rigidbody
 */
export class RotateByVelocityOutputBehavior extends OutputBehavior{
    public rigidbody: Rigidbody | null = null;

    private readonly _axis: Vector3;
    private readonly _velocityMultiplier: number;
    private readonly _maxAngle: number;

    constructor(axis: Vector3, velocityMultiplier: number, maxAngle: number) {
        super();
        this._axis = axis;
        this._velocityMultiplier = velocityMultiplier;
        this._maxAngle = maxAngle;
    }

    tick(deltaTime: number) {
        super.tick(deltaTime);
        if (!this.rigidbody) return;
        const velocitySpeed = this.rigidbody.linearVelocity.y;
        let angle = velocitySpeed * this._velocityMultiplier;
        angle = Math.min(angle, this._maxAngle);
        angle = Math.max(angle, -this._maxAngle);
        this.transform.rotation.setFromVectorEulerAngles(this._axis.clone().scale(angle));
    }
}