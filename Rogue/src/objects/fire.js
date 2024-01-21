import ImageTile from "../game/imageTile.js";

class Fire extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Fire.gif";
    }
}

export default Fire;
