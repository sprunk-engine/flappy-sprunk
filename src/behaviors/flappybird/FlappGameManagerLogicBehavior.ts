import {Event, LogicBehavior} from "sprunk-engine";
import {GameState} from "../../models/GameState.ts";
import {ScoreLogicBehavior} from "../logic/ScoreLogicBehavior.ts";

/**
 * Game manager logic behavior
 * Responsible for managing the state of the game (start, in game, game over)
 * and delegating score additions
 */
export class FlappGameManagerLogicBehavior extends LogicBehavior<void> {
    public onGameStateChange: Event<GameState> = new Event();

    private _gameState: GameState = GameState.START;
    private _scoreManager: ScoreLogicBehavior | null = null;
    
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
     * Check if the game is in progress
     */
    public isGamePlaying(): boolean {
        return this._gameState === GameState.PLAYING;
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