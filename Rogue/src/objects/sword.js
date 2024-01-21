import ImageTile from "../game/imageTile.js";

class Sword extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Sword.png";
    }
}

export default Sword;
