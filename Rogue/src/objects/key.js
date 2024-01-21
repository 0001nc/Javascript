import ImageTile from "../game/imageTile.js";

class Key extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Key.png";
    }
}

export default Key;
