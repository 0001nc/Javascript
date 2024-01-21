import Vector2d from "./vector2d.js";

class Direction {
    #dir;
    constructor(dir) {
        this.#dir = dir;
    }

    static get UP() { return new Direction("UP"); }
    static get RIGHT() { return new Direction("RIGHT"); }
    static get DOWN() { return new Direction("DOWN"); }
    static get LEFT() { return new Direction("LEFT"); }

    asVector() {
        if(this.#dir === "UP") {
            return new Vector2d(0,-1); // NEW
        }
        if(this.#dir === "RIGHT") {
            return new Vector2d(1, 0);
        }
        if(this.#dir === "DOWN") {
            return new Vector2d(0, 1); // NEW
        }
        if(this.#dir === "LEFT") {
            return new Vector2d(-1, 0); // NEW
        }
    }
}
export default Direction;
