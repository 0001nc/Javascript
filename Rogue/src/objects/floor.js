import ImageTile from "../game/imageTile.js";

class Floor extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Floor.png";
    }
}

export default Floor;
