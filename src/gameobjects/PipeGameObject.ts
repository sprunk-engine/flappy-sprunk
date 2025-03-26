import { GameObject, SpriteRenderBehavior, PolygonCollider, Vector2, Color } from "sprunk-engine";
import { PipeLogicBehavior } from "../behaviors/flappybird/PipeLogicBehavior";
import { ScrollingSpeedManagerDriven } from "../behaviors/flappybird/ScrollingSpeedManagerDriven";
import { PolygonRenderDebugger } from "../../.lib.example/PolygonRenderDebugger.ts";
/**
 * Represents a single pipe obstacle in Flappy Bird
 */
export class PipeGameObject extends GameObject {
    private _isTopPipe: boolean;
    private _height: number;
    private _collider: PolygonCollider | null = null;
    private static readonly PIPE_WIDTH = 1.0; // Width of the pipe
    private static readonly GAP_SIZE = 3.0;   // Size of the gap between pipes

    /**
     * Create a new pipe
     * @param name The name of the pipe
     * @param isTopPipe Whether this is a top pipe (ceiling) or bottom pipe (floor)
     * @param height The height of the pipe
     */
    constructor(name: string, isTopPipe: boolean, height: number) {
        super(name);
        this._isTopPipe = isTopPipe;
        this._height = height;
    }

    protected onEnable() {
        super.onEnable();

        // Create pipe collider - adjust vertices to create proper gap
        const halfWidth = PipeGameObject.PIPE_WIDTH / 2;
        let pipeVertices: Vector2[];

        // Create vertices relative to pipe's height
        if (this._isTopPipe) {
            pipeVertices = [
                new Vector2(halfWidth, this._height/2),    // Top right
                new Vector2(halfWidth, -this._height/2),   // Bottom right
                new Vector2(-halfWidth, -this._height/2),  // Bottom left
                new Vector2(-halfWidth, this._height/2),   // Top left
            ];
            // Position the pipe above the gap
            this.transform.position.set(
                this.transform.position.x, 
                this._height/2 + PipeGameObject.GAP_SIZE/2, 
                0
            );
        } else {
            pipeVertices = [
                new Vector2(halfWidth, this._height/2),    // Top right
                new Vector2(halfWidth, -this._height/2),   // Bottom right
                new Vector2(-halfWidth, -this._height/2),  // Bottom left
                new Vector2(-halfWidth, this._height/2),   // Top left
            ];
            // Position the pipe below the gap
            this.transform.position.set(
                this.transform.position.x, 
                -this._height/2 - PipeGameObject.GAP_SIZE/2, 
                0
            );
        }
        
        this._collider = new PolygonCollider(pipeVertices);
        this.addBehavior(this._collider);
        
        // Add collision debug visualization
        const debugVisual = new PolygonRenderDebugger(this._collider, Color.random(0.2));
        this.addBehavior(debugVisual);

        // Add pipe sprite
        this.addBehavior(
            new SpriteRenderBehavior("/assets/sprites/pipe-green.png")
        );

        // Position and scale the pipe
        this.transform.scale.set(1, 1, 1); // Remove height scaling since it's in vertices
        
        // Flip top pipe by rotating 180 degrees
        if (this._isTopPipe) {
            this.transform.rotation.setFromEulerAngles(0, 0, Math.PI);
        }

        // Add pipe logic
        const scrollingLogic = new PipeLogicBehavior(0, this._isTopPipe);
        this.addBehavior(scrollingLogic);
        this.addBehavior(new ScrollingSpeedManagerDriven(scrollingLogic));
    }
} 