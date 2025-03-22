import {Inject, LogicBehavior} from "sprunk-engine";
import {ScrollingLogicBehavior} from "../transform/ScrollingLogicBehavior.ts";
import {FlappGameManagerLogicBehavior} from "./FlappGameManagerLogicBehavior.ts";

/**
 * A logic behavior that drives the scrolling speed of a ScrollingLogicBehavior
 */
export class ScrollingSpeedManagerDriven extends LogicBehavior<void>{
    @Inject(FlappGameManagerLogicBehavior, true)
    private _gameManager!: FlappGameManagerLogicBehavior;

    //Cannot inject because Typescript inheritance meta does not support it
    private _scrollingLogic: ScrollingLogicBehavior;

    constructor(scrollingLogic: ScrollingLogicBehavior) {
        super();
        this._scrollingLogic = scrollingLogic;
    }

    protected onEnable() {
        super.onEnable();
        this._gameManager.onSpeedChange.addObserver((speed) => {
            this._scrollingLogic.scrollSpeed = speed;
        });
    }
}