import ImageTile from "../game/imageTile.js";

class RedGreen extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "RedGreen.png";
    }
}

export default RedGreen;
