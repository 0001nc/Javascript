import ImageTile from "../game/imageTile.js";

class Trap extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Trap.png";
    }
}

export default Trap;