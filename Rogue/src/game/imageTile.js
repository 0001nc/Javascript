/**
 * Classe base para poder extender e criar objetos do jogo.
 * Não editar esta classe nem instanciar diretamente.
 **/
class ImageTile {
    #position;
    constructor(position) {
        if(this.constructor === ImageTile) throw new Error("Não é possível instanciar uma ImageTile diretamente. Crie uma subclasse.");
        this.#position = position;
    }

    get position() {
        return this.#position;
    }

    set position(position) {
        this.#position = position;
    }

    get image() {
        return "";
    }
}

export default ImageTile;
