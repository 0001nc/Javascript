import ImageTile from "../game/imageTile.js";

class Skeleton extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Skeleton.gif";
    }
}

export default Skeleton;
