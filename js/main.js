const boardGame = new BoardGame();
const domRenderer = new DOMGameRenderer();
const consoleRenderer = new ConsoleGameRenderer();
const renderers = new GameRenderers([consoleRenderer, domRenderer])

const startGame = () => boardGame.startGame();

const rollTheDice = () => boardGame.rollTheDice();

const useGivenRoll = () => boardGame.useGivenRoll();

const useGivenRollIfPressedKeyIsEnter = (event) => event.code === "Enter" ? useGivenRoll() : 0;

const endGame = () => boardGame.endGame();