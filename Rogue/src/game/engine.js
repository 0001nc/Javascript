// ENGINE
import Interface from "./interface.js";
import Position from "../util/position.js";
import Direction from "../util/direction.js";
import Move from "../util/move.js";
import FireTile from "./firetile.js";

// ELEMENTS
import Floor from "../objects/floor.js";
import Wall from "../objects/wall.js";
import Hero from "../objects/hero.js";
import Skeleton from "../objects/skeleton.js";
import DoorWay from "../objects/doorWay.js";
import Bat from "../objects/bat.js";
import key from "../objects/key.js";
import DoorClosed from "../objects/doorClosed.js";
import DoorOpen from "../objects/doorOpen.js";
import BadGuy from "../objects/badGuy.js";
import GoodMeat from "../objects/goodMeat.js";
import Hammer from "../objects/hammer.js";
import Grass from "../objects/grass.js";
import RoomManager from "../util/roomManager.js";
import Fire from "../objects/fire.js";
import Black from "../objects/black.js";
import Green from "../objects/green.js";
import EnemyMove from "../util/enemyMove.js";
import RedGreen from "../objects/redGreen.js";
import Red from "../objects/red.js";
import Blood from "../objects/blood.js";
import Key from "../objects/key.js";

class Engine {
    gui = Interface.getInstance();
    move = new Move();
    enemyMove = new EnemyMove();
    roomManager = new RoomManager();
    boardTiles;
    floorTiles;
    statusBlackTiles;
    statusTiles;

    init() {


    //let fireball = new FireBall(new Position(5, 3), Direction.RIGHT);
    //this.gui.addImage(fireball);
    //fireball.start();
        this.startGame();
        this.gui.start();
    }


    keyPressed(key) {
        let newPosition;
        let hero = this.move.getHero();
        if(key === "w" || key === "ArrowUp") {
            newPosition = this.move.checkValidMove(Direction.UP, hero);
        } else if(key === "a" || key === "ArrowLeft") {
            newPosition = this.move.checkValidMove(Direction.LEFT, hero);
        } else if(key === "s" || key === "ArrowDown") {
            newPosition = this.move.checkValidMove(Direction.DOWN, hero);
        } else if(key === "d" || key === "ArrowRight") {
            newPosition = this.move.checkValidMove(Direction.RIGHT, hero);
        }
        if(newPosition != null) {
            // remover o hero do array de imagens
            let newPositionTile = this.move.getTile(this.move.coordinatesToIndex(newPosition.x, newPosition.y));
            this.gui.removeImage(hero);
            hero = this.move.moveHero(newPosition);
            if(hero instanceof DoorWay || hero instanceof  DoorOpen) {          // limita o movimento
                let door = this.roomManager.getDoorNumberByPosition(hero.position, this.roomManager.getCurrentRoomNumber());
                this.boardTiles = this.roomManager.changeRoom(door);
                this.gui.clearImages();
                this.gui.addImages(this.floorTiles);
                this.gui.addImages(this.boardTiles);
            } else if(newPositionTile instanceof Bat
                || newPositionTile instanceof BadGuy
                || newPositionTile instanceof Skeleton) {
                this.gui.addImage(hero, hero)
                //Nao mexer nenhuma peca
            } else if(newPositionTile instanceof GoodMeat
                || newPositionTile instanceof  Hammer
                || newPositionTile instanceof Key) {
                this.move.addItem(newPositionTile);
                if(newPositionTile instanceof GoodMeat) {
                    this.resetLive();
                }
                this.removeTile(newPositionTile, "item");
                this.addItemToStatusBar(newPositionTile);
            }

            else {
                this.gui.addImage(hero, newPositionTile);
                let enemies = this.enemyMove.getEnemies();                           // inimigos
                let enemyMoves = this.enemyMove.moveEnemies();
                if(Array.isArray(enemyMoves)) { //Apenas movimentos dos inimigos e sem ataque
                    for (let i = 0; i < enemies.length; i++) {
                        let enemy = enemies[i];
                        let enemyMove = enemyMoves[i];
                        let newEnemyPosition = enemyMove.position
                        let newEnemyTile = this.move.getTile(this.move.coordinatesToIndex(newEnemyPosition.x, newEnemyPosition.y));
                        this.gui.removeImage(enemy);
                        this.gui.addImage(enemyMove, newEnemyTile);
                    }
                } else if(enemyMoves === 1) { //Nao houve movimentos dos inimigos e houve ataque
                    //diminuir barra verde
                    let foundLivePosition = false;
                    let liveStatusTile = null;
                    let liveStatusTileIndex = 0;
                    for(let i = 6; i >= 3; i--) {
                        if(!foundLivePosition) {
                            liveStatusTile = this.statusTiles[i];
                            if (!(liveStatusTile instanceof Red)) {
                                foundLivePosition = true;
                                liveStatusTileIndex = i;
                            }
                        }
                    }
                    let statusTilePosition = liveStatusTile.position;
                    if(liveStatusTile instanceof Green) {
                        let newStatusTile = new RedGreen(statusTilePosition);
                        this.statusTiles[liveStatusTileIndex] = newStatusTile;
                        this.gui.removeStatusImage(liveStatusTile);
                        this.gui.addStatusImage(newStatusTile);
                    } else if(liveStatusTile instanceof RedGreen) {
                        let newStatusTile = new Red(statusTilePosition);
                        this.statusTiles[liveStatusTileIndex] = newStatusTile;
                        this.gui.removeStatusImage(liveStatusTile);
                        this.gui.addStatusImage(newStatusTile);
                    }

                }

                if(this.move.checkHeroLive()) {
                    this.gameOver();
                }

            }
            console.log(this.move.hasKey())
            if(this.move.hasKey()) {
                if(this.move.verifyDoor()){
                    this.openDoor();
                }
            }
        }
    }

    gameOver() {
        this.move = new Move();
        this.enemyMove = new EnemyMove();
        this.roomManager = new RoomManager();
        this.gui.showMessage("Game Over!", "alert");
        this.gui.clearImages();
        this.gui.clearStatusImages();
        this.startGame();
    }

    startGame() {
        this.roomManager.setMove(this.move);
        this.roomManager.setEnemyMove(this.enemyMove);
        this.enemyMove.setMove(this.move);
        this.move.setEnemyMove(this.enemyMove);
        this.move.setEngine(this);
        this.move.setRoomManager(this.roomManager);
        this.roomManager.readRooms();
        this.boardTiles = this.roomManager.getRoom(0);      // Inicia o jogo a Gerar o room 0
        this.roomManager.setReadRooms();

        this.floorTiles = [];                                // Recebe o floor mais o fundo preto da Status Bar
        this.statusBlackTiles = [];                          // Recebe as imagens pretas da Status Bar
        this.statusTiles = [];                               // Recebe as imagens do Status Bar

        for(let y = 0; y < 10; y++) {                                   // Gera Floor geral
            let statusPosition = new Position(y, -1);                   // Cria Status em y -1
            this.statusBlackTiles.push(new Black(statusPosition));      // Coloca Status Black Tiles
            if(y >= 0 && y <= 2) {
                this.statusTiles.push(new Fire(statusPosition));        // Coloca Viads no Status
            } else if(y > 2 && y < 7) {
                this.statusTiles.push(new Green(statusPosition));       // Coloca Energia no Status
            }
            for(let x = 0; x < 10; x++) {                               // Gera Floor de fundo geral
                let position = new Position(x, y);
                this.floorTiles.push(new Floor(position));
            }
        }
        this.gui.addImages(this.floorTiles);
        this.gui.addImages(this.boardTiles);
        this.gui.addStatusImages(this.statusBlackTiles);
        this.gui.addStatusImages(this.statusTiles);
    }

    removeTile(tile, type) {
        console.log(this.boardTiles)
        let newTile = null;
        if(type === "enemy") {
            newTile = new Blood(tile.position);
        } else if(type === "item") {
            newTile = this.move.getHero();
        }
        let heroIndex = 0;
        for(let i = 0; i < this.boardTiles.length; i++) {
            if(this.boardTiles[i] instanceof Hero) {
                heroIndex = i;
            }
            if(tile instanceof Skeleton) {
                if(this.boardTiles[i] instanceof Skeleton) {
                    this.boardTiles[i] = newTile;
                    this.gui.removeImage(tile);
                    this.gui.addImage(newTile, tile);
                }
            } else if(tile instanceof Bat) {
                if(this.boardTiles[i] instanceof Bat) {
                    this.boardTiles[i] = newTile;
                    this.gui.removeImage(tile);
                    this.gui.addImage(newTile, tile);
                }
            } else if(tile instanceof BadGuy) {
                if(this.boardTiles[i] instanceof BadGuy) {
                    this.boardTiles[i] = newTile;
                    this.gui.removeImage(tile);
                    this.gui.addImage(newTile, tile);
                }
            }  else if(tile instanceof GoodMeat) {
                if(this.boardTiles[i] instanceof GoodMeat) {
                    this.boardTiles[i] = newTile;
                    this.gui.removeImage(tile);
                    this.gui.addImage(newTile, tile);
                }
            } else if(tile instanceof Hammer) {
                if(this.boardTiles[i] instanceof Hammer) {
                    this.boardTiles[i] = newTile;
                    this.gui.removeImage(tile);
                    this.gui.addImage(newTile, tile);
                }
            } else if(tile instanceof Key) {
                if(this.boardTiles[i] instanceof Key) {
                    this.boardTiles[i] = newTile;
                    this.gui.removeImage(tile);
                    this.gui.addImage(newTile, tile);
                }
            }
        }
        if(type === "item") {
            let newFloorPosition = this.boardTiles[heroIndex].position;
            this.boardTiles[heroIndex] = new Floor(newFloorPosition);
        }
    }

    addItemToStatusBar(item) {
        let index = this.statusTiles.length;
        let statusPosition = new Position(index, -1);
        let tile = null;
        if(item instanceof  Hammer) {
            tile = new Hammer(statusPosition);
            this.statusTiles.push(tile);
            this.gui.addStatusImage(tile);
        } else if(item instanceof Key) {
            tile = new Key(statusPosition);
            this.statusTiles.push(tile);
            this.gui.addStatusImage(tile);
        }
    }

    resetLive() {
        this.move.resetLive();
        this.statusTiles = [];
        for(let y = 0; y < 10; y++) {                                   // Gera Floor geral
            let statusTilePosition = new Position(y, -1);                   // Cria Status em y -1
            this.statusBlackTiles.push(new Black(statusTilePosition));      // Coloca Status Black Tiles
            if (y >= 0 && y <= 2) {
                this.statusTiles.push(new Fire(statusTilePosition));        // Coloca Viads no Status
            } else if (y > 2 && y < 7) {
                this.statusTiles.push(new Green(statusTilePosition));       // Coloca Energia no Status
            }
        }
        this.gui.clearStatusImages();
        this.gui.addStatusImages(this.statusBlackTiles);
        this.gui.addStatusImages(this.statusTiles);
        let items = this.move.getItems();
        for(let i = 0; i < items.length; i++) {
            this.addItemToStatusBar(items[i]);
        }
    }

    openDoor() {
        let doorIndex = 0;
        let doorPosition = null;
        let doorClosedTile = null;
        for(let i = 0; i < this.boardTiles.length; i++) {
            let tile = this.boardTiles[i];
            if(tile instanceof DoorClosed) {
                doorIndex = i;
                doorPosition = tile.position;
                doorClosedTile = tile;
            }
        }
        let newDoorTile = new DoorOpen(doorPosition);
        this.boardTiles[doorIndex] = newDoorTile;
        this.gui.removeImage(doorClosedTile);
        this.gui.addImage(newDoorTile, doorClosedTile);
    }
}

export default Engine;



