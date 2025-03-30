import {AudioBehavior, Inject} from "sprunk-engine";
import {FlappGameManagerLogicBehavior} from "../flappybird/FlappGameManagerLogicBehavior.ts";
import {GameState} from "../../models/GameState.ts";

export class GameOverSoundOutputBehavior extends AudioBehavior{
    @Inject(FlappGameManagerLogicBehavior, true)
    private _gameManager!: FlappGameManagerLogicBehavior;

    private readonly _hitSound: string

    constructor(hitSound: string) {
        super();
        this._hitSound = hitSound;
    }

    protected onEnable() {
        super.onEnable();

        this._gameManager.onGameStateChange.addObserver((state) => {
            if (state === GameState.GAMEOVER) {
                this._playHit();
            }
        });
    }

    public _playHit(){
        this.reinitialize();
        this.play(this._hitSound);
    }
}