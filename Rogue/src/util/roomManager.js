// ROOMS
import room0 from "../../rooms/room0.js"
import room1 from "../../rooms/room1.js";
import room2 from "../../rooms/room2.js";
import room3 from "../../rooms/room3.js";

// ELEMENTS
import Position from "./position.js";
import Floor from "../objects/floor.js";
import Wall from "../objects/wall.js";
import Skeleton from "../objects/skeleton.js";
import Hero from "../objects/hero.js";
import DoorWay from "../objects/doorWay.js";
import Bat from "../objects/bat.js";
import DoorClosed from "../objects/doorClosed.js";
import Key from "../objects/key.js";
import DoorOpen from "../objects/doorOpen.js";
import Grass from "../objects/grass.js";
import Room from "../objects/room.js";
import Door from "../objects/door.js";
import BadGuy from "../objects/badGuy.js";
import GoodMeat from "../objects/goodMeat.js";
import Hammer from "../objects/hammer.js";
import Blood from "../objects/blood.js";


class RoomManager {
    rooms;
    roomData;
    move;
    enemyMove;
    roomObjects;
    currentRoom;
    hasChangedRoom;
    hasReadRooms;

    constructor() {
        this.rooms = [];
        this.roomObjects = [];
        this.roomData = [];
        this.roomData.push(room0);
        this.roomData.push(room1);
        this.roomData.push(room2);
        this.roomData.push(room3);
        this.currentRoom = 0;
        this.hasChangedRoom = false;
        this.hasReadRooms = false;
    }


    // Cria o mapa das Rooms criads
    readRooms() {
        for(let i = 0; i < 4; i++) {
            this.rooms.push(this.readRoom(this.roomData[i], i));    //(roomData, roomNumber)

            /*
            Itera o array room data e processa cada valor com a função    readRoom  que recebe
            cada valor da room data e o room number.
            As imagens do room são guardadas no array roomObjects
             */
        }

    }

    setMove(move) {
        this.move = move;
    }

    setEnemyMove(enemyMove) {
        this.enemyMove = enemyMove;
    }

    // Converte od ficheiros Sting de Rooms num grid de arrays
    readRoom(room, roomNumber) {
        let roomGrid = [];
        let roomObject = new Room();
        roomObject.number = roomNumber;      // Atribui o numero do Room
        let doors = [];
        const roomLines = room.split('\n');  // Divide a room por lines(\n)

        roomLines.forEach((line, index) => {

            if(line.startsWith("#")) {       // Exclui os caracteres     #    para formação de rooms

                if(line !== "#") {
                    const columns = line.split(' ');
                    let number = columns[1];
                    if(number !== "k") {
                        let type = columns[2];
                        let destinationRoom = columns[3];
                        let destinationDoor = columns[4];
                        let door = new Door(number, type, destinationRoom, destinationDoor);
                        doors.push(door);
                    } else {
                        // TODO Key
                    }
                }
            } else {
                const columns = line.split('');         // Converte a linha da String em Array
                roomGrid.push(columns);                 // Guarda o Array de cada coluna no Array roomGrid
            }

        });
        roomObject.doors = doors;                       // Guarda as portas do Room
        roomObject.board = roomGrid;                    // Guarda a lista de colunas do room no board
        this.roomObjects.push(roomObject);              // Guarda a room totalmente criada na lista     roomObjects
        return roomGrid;
    }

    // Forma as plataformas. Posiciona as imagens das plataforms dos niveis do jogo
    getRoom(index) {
        let roomData = null;
        if(this.hasReadRooms) {
            roomData = this.roomObjects[index].board;
        } else {
            roomData = this.rooms[index];
        }
        console.log(roomData)

        let boardTiles = [];
        let boardTilesWithoutFloor = [];
        let enemyTiles = [];
        let enemyLives = [];
        for(let y = 0; y < 10; y++) {
            for(let x = 0; x < 10; x++) {
                let tile = roomData[y][x];
                let position = new Position(x, y);
                let image = null;
                let isFloor = false;
                let isEnemy = false;
                            // Portas dos Rooms
                if(index === 0){                        // Portas do Room 0
                    if (tile === "0") {
                        image = new DoorWay(position);
                    }
                }else if(index === 1){                  // Portas do Room 1
                    if (tile === "1") {
                        image = new DoorClosed(position);
                    }else if (tile === "0") {
                        image = new DoorOpen(position);
                    }else if (tile === "2") {
                        image = new DoorWay(position);
                    }
                }else if(index === 2){                   // Portas do Room 2
                    if (tile === "1"){
                        image = new DoorOpen(position);
                    }else if (tile === "0"){
                        image = new DoorClosed(position);
                    }else if (tile === "G") {
                        image = new BadGuy(position);
                        isEnemy = true;
                    }else if (tile === "m") {
                        image = new GoodMeat(position);
                    }else if (tile === "h") {
                        image = new Hammer(position);
                    }
                }else if(index === 3) {                  // Portas do Room 3
                    if (tile === "0") {
                        image = new DoorClosed(position);
                    } else if(tile === "g"){
                        image = new Grass(position);
                    }
                }

                                                         // Imagens default para todos os rooms
                if(tile === "W") {
                    image = new Wall(position);
                }else if (tile === "S"){
                    image = new Skeleton(position);
                    isEnemy = true;
                }else if (tile === " ") {
                    image = new Floor(position);
                    isFloor = true;
                } else if (tile === "H" && !this.hasChangedRoom) {
                    let hero = new Hero(position);
                    this.move.setHero(hero);
                    image = hero;
                } else if (tile === "H" && this.hasChangedRoom) {
                    image = new Floor(position);
                } else if (tile === "B"){
                    image = new Bat(position);
                    isEnemy = true;
                } else if (tile === "k") {
                    image = new Key(position);
                } else if (tile === "b") {
                    image = new Blood(position);
                }
                if(image !== null) {
                    if (isFloor) {
                        boardTiles.push(image);
                    } else {
                        boardTiles.push(image);
                        boardTilesWithoutFloor.push(image);
                    }
                    if(isEnemy) {
                        enemyTiles.push(image);
                        enemyLives.push(3);
                    }
                }
            }
        }
        this.move.setBoard(boardTiles);            // Guarda as imagens floor no Move para serem usados no movimento
        this.enemyMove.setEnemies(enemyTiles);
        this.enemyMove.setEnemyLives(enemyLives);
        return boardTilesWithoutFloor;             // Guarda as imagens sem floor
    }

    // Devolve a porta que está em determinada posição dentro do room com o roomNumber
    getDoorNumberByPosition(position, roomNumber) {
        let room = this.roomObjects[roomNumber];
        let board = room.board;
        let doors = room.doors;
        let doorIndex = board[position.y][position.x];
        return doors[doorIndex];
    }

    // Devolve a posição x y da porta      de acordo com o numero tipo de porta e o numero do room em que está
    getDoorPositionByNumber(number, roomNumber) {
        let room = this.roomObjects[roomNumber];
        let board = room.board;
        for(let y = 0; y < 10; y++) {
            for(let x = 0; x < 10; x++) {
                if(board[y][x] === number) {
                    return new Position(x, y);
                }
            }
        }
    }

    // Gere a mudança de Room
    // É chamada quando o Hero atravessa uma porta
    changeRoom(door) {
        let destinationRoom = door.destinationRoom;
        let destinationDoor = door.destinationDoor;
        let roomNumber = parseInt(destinationRoom.split("room")[1].split(".")[0], 10); // 10 = base decimal
        let heroPosition = this.getDoorPositionByNumber(destinationDoor, roomNumber);
        let boardTiles = this.getRoom(roomNumber);
        let hero = new Hero(heroPosition);
        console.log(hero)
        this.move.setHero(hero);
        this.move.addHeroToBoardAfterChangingRoom(hero, heroPosition); // Coloca Hero na nova
        boardTiles.push(hero);
        if(roomNumber > this.currentRoom) {
            this.currentRoom++;
        } else if (roomNumber < this.currentRoom) {
            this.currentRoom--;
        }
        this.hasChangedRoom = true;
        return boardTiles;
    }

    // Retorna o numero da porta que está a ser usada neste momento
    getCurrentRoomNumber() {
        return this.currentRoom;
    }

    setReadRooms() {
        this.hasReadRooms = true;
    }
}
export default RoomManager;

