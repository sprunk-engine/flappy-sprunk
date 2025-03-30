import {AudioBehavior, Inject} from "sprunk-engine";
import {BirdLogicBehavior} from "../flappybird/BirdLogicBehavior.ts";

export class PlayerSoundOutputBehavior extends AudioBehavior{
    @Inject(BirdLogicBehavior)
    private _logic!: BirdLogicBehavior;

    private readonly _flapSound: string;

    constructor(flapSound: string) {
        super();
        this._flapSound = flapSound;
    }

    protected onEnable() {
        super.onEnable();
        this._logic.onFlap.addObserver(this._playFlap.bind(this));
    }

    private _playFlap(){
        this.reinitialize();
        this.play(this._flapSound);
    }
}