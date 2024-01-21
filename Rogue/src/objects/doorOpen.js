import ImageTile from "../game/imageTile.js";

class DoorOpen extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "DoorOpen.png";
    }
}

export default DoorOpen;
