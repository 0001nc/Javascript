import ImageTile from "../game/imageTile.js";

class Black extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Black.png";
    }
}

export default Black;
