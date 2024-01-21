import ImageTile from "../game/imageTile.js";

class Grass extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Grass.png";
    }
}

export default Grass;
