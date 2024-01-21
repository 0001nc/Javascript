class Vector2d {
    #i;
    #j;

    constructor(i, j) {
        this.#i = i;
        this.#j = j;
    }

    plus(vector) {
        return new Vector2d(this.#i + vector?.i, this.#j + vector?.j);  // NEW
    }

    minus(vector) {
        return new Vector2d(this.#i - vector?.i, this.#j - vector?.j);
    }

    get i() {
        return this.#i;
    }

    get j() {
        return this.#j;
    }

    equals(vector) {
        return this.#i === vector?.i && this.#j === vector?.j;
    }

    toString() {
        return "[" + this.#i + ", " + this.#j + "]";
    }
}

export default Vector2d;
