import {Event, LogicBehavior, Transform} from "sprunk-engine";
import {GameState} from "../../models/GameState.ts";
import {ScoreLogicBehavior} from "../logic/ScoreLogicBehavior.ts";

/**
 * Game manager logic behavior
 * Responsible for managing the state of the game (start, in game, game over)
 * and delegating score additions
 */
export class FlappGameManagerLogicBehavior extends LogicBehavior<void> {
    public onGameStateChange: Event<GameState> = new Event();
    public onSpeedChange: Event<number> = new Event();

    private _gameState: GameState = GameState.START;
    private _scoreManager: ScoreLogicBehavior | null = null;
    private _birdTransform: Transform | null = null;
    private _gameSpeed: number = 5.0;
    
    constructor(scoreManager: ScoreLogicBehavior) {
        super();
        this._scoreManager = scoreManager;
    }

    /**
     * Call when the bird wants to flap.
     * Try to change the game state to perform the appropriate action.
     */
    public wantToFlap(): void {
        if(this._gameState !== GameState.PLAYING) {
            this.startGame();
        }
    }

    /**
     * Increase the score
     */
    public increaseScore(): void {
        if (this._gameState === GameState.PLAYING && this._scoreManager) {
            this._scoreManager.increaseScore();
        }
    }

    /**
     * Get the current game state
     */
    public getGameState(): GameState {
        return this._gameState;
    }

    /**
     * Get the bird transform
     */
    public get birdTransform(): Transform | null {
        return this._birdTransform;
    }

    /**
     * Set the bird transform
     * @param value
     */
    public set birdTransform(value: Transform | null) {
        this._birdTransform = value;
    }

    /**
     * Check if the game is in progress
     */
    public isGamePlaying(): boolean {
        return this._gameState === GameState.PLAYING;
    }

    /**
     * Get the current game speed
     */
    public getGameSpeed(): number {
        return this._gameState === GameState.PLAYING ? this._gameSpeed : 0;
    }

    /**
     * Set the game speed
     * @param speed The new game speed
     */
    public setGameSpeed(speed: number): void {
        this._gameSpeed = speed;
    }

    /**
     * Start the game
     */
    private startGame(): void {
        if (this._gameState === GameState.START || this._gameState === GameState.GAMEOVER) {
            this.changeGameState(GameState.PLAYING);
        }
    }
    
    /**
     * End the game and show game over
     */
    public gameOver(): void {
        if (this._gameState === GameState.PLAYING) {
            this.changeGameState(GameState.GAMEOVER);
        }
    }

    private changeGameState(newState: GameState): void {
        this._gameState = newState;
        this.onGameStateChange.emit(newState);
    }
} 