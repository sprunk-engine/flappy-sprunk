import {Inject, LogicBehavior, OutputBehavior, TextRenderBehavior} from "sprunk-engine";

/**
 * Output behavior that displays the score based on a score logic behavior
 */
export class ScoreOutputBehavior extends OutputBehavior{
    @Inject(TextRenderBehavior)
    private _textRenderer!: TextRenderBehavior;

    private readonly _prefix: string;

    constructor(prefix: string = "Score: ") {
        super();
        this._prefix = prefix;
    }

    protected onEnable() {
        super.onEnable();
        this.observe(LogicBehavior<number>, (score) => {
            this._textRenderer.text = this._prefix + score;
        })
    }
}