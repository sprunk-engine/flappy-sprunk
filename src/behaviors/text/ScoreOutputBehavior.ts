import {Inject, LogicBehavior, OutputBehavior, TextRenderBehavior} from "sprunk-engine";
import {ScoreLogicBehavior} from "../logic/ScoreLogicBehavior.ts";

/**
 * Output behavior that displays the score based on a score logic behavior
 */
export class ScoreOutputBehavior extends OutputBehavior{
    @Inject(ScoreLogicBehavior.name)
    private _scoreLogic!: LogicBehavior<number>;
    @Inject(TextRenderBehavior)
    private _textRenderer!: TextRenderBehavior;

    private readonly _prefix: string;

    constructor(prefix: string = "Score: ") {
        super();
        this._prefix = prefix;
    }

    protected onEnable() {
        super.onEnable();
        this._scoreLogic.onDataChanged.addObserver((score) => {
            this._textRenderer.text = this._prefix + score;
        });
    }
}