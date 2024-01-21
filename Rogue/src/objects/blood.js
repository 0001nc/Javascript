import ImageTile from "../game/imageTile.js";

class Blood extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Blood.gif";
    }
}

export default Blood;
