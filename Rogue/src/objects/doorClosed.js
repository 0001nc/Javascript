import ImageTile from "../game/imageTile.js";

class DoorClosed extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "DoorClosed.png";
    }
}

export default DoorClosed;
