import { Camera, GameObject, TextRenderBehavior, PolygonCollider, Vector2 } from "sprunk-engine";
import { BirdGameObject } from "../BirdGameObject.ts";
import { PipeSpawnerGameObject } from "../PipeSpawnerGameObject.ts";
import { GroundGameObject } from "../GroundGameObject.ts";
import { ScoreGameObject } from "../ScoreGameObject.ts";
import { FlappGameManagerLogicBehavior } from "../../behaviors/flappybird/FlappGameManagerLogicBehavior.ts";
import { GameState } from "../../models/GameState.ts";

export class FlappyBirdScene extends GameObject {
    private _bird: BirdGameObject | null = null;
    private _gameManager: FlappGameManagerLogicBehavior | null = null;
    private _startTexts: GameObject | null = null;
    private _gameOverText: GameObject | null = null;
    
    private static readonly BOUNDARY_WIDTH = 30; // Width of the boundary walls
    private static readonly BOUNDARY_HEIGHT = 1; // Height of the boundary colliders
    private static readonly GAME_HEIGHT = 4.35;    // Distance from center to top/bottom
    private static readonly GAME_OFFSET = 0.3;    // Distance from center to top/bottom

    protected onEnable() {
        super.onEnable();

        /* --- Add Boundary Colliders --- */
        this.createBoundary("TopBoundary", FlappyBirdScene.GAME_HEIGHT + FlappyBirdScene.GAME_OFFSET);
        this.createBoundary("BottomBoundary", -FlappyBirdScene.GAME_HEIGHT + FlappyBirdScene.GAME_OFFSET);

        /* --- Camera --- */
        const cameraGo = new GameObject("Camera");
        this.addChild(cameraGo);
        cameraGo.addBehavior(new Camera());
        cameraGo.transform.position.set(0, 0, 10);
        //cameraGo.addBehavior(new FreeLookCameraController());
        //cameraGo.addBehavior(new FreeLookCameraKeyboardMouseInput());

        /* --- Score Manager --- */
        const scoremanager = new ScoreGameObject("ScoreManager");
        this.addChild(scoremanager);
        scoremanager.transform.position.set(0, 3, 0);

        /* --- Game Manager --- */
        this._gameManager = new FlappGameManagerLogicBehavior(scoremanager.getLogic());
        this._gameManager.onGameStateChange.addObserver(this.onGameStateChange.bind(this));
        this.addBehavior(this._gameManager);

        /* --- Bird --- */
        this._bird = new BirdGameObject("Bird");
        this.addChild(this._bird);

        /* --- Ground --- */
        for (let i = 0; i < 6; i++) {
            const ground = new GroundGameObject(6);
            this.addChild(ground);
            ground.transform.position.set(i *  10 - 3 * 10 , -4, 0);
        }

        /* --- Pipe Spawner --- */
        const pipeSpawner = new PipeSpawnerGameObject("PipeSpawner");
        this.addChild(pipeSpawner);

        /* --- Game Title --- */
        this._startTexts = new GameObject("StartTexts");
        this.addChild(this._startTexts);

        const titleGo = new GameObject("Title");
        this._startTexts.addChild(titleGo);
        titleGo.transform.position.set(0, 2, 0);

        const titleText = new TextRenderBehavior(
            "assets/fonts/Sprunthrax/Sprunthrax-SemiBold-msdf.json",
            { centered: true, pixelScale: 1/64, color: [1, 0.8, 0, 1] }
        );
        titleGo.addBehavior(titleText);
        titleText.text = "FLAPPY SPRUNK";

        /* --- Instructions --- */
        const instructionsGo = new GameObject("Instructions");
        this._startTexts.addChild(instructionsGo);
        instructionsGo.transform.position.set(0, 0, 0);

        const instructionsText = new TextRenderBehavior(
            "assets/fonts/Sprunthrax/Sprunthrax-SemiBold-msdf.json",
            { centered: true, pixelScale: 1/128, color: [1, 1, 1, 1] }
        );
        instructionsGo.addBehavior(instructionsText);
        instructionsText.text = "Press SPACE to flap!";

        this.resetPositions();
    }

    private onGameStateChange(state: GameState): void {
        if (state === GameState.PLAYING) {
            this.resetPositions();
            this._startTexts?.destroy();
            this._gameOverText?.destroy();
        }
        if (state === GameState.GAMEOVER) {
            this.showGameOver();
        }
    }

    /**
     * Ends the game and displays game over message
     */
    private showGameOver(): void {
        this._gameOverText = new GameObject("GameOverText");
        this.addChild(this._gameOverText);

        /* --- Game Over Text --- */
        const gameOverGo = new GameObject("GameOver");
        this._gameOverText.addChild(gameOverGo);
        gameOverGo.transform.position.set(0, 1, 1); // Display in front
        
        const gameOverText = new TextRenderBehavior(
            "assets/fonts/Sprunthrax/Sprunthrax-SemiBold-msdf.json", 
            { centered: true, pixelScale: 1/64, color: [1, 0, 0, 1] }
        );
        gameOverGo.addBehavior(gameOverText);
        gameOverText.text = "GAME OVER";

        /* --- Flap to restart text --- */
        const restartGo = new GameObject("Restart");
        this._gameOverText.addChild(restartGo);
        restartGo.transform.position.set(0, 0, 1); // Display in front

        const restartText = new TextRenderBehavior(
            "assets/fonts/Sprunthrax/Sprunthrax-SemiBold-msdf.json",
            { centered: true, pixelScale: 1/128, color: [1, 1, 1, 1] }
        );
        restartText.text = "Flap to restart";
        restartGo.addBehavior(restartText);
    }

    private resetPositions(): void {
        this._bird?.transform.position.set(-3, 0, 0);
    }

    /**
     * Creates a boundary collider at the specified Y position
     */
    private createBoundary(name: string, yPosition: number): void {
        const boundary = new GameObject(name);
        this.addChild(boundary);

        // Create wide but thin collider
        const boundaryVertices = [
            new Vector2(FlappyBirdScene.BOUNDARY_WIDTH/2, FlappyBirdScene.BOUNDARY_HEIGHT/2),
            new Vector2(FlappyBirdScene.BOUNDARY_WIDTH/2, -FlappyBirdScene.BOUNDARY_HEIGHT/2),
            new Vector2(-FlappyBirdScene.BOUNDARY_WIDTH/2, -FlappyBirdScene.BOUNDARY_HEIGHT/2),
            new Vector2(-FlappyBirdScene.BOUNDARY_WIDTH/2, FlappyBirdScene.BOUNDARY_HEIGHT/2),
        ];

        const collider = new PolygonCollider(boundaryVertices);
        boundary.addBehavior(collider);

        // Position the boundary
        boundary.transform.position.set(0, yPosition, 0);
    }
} 