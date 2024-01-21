import ImageTile from "../game/imageTile.js";

class BadGuy extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "BadGuy.gif";
    }
}

export default BadGuy;
