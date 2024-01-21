class Room  {                       // Criador geral de rooms com os seus elementos proprios
    #number;
    #doors;
    #keys;
    #board;

    constructor() {
        this.#number = null;
        this.#doors = null;
        this.#keys = null;
        this.#board = null;
    }

    get number() {                  // Numero do Room
        return this.#number;
    }

    set number(number) {
        this.#number = number;
    }

    get doors() {                   // Portas de cada Room
        return this.#doors;
    }

    set doors(doors) {
        this.#doors = doors;
    }

    get keys() {                    // Chaves de cada Room
        return this.#keys;
    }

    set keys(keys) {
        this.#keys = keys;
    }

    get board() {                   // Board de cada Room
        return this.#board;
    }

    set board(board) {
        this.#board = board;
    }


}

export default Room;
