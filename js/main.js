const boardGame = new BoardGame();
const domRenderer = new DOMGameRenderer();
const consoleRenderer = new ConsoleGameRenderer();
const renderers = new GameRenderers([consoleRenderer, domRenderer])

const startGame = function () {
    boardGame.startGame();
}

const rollTheDice = function () {
    boardGame.rollTheDice();
}

const useGivenRoll = function () {
    boardGame.useGivenRoll();
}

const useGivenRollIfPressedKeyIsEnter = function (event) {
    if (event.code === "Enter") {
        useGivenRoll();
    }
}

const endGame = function () {
    boardGame.endGame();
}