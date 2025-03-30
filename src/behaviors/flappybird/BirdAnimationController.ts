import {GameObject, Inject, LogicBehavior, SpriteRenderBehavior} from "sprunk-engine";
import {FlappGameManagerLogicBehavior} from "./FlappGameManagerLogicBehavior.ts";
import {IntervalEmitterLogicBehavior} from "../logic/IntervalEmitterLogicBehavior.ts";
import {SpriteAnimationBehavior} from "../logic/SpriteAnimationBehavior.ts";
import {GameState} from "../../models/GameState.ts";

export class BirdAnimationController extends LogicBehavior<void>{
    @Inject(FlappGameManagerLogicBehavior, true)
    private _gameManager!: FlappGameManagerLogicBehavior;

    @Inject(IntervalEmitterLogicBehavior)
    private _animationEmitter!: IntervalEmitterLogicBehavior;

    @Inject(SpriteAnimationBehavior)
    private _spriteAnimation!: SpriteAnimationBehavior;

    private _frameIndex: number = 0;
    private _deathFrame: GameObject | null = null;
    private _deadSpriteUrl: RequestInfo | URL;

    constructor(deadSpriteUrl: RequestInfo | URL) {
        super();
        this._deadSpriteUrl = deadSpriteUrl;
    }

    protected onEnable() {
        super.onEnable();
        this._animationEmitter.onDataChanged.addObserver(() => {
            if (!this._gameManager.isGamePlaying()) return;
            this._animate();
        });

        this._gameManager.onGameStateChange.addObserver(this._changeState.bind(this));

        this._deathFrame = new GameObject("DeathFrame");
        this.gameObject.addChild(this._deathFrame);
        this._deathFrame.addBehavior(new SpriteRenderBehavior(this._deadSpriteUrl, { minFilter: "nearest" }));
        this._hideDeathFrame();

        this._spriteAnimation.showFrame(0);
        this._animationEmitter.pause();
    }

    protected onDisable() {
        super.onDisable();
        if (this._deathFrame)
            this._deathFrame.destroy();
    }

    private _animate(): void {
        this._frameIndex = (this._frameIndex + 1) % this._spriteAnimation.totalFrames;
        this._spriteAnimation.showFrame(this._frameIndex);
    }

    private _changeState(state: GameState): void {
        if (state === GameState.PLAYING) {
            this._animationEmitter.resume();
            this._spriteAnimation.showFrame(0);
            this._hideDeathFrame()
        } else {
            this._animationEmitter.pause();
            this._spriteAnimation.hideAll();
            this._showDeathFrame();
        }
    }

    private _showDeathFrame(): void {
        if (this._deathFrame)
            this._deathFrame.transform.scale.set(1, 1, 1);
    }

    private _hideDeathFrame(): void {
        if (this._deathFrame)
            this._deathFrame.transform.scale.set(0, 0, 0);
    }
}