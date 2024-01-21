import ImageTile from "../game/imageTile.js";

class Red extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Red.png";
    }
}

export default Red;
