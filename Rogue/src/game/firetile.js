import ImageTile from "./imageTile.js";
import Interface from "./interface.js";

/**
* Classe base para poder extender e criar a FireBall.
* Não editar esta classe nem instanciar diretamente.
**/
class FireTile extends ImageTile {
    #direction;
    #active = false;
    #gui = Interface.getInstance();

    constructor(position, direction) {
        super(position);
        if(this.constructor === FireTile) throw new Error("Não é possível instanciar FireTile diretamente. Crie uma subclasse.");
        this.#direction = direction;
    }

    start() {
        this.#active = true;
    }

    /**
    * Validar o impacto da FireTile. Esta função é chamada a cada 500ms pelo motor do jogo.
    * Caso retorne true, a FireTile é removida do jogo.
    * Implementar nas subclasses.
    */
    validateImpact() {}

    update() {
        if(!this.#active) return;
        this.position = this.position.plus(this.#direction.asVector());
        if(this.validateImpact()) {
            this.#active = false;
            setTimeout(() => {
                this.#gui.removeImage(this);
            }, 150);
        }
    }
}

export default FireTile;
