import {AudioBehavior, Inject} from "sprunk-engine";
import {ScoreLogicBehavior} from "../logic/ScoreLogicBehavior.ts";

export class ScoreSoundOutputBehavior extends AudioBehavior{
    @Inject(ScoreLogicBehavior)
    private _scoreLogic!: ScoreLogicBehavior;

    private readonly _sound: string;

    constructor(sound: string){
        super();
        this._sound = sound;
    }

    protected onEnable() {
        super.onEnable();
        this._scoreLogic.onDataChanged.addObserver(this._playSound.bind(this));
    }

    private _playSound(score : number){
        if(score == 0) return;
        this.reinitialize();
        this.play(this._sound);
    }
}