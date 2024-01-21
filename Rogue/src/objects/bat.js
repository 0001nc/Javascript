import ImageTile from "../game/imageTile.js";

class Bat extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Bat.gif";
    }
}

export default Bat;
