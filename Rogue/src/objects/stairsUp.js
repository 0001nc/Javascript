import ImageTile from "../game/imageTile.js";

class StairsUp extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "StairsUp.png";
    }
}

export default StairsUp;
