import ImageTile from "../game/imageTile.js";

class Green extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Green.png";
    }
}

export default Green;
