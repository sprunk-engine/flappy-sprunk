import {GameObject, LogicBehavior, SpriteRenderBehavior} from "sprunk-engine";

/**
 * A behavior that animates a sprite by changing the sprite image based on the frame number
 */
export class SpriteAnimationBehavior extends LogicBehavior<number>{
    /**
     * The total number of frames in the animation
     */
    public get totalFrames() {
        return this._spriteImages.length;
    }

    private _spriteImages: (RequestInfo | URL)[];
    private _spriteObjects: GameObject[] = [];

    constructor(spriteImagesUrl: (RequestInfo | URL)[]) {
        super();
        this._spriteImages = spriteImagesUrl;
    }

    protected onEnable() {
        super.onEnable();
        this._spriteObjects = this._spriteImages.map((url) => {
            const go = new GameObject();
            this.gameObject.addChild(go);
            const renderBehavior = new SpriteRenderBehavior(url, { minFilter: "nearest" });
            go.addBehavior(renderBehavior);
            go.transform.scale.set(0,0,0);
            return go;
        });
    }

    public showFrame(frame: number) {
        this._spriteObjects.forEach((go, index) => {
            go.transform.scale.set(0,0,0);
            if (index === frame) {
                go.transform.scale.set(1,1,1);
            }
        });
    }

    public hideAll() {
        this._spriteObjects.forEach((go) => {
            go.transform.scale.set(0,0,0);
        });
    }
}