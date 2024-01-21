import ImageTile from "../game/imageTile.js";

class Thief extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Thief.gif";
    }
}

export default Thief;