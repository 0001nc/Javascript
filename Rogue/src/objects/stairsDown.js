import ImageTile from "../game/imageTile.js";

class StairsDown extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "StairsDown.png";
    }
}

export default StairsDown;
