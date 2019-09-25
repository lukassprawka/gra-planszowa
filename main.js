class GameField {
    constructor(number, special = false) {
        this.number = number;
        this.special = special;
    }
}

class ConsoleGameRenderer {

    start() {
        console.clear();
        console.log("Nowa gra.");
    }

    renderRollNumber(rollNumber) {
        console.log("...\nLiczba wyrzuconych oczek: " + rollNumber);
    }

    renderMessage(message) {
        console.log(message);
    }

    setActiveElement(previousPosition, actualPosition) {
        console.log("Jesteś na pozycji: " + actualPosition);
    }

    end() {}
}
class DOMGameRenderer {
    start(numberOfGameFIelds) {
        this.renderRollNumber("");
        const boardElement = document.getElementById('board');
        while (boardElement.firstChild) {
            boardElement.removeChild(boardElement.firstChild);
        }
        const startFieldElement = document.createElement("div");
        startFieldElement.setAttribute("id", 0);
        startFieldElement.className = "gameField startField activePosition";
        const textElement = document.createElement("span");
        textElement.innerText = "Start";
        startFieldElement.append(textElement);
        boardElement.append(startFieldElement);
        for (let i = 1; i <= numberOfGameFIelds; i++) {
            const fieldElement = document.createElement("div");
            fieldElement.setAttribute("id", i);
            fieldElement.className = "gameField";
            const textElement = document.createElement("span");
            textElement.innerText = i;
            fieldElement.append(textElement);
            boardElement.append(fieldElement);
        }
        this.manageButttons(false);
    }

    renderRollNumber(rollNumber) {
        const rollNumberElement = document.getElementById("rollNumber");
        rollNumberElement.innerText = rollNumber;
    }

    renderMessage(message) {
        alert(message);
    }

    setActiveElement(previousPosition, actualPosition) {
        const previousActiveFieldElement = document.getElementById(previousPosition);
        previousActiveFieldElement.classList.remove("activePosition");
        const auctualActiveFieldElement = document.getElementById(actualPosition);
        auctualActiveFieldElement.className += " activePosition";
    }

    end() {
        this.manageButttons(true);
    }

    manageButttons(value) {
        document.getElementById("rollButton").disabled = value;
        document.getElementById("rollInput").disabled = value;
        document.getElementById("specifyRollButton").disabled = value;
        document.getElementById("endButton").disabled = value;
    }
}
class GameRenderers {
    constructor(renderers) {
        this.renderers = renderers;
    }

    start(numberOfGameFIelds) {
        this.renderers.forEach(renderer => renderer.start(numberOfGameFIelds));
    }

    renderRollNumber(rollNumber) {
        this.renderers.forEach(renderer => renderer.renderRollNumber(rollNumber));
    }

    renderMessage(message) {
        this.renderers.forEach(renderer => renderer.renderMessage(message));
    }

    setActiveElement(previousPosition, actualPosition) {
        this.renderers.forEach(renderer => renderer.setActiveElement(previousPosition, actualPosition));
    }

    end() {
        this.renderers.forEach(renderer => renderer.end());
    }
}

class BoardGame {
    constructor() {
        this.board;
        this.position;
        this.rolls;
        this.gameInProgres;
        this.numberOfGameFIelds;
    }

    startGame() {
        this.board = [];
        this.position = 0;
        this.rolls = [];
        this.gameInProgres = true;
        this.numberOfGameFIelds = 20;
        this.createBoard();
        renderers.start(this.numberOfGameFIelds);
    }

    createBoard() {
        let boardGameFields = [];
        for (let i = 1; i <= this.numberOfGameFIelds; i++) {
            let gameField = new GameField(i);
            boardGameFields.push(gameField);
        }
        boardGameFields = this.setSpecialFields(boardGameFields);
        this.board = boardGameFields;
    }

    setSpecialFields(boardGameFields) {
        const specialFields = [{
                number: 12,
                fn: () => {
                    const message = "...\n12 to pole specjalne, gra zakończona porażką. "
                    this.endGame(message);
                }
            },
            {
                number: 19,
                fn: () => {
                    renderers.renderMessage("...\n19 to pole specjalne, przenosisz się na pole 11.");
                    renderers.setActiveElement(this.position, 11);
                    this.position = 11;
                }
            }
        ];
        specialFields.forEach((specialField) => {
            const gameField = boardGameFields.find(el => el.number === specialField.number);
            gameField.special = specialField.fn;
        });
        return boardGameFields;
    }

    rollTheDice() {
        const roll = Math.floor(Math.random() * 6) + 1;
        this.play(roll);
    }

    useGivenRoll() {
        const rollInput = document.getElementById("rollInput");
        const roll = Number(rollInput.value);

        switch (roll) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                this.play(roll);
                break;
            default:
                renderers.renderMessage("...\nNiepoprawna liczba oczek. Podaj liczbę od 1 do 6.");
        }
        rollInput.value = ""
    }

    play(roll) {
        renderers.renderRollNumber(roll);
        this.rolls.push(roll);
        this.calculatePosition(roll);
    }

    calculatePosition = function (roll) {
        let previousPosition = this.position;
        let newPosition = previousPosition + roll;
        const lastFieldNumber = this.numberOfGameFIelds;
        if (newPosition > lastFieldNumber) {
            newPosition = lastFieldNumber - (previousPosition + roll - lastFieldNumber);
            // newPosition = Math.abs(lastFieldNumber - (previousPosition + roll));
        } else if (newPosition === lastFieldNumber) {
            renderers.setActiveElement(previousPosition, newPosition);
            const message = "... \nJesteś na pozycji " + lastFieldNumber + ", gra zakończona sukcesem. "
            this.endGame(message);
            return;
        }
        this.position = newPosition;
        renderers.setActiveElement(previousPosition, this.position);
        const gameField = this.board.find(el => el.number === newPosition);
        if (gameField.special) {
            gameField.special();
        }
    }

    calculateAvarageRoll(rollsArray) {
        const sum = rollsArray.reduce((a, b) => a + b, 0);
        const avarage = sum / rollsArray.length;
        return avarage ? Math.round(avarage) : 0;
    }

    endGame(message = "") {
        this.gameInProgres = false;
        renderers.end();
        const averageRoll = this.calculateAvarageRoll(this.rolls);
        message = message + "\nLiczba rzutów: " + this.rolls.length + "\nŚrednia liczba wyrzuconych oczek: " + averageRoll;
        renderers.renderMessage(message);
    }

}


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