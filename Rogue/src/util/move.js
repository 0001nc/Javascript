import Floor from "../objects/floor.js";
import Interface from "../game/interface.js";
import Hero from "../objects/hero.js";
import DoorWay from "../objects/doorWay.js";
import DoorOpen from "../objects/doorOpen.js";
import Position from "./position.js";
import Wall from "../objects/wall.js";
import Skeleton from "../objects/skeleton.js";
import Direction from "./direction.js";
import BadGuy from "../objects/badGuy.js";
import Bat from "../objects/bat.js";
import direction from "./direction.js";
import Blood from "../objects/blood.js";
import GoodMeat from "../objects/goodMeat.js";
import Hammer from "../objects/hammer.js";
import Key from "../objects/key.js";
import DoorClosed from "../objects/doorClosed.js";
import Grass from "../objects/grass.js";

class Move {
    board;
    isLastPositionDoor;
    lastPositionDoor;
    enemies;
    enemyMove;
    currentLive;
    items;
    engine;
    roomManager;

    constructor() {
        this.hero = null;
        this.board = null;
        this.isLastPositionDoor = false;
        this.lastPositionDoor = null;
        this.enemies = [];
        this.lives = 3;
        this.currentLive = 8;
        this.items = [];
    }

    setHero(hero) {
        this.hero = hero
    }

    setBoard(board) {
        this.board = board;
    }

    setEnemyMove(enemyMove) {
        this.enemyMove = enemyMove;
    }

    setEngine(engine) {
        this.engine = engine;
    }

    setRoomManager(roomManager) {
        this.roomManager = roomManager;
    }

    // Verifica validade do movimento do Hero
    checkValidMove(direction, tile) {
        let newPosition = tile.position.plus(direction.asVector());
        let index = this.coordinatesToIndex(newPosition.x, newPosition.y);
        let destinationTile = this.board[index];
        // Verifica se anda ou não
        if(destinationTile instanceof Floor
            || destinationTile instanceof DoorOpen
            || destinationTile instanceof DoorWay
            || destinationTile instanceof Bat
            || destinationTile instanceof BadGuy
            || destinationTile instanceof Skeleton
            || destinationTile instanceof GoodMeat
            || destinationTile instanceof Hammer
            || destinationTile instanceof Key){
                return newPosition;                                         // Retorna nova posição para onde vai andar - NEW POSITION
        } else {
            return null;                                                    // Retorna nulo se o movimento for invalido
        }
    }

    // Devolve uma imagem num determinado index do board
    getTile(index) {
        return this.board[index];
    }

    // Converte as coordenadas num index do array geral
    coordinatesToIndex(x, y) {
        return y * 10 + x;
    }

    // Movimento do Hero
    moveHero(newPosition) {
        let currentPosition = this.hero.position;
        let currentIndex = this.coordinatesToIndex(currentPosition.x, currentPosition.y);
        let newIndex = this.coordinatesToIndex(newPosition.x, newPosition.y);
        let tile = this.board[newIndex];

        // Analisa qual é o tipo de imagem que está na Current Position no Board
        if(tile instanceof DoorWay || tile instanceof DoorOpen) {
            console.log(this.board)
            return tile;
        } else if(tile instanceof Floor && !this.isLastPositionDoor) {
            this.hero = new Hero(newPosition);

            // substitui a imagem hero por uma imagem floor no board
            this.board[currentIndex] = new Floor(newPosition);

            // substitui a imagem floor por uma imagem hero que foi criada anteriormente no board
            this.board[newIndex] = this.hero;
            //console.log(this.board)
            return this.hero;
        } else if(tile instanceof Floor && this.isLastPositionDoor) {
            this.hero = new Hero(newPosition);

            // substitui a imagem hero por uma imagem floor no board
            this.board[currentIndex] = this.lastPositionDoor;

            // substitui a imagem floor por uma imagem hero que foi criada anteriormente no board
            this.board[newIndex] = this.hero;
            console.log(this.board)
            this.isLastPositionDoor = false;
            this.lastPositionDoor = null;
            return this.hero;
        } else if(tile instanceof Bat || tile instanceof Skeleton || tile instanceof BadGuy) {
            //confronto
            let enemyPosition = tile.position;
            let enemyIndex = this.enemyMove.getEnemyIndex(enemyPosition);
            let enemyLive = this.enemyMove.decreaseLive(enemyIndex);
            if(enemyLive === 0) {
                this.board[this.coordinatesToIndex(enemyPosition.x, enemyPosition.y)] = new Blood(enemyPosition);
                console.log(this.board);
                this.engine.removeTile(tile, "enemy");
                this.enemyMove.removeEnemy(enemyIndex);
            }
            return this.hero;
        }
    }

    getHero() {
        return this.hero;
    }

    // Coloca o hero no novo Room na posição da porta
    addHeroToBoardAfterChangingRoom(hero, position) {
        this.isLastPositionDoor = true;
        let doorIndex = this.coordinatesToIndex(position.x, position.y);
        this.lastPositionDoor = this.board[doorIndex];
        this.board[doorIndex] = hero;
    }

    getLives() {
        return this.lives;
    }

    getCurrentLive() {
        return this.currentLive;
    }

    getItems() {
        return this.items;
    }

    addItem(item) {
        this.items.push(item);
        let floorTile = new Floor(this.hero.position)
        this.hero = new Hero(item.position);
        this.board[this.coordinatesToIndex(item.position.x, item.position.y)] = this.hero;
        this.board[this.coordinatesToIndex(floorTile.position.x, floorTile.position.y)] = floorTile;
    }

    setTile(index, tile) {
        this.board[index] = tile;
    }

    decreaseLive() {
        this.currentLive--;
    }

    checkHeroLive() {
        return this.currentLive === 0;
    }

    resetLive() {
        this.currentLive = 8;
    }

    hasKey() {
        let hasKey = false;
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i] instanceof Key) {
                hasKey = true;
            }
        }
        return hasKey;
    }

    verifyDoor() {
        let heroPosition = this.hero.position;
        let leftPosition = heroPosition.plus(Direction.LEFT.asVector());
        let downPosition = heroPosition.plus(Direction.DOWN.asVector());
        let leftIndex = this.coordinatesToIndex(leftPosition.x, leftPosition.y);
        let downIndex = this.coordinatesToIndex(downPosition.x, downPosition.y);
        if(this.board[leftIndex] instanceof DoorClosed) {
            this.board[leftIndex] = new DoorOpen(leftPosition);
            return true;
        } else if (this.board[downIndex] instanceof DoorClosed) {
            this.board[downIndex] = new DoorWay(downPosition);
            return true;
        }
    }
}
export default Move;





























