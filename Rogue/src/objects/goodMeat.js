import ImageTile from "../game/imageTile.js";

class GoodMeat extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "GoodMeat.png";
    }
}

export default GoodMeat;
