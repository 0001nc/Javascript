import Engine from "./game/engine.js";
import Interface from "./game/interface.js";
(() => {
    const gui = Interface.getInstance();
    const engine = new Engine();
    engine.init();
    document.addEventListener("keydown", (e) => {
        let key = e.key;
        if(key === " ") key = "Space";
        engine.keyPressed(key);
        gui.update();
        document.getElementById(key)?.classList.add("pressed");
    });
    document.addEventListener("keyup", (e) => {
        let key = e.key;
        if(key === " ") key = "Space";
        document.getElementById(key)?.classList.remove("pressed");
    });
    ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "1", "2", "3", "Space"].forEach((key) => {
        document.getElementById(key).addEventListener("click", () => {
            engine.keyPressed(key);
            gui.update();
        });
    });
})();
