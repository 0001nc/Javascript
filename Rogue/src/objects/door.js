class Door {
    #number;
    #type;
    #destinationRoom;
    #destinationDoor;
    #opensWithKey;

    constructor(number, type, destinationRoom, destinationDoor) {
        this.#number = number;
        this.#type = type;
        this.#destinationRoom = destinationRoom;
        this.#destinationDoor = destinationDoor;
        this.#opensWithKey = null;
    }

    get number() {
        return this.#number;
    }

    get type() {
        return this.#type;
    }

    get destinationRoom() {
        return this.#destinationRoom;
    }

    get destinationDoor() {
        return this.#destinationDoor;
    }
}
export default Door;