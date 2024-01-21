import ImageTile from "../game/imageTile.js";

class Hero extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Hero.png";
    }
}

export default Hero;
