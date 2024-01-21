
import Position from "../util/position.js";
import Floor from "../objects/floor.js";

let floorTiles = [];                    // FLOOR  ORIGINAL
for(let x = 0; x < 10; x++) {
    for(let y = 0; y < 10; y++) {
        let position = new Position(x, y);
        floorTiles.push(new Floor(position));
    }
}
this.gui.addImages(floorTiles);