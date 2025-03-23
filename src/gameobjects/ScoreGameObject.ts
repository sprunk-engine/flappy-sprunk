import { GameObject, TextRenderBehavior } from "sprunk-engine";
import { ScoreLogicBehavior } from "../behaviors/logic/ScoreLogicBehavior.ts";
import {ScoreOutputBehavior} from "../behaviors/text/ScoreOutputBehavior.ts";

/**
 * Game object that manages and displays the score
 */
export class ScoreGameObject extends GameObject {
    private _scoreLogic!: ScoreLogicBehavior;
    
    protected onEnable() {
        super.onEnable();
        
        // Add text renderer for score
        const textRenderer = new TextRenderBehavior(
            "assets/fonts/Sprunthrax/Sprunthrax-SemiBold-msdf.json", 
            { centered: true, pixelScale: 1/64, color: [1, 1, 1, 1] }
        );
        textRenderer.text = "Score: 0";
        this.addBehavior(textRenderer);
        
        // Add score logic
        this._scoreLogic = new ScoreLogicBehavior();
        this.addBehavior(this._scoreLogic);

        // Add score output behavior
        this.addBehavior(new ScoreOutputBehavior());
    }

    /**
     * The main logic behavior of this gameobject
     */
    public getLogic(){
        return this._scoreLogic;
    }
} 