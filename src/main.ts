import { GameEngineWindow, Sprunk } from "sprunk-engine";
import { FlappyBirdScene } from "./gameobjects/scenes/FlappyBirdScene.ts";

const canvas: HTMLCanvasElement =
    document.querySelector<HTMLCanvasElement>("#app")!;

const debug = true;

const gameEngineWindow: GameEngineWindow = Sprunk.newGame(canvas, debug, [
    "InputGameEngineComponent",
    "RenderGameEngineComponent",
    "PhysicsGameEngineComponent"
]);

const startScene = new FlappyBirdScene();
gameEngineWindow.root.addChild(startScene);