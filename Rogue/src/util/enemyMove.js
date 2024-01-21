import Floor from "../objects/floor.js";
import DoorOpen from "../objects/doorOpen.js";
import DoorWay from "../objects/doorWay.js";
import Direction from "./direction.js";
import Skeleton from "../objects/skeleton.js";
import Bat from "../objects/bat.js";
import BadGuy from "../objects/badGuy.js";

class EnemyMove {
    enemies;
    enemyLives;
    move;

    constructor() {
        this.enemies = [];
        this.enemyLives = [];
    }

    setEnemies(enemies) {
        this.enemies = enemies;
    }

    setEnemyLives(enemyLives) {
        this.enemyLives = enemyLives;
    }

    // Gera Direção Random para movimento de Inimigos
    generateRandomDirection() {
        let range = 3 - 0 + 1; // max = 3 min = 0
        let randomNumber = Math.floor(Math.random() * range);
        if(randomNumber === 0) {
            return Direction.UP;
        } else if(randomNumber === 1) {
            return Direction.DOWN;
        } else if(randomNumber === 2) {
            return Direction.LEFT;
        } else if(randomNumber === 3) {
            return Direction.RIGHT;
        }
    }

    getEnemies() {
        return this.enemies;
    }

    // Movimento dos inimigos e Validação de Movimento de inimigos
    moveEnemies() {
        let enemyMoves = [];
        for(let i = 0; i < this.enemies.length; i++)  {
            let enemy = this.enemies[i];
            let distanceToHero = this.getDistanceToHero(enemy);
            let directionToHero = this.getDirectionToHero(enemy);
            let enemyPosition = enemy.position;
            let enemyIndex = this.move.coordinatesToIndex(enemyPosition.x, enemyPosition.y);
            let move = null;
            let isValidMove = false;
            let newPosition = null;
            if(distanceToHero == 1) {                           // Perda de vida do Hero ao contacto com o Inimigo
                this.move.decreaseLive();
                console.log(this.move.getCurrentLive());
                return distanceToHero;
            }
            // se a distancia for menor ou igual a 3, aproximar do heroi
            if(distanceToHero > 1 && distanceToHero <= 3) {
                let newDirection = null;
                if(directionToHero == "up") {
                    newDirection = Direction.UP;
                } else if(directionToHero == "down") {
                    newDirection = Direction.DOWN;
                } else if(directionToHero == "left") {
                    newDirection = Direction.LEFT;
                } else if(directionToHero == "right") {
                    newDirection = Direction.RIGHT;
                } else if(directionToHero == "down-left") {
                    newDirection = Direction.LEFT;
                } else if(directionToHero == "down-right") {
                    newDirection = Direction.RIGHT;
                } else if(directionToHero == "up-left") {
                    newDirection = Direction.LEFT;
                } else if(directionToHero == "up-right") {
                    newDirection = Direction.RIGHT;
                }
                if(this.move.checkValidMove(newDirection, enemy)) {
                    newPosition = enemyPosition.plus(newDirection.asVector());
                } else {
                    return null;
                }

            } else { // caso seja maior que 3, fazer movimento aleatório
                // enquanto isValidMove for falso
                while (!isValidMove) {
                    move = this.generateRandomDirection();
                    newPosition = this.move.checkValidMove(move, enemy);
                    if (newPosition !== null) {
                        let newPositionIndex = this.move.coordinatesToIndex(newPosition.x, newPosition.y);
                        let newTile = this.move.getTile(newPositionIndex);
                        if (!(newTile instanceof DoorOpen) && !(newTile instanceof DoorWay)) {
                            isValidMove = true;
                        }
                    }
                }
            }
            let newIndex = this.move.coordinatesToIndex(newPosition.x, newPosition.y);
            if(enemy instanceof Skeleton) {
                this.move.setTile(enemyIndex, new Floor(enemyPosition));
                enemy = new Skeleton(newPosition);
                this.move.setTile(newIndex,  enemy);
            } else if(enemy instanceof Bat) {
                this.move.setTile(enemyIndex, new Floor(enemyPosition));
                enemy = new Bat(newPosition);
                this.move.setTile(newIndex, enemy);
            } else if(enemy instanceof BadGuy) {
                this.move.setTile(enemyIndex, new Floor(enemyPosition));
                enemy = new BadGuy(newPosition);
                this.move.setTile(newIndex, enemy);
            }
            enemyMoves.push(enemy);
        }
        this.enemies = enemyMoves;
        console.log(enemyMoves)
        return enemyMoves;
    }

    // Calculo o valor da distancia entre Hero e um Inimigo
    getDistanceToHero(enemy) {
        let enemyPosition = enemy.position;
        let heroPosition = this.move.getHero().position;
        let x1 = enemyPosition.x;
        let x2 = heroPosition.x;
        let y1 = enemyPosition.y;
        let y2 = heroPosition.y;
        return Math.floor(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
    }

    // Retorna a direção em que o inimigo vai andar baseada na relação de posição (coodenadas) entre inimigo e Hero
    getDirectionToHero(enemy) {
        let enemyPosition = enemy.position;
        let heroPosition = this.move.getHero().position;
        let x = enemyPosition.x - heroPosition.x;
        let y = enemyPosition.y - heroPosition.y;

        if(x === 0) {                                       // estão ambos no mesmo x
            if(y > 0) {
                return "up";
            } else {
                return "down";
            }
        } else if (y === 0) {                               // estão ambos no mesmo y
            if(x > 0) {
                return "left";
            } else {
                return "right";
            }
        } else if(x > 0) {
            if(y > 0) {
                return "up-left";
            } else {
                return "down-left";
            }
        } else {
            if(y > 0) {
                return "up-right";
            } else {
                return "down-right";
            }
        }
    }

    setMove(move) {
        this.move = move;
    }

    getEnemyIndex(position) {
        for(let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            if(position.equals(enemy.position)) {
                return i;
            }
        }
    }

    // Define a perda de energia do Inimigo
    decreaseLive(enemyIndex) {
        return this.enemyLives[enemyIndex]-3;
    }

    removeEnemy(index) {
        this.enemies.splice(index, 1);
        this.enemyLives.splice(index, 1);
    }
}
export default EnemyMove;