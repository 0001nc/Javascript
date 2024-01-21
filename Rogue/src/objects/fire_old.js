import ImageTile from "../game/imageTile.js";

class Fire_old extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Fire_old.png";
    }
}

export default Fire_old;
