import FireTile from "./firetile.js";

class Interface {
    static #NUM_SQUARES_X = 10;
    static #NUM_SQUARES_Y = 10;

    static #X_RATIO = 100 / Interface.#NUM_SQUARES_X;
    static #Y_RATIO = 100 / (Interface.#NUM_SQUARES_Y + 1); //+1 for the status bar

    #container = document.getElementById("game");

    #images = [];
    #statusImages = [];

    #tickInterval = null;

    static #instance;

    static getInstance() {
        if(Interface.#instance === undefined) {
            Interface.#instance = new Interface();
        }
        return Interface.#instance;
    }

    constructor() {
    }

    #processStatusImage(image) {
        let element = document.createElement("img");
        element.src = "/images/" + image.image;
        element.style.position = "absolute";
        element.style.width = Interface.#X_RATIO + "%";
        element.style.height = Interface.#Y_RATIO + "%";
        element.style.left = image.position.x * Interface.#X_RATIO + "%";
        element.style.top = "0";
        this.#container.appendChild(element);
        return {
            image: image,
            element: element
        }
    }

    #processImage(image, beforeIndex) {
        let x = image.position.x * Interface.#X_RATIO;
        let y = (image.position.y + 1) * Interface.#Y_RATIO;
        let element = document.createElement("img");
        element.src = "/images/" + image.image;
        element.style.position = "absolute";
        element.style.width = Interface.#X_RATIO + "%";
        element.style.height = Interface.#Y_RATIO + "%";
        element.style.left = x + "%";
        element.style.top = y + "%";
        if (beforeIndex) {
            this.#container.insertBefore(element, this.#images[beforeIndex].element);
        } else {
            this.#container.appendChild(element);
        }
        return {
            image: image,
            element: element
        }
    }

    addImages(images) {
        this.#images = this.#images.concat(images.map((image) => {
            return this.#processImage(image);
        }));
    }

    addImage(image, before) {
        //before is a tile that we want to insert this image before
        if(before) {
            let index = this.#images.findIndex((element) => {
                return element.image === before;
            });
            if(index !== -1) {
                this.#images.splice(index, 0, this.#processImage(image, index));
            } else {
                this.#images.push(this.#processImage(image));
            }
        } else {
            this.#images.push(this.#processImage(image));
        }
    }

    removeImage(image) {
        let index = this.#images.findIndex((element) => {
            return element.image === image;
        });
        if(index !== -1) {
            this.#container.removeChild(this.#images[index].element);
            this.#images.splice(index, 1);
        }
    }

    addStatusImages(images) {
        this.#statusImages = this.#statusImages.concat(images.map((image) => {
            return this.#processStatusImage(image);
        }));
    }

    addStatusImage(image) {
        this.#statusImages.push(this.#processStatusImage(image));
    }

    removeStatusImage(image) {
        let index = this.#statusImages.findIndex((element) => {
            return element.image === image;
        });
        if(index !== -1) {
            this.#container.removeChild(this.#statusImages[index].element);
            this.#statusImages.splice(index, 1);
        }
    }

    clearImages() {
        this.#images.forEach((element) => {
            this.#container.removeChild(element.element);
        });
        this.#images = [];
    }

    clearStatusImages() {
        this.#statusImages.forEach((element) => {
            this.#container.removeChild(element.element);
        });
        this.#statusImages = [];
    }

    showMessage(message, type, time = 2000) {
        let messageWrapper = document.getElementById("message-wrapper");
        let messageElement = document.getElementById("message");
        messageElement.innerHTML = message;
        messageWrapper.classList.add("show");
        if(type) messageElement.classList.add(type);
        setTimeout(() => {
            messageWrapper.classList.remove("show");
            if(type) {
                setTimeout(() => {
                    messageElement.classList.remove(type);
                }, 300);
            }
        }, time);
    }

    update() {
        this.#images.forEach(image => {
            let x = image.image.position.x * Interface.#X_RATIO;
            let y = (image.image.position.y + 1) * Interface.#Y_RATIO;
            image.element.style.left = x + "%";
            image.element.style.top = y + "%";
            if(image.element.src !== location.origin + "/images/" + image.image.image) {
                image.element.src = "/images/" + image.image.image;
            }
        });
        this.#statusImages.forEach(image => {
            let x = image.image.position.x * Interface.#X_RATIO;
            image.element.style.left = x + "%";
            if(image.element.src !== location.origin + "/images/" + image.image.image) {
                image.element.src = "/images/" + image.image.image;
            }
        });
    }

    start() {
        this.#container.style.visibility = "visible";
        this.#tickInterval = setInterval(() => {
            this.#images.forEach(image => {
                if(image.image instanceof FireTile) {
                    image.image.update();
                }
            });
            this.update();
        }, 150);
    }
}


export default Interface;
