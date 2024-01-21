import ImageTile from "../game/imageTile.js";

class Hammer extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Hammer.png";
    }
}

export default Hammer;
