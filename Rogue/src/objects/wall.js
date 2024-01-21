import ImageTile from "../game/imageTile.js";

class Wall extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Wall.png";
    }
}

export default Wall;
