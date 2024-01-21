import ImageTile from "../game/imageTile.js";

class DoorWay extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "DoorWay.png";
    }
}

export default DoorWay;
