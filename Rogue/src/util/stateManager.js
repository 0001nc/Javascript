class StateManager {
    static saveState(state, saveName = 'game.state') {
        try {
            const serializedState = JSON.stringify({state});
            localStorage.setItem(saveName, serializedState);
        } catch (err) {
            console.log(err);
        }
    }

    static loadState(saveName = 'game.state') {
        try {
            const serializedState = localStorage.getItem(saveName);
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState).state;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }
}

export default StateManager;
