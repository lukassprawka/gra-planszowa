class GameField {
    constructor(number, special = false) {
        this.number = number;
        this.special = special;
    }
}

class BoardGame {
    constructor() {
        this.board = [];
        this.position = 0;
        this.rolls = [];
        this.gameInProgres = true;
    }

    startGame = function () {
        this.createBoard();
        const rollNumberElement = document.getElementById("rollNumber");
        rollNumberElement.innerText = "";
        console.clear();
        console.log("Nowa gra");
    }

    createBoard = function () {
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

        let boardGameFields = [];
        for (let i = 1; i <= 20; i++) {
            let gameField = new GameField(i);
            boardGameFields.push(gameField);
            const fieldElement = document.createElement("div");
            fieldElement.setAttribute("id", i);
            fieldElement.className = "gameField";
            const textElement = document.createElement("span");
            textElement.innerText = i;
            fieldElement.append(textElement);
            boardElement.append(fieldElement);
        }
        boardGameFields = this.setSpecialFields(boardGameFields);
        this.board = boardGameFields;
    }

    setSpecialFields = function (boardGameFields) {
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
                    const previousActiveFieldElement = document.getElementById(this.position);
                    previousActiveFieldElement.classList.remove("activePosition");
                    const auctualActiveFieldElement = document.getElementById(11);
                    auctualActiveFieldElement.className += " activePosition";
                    const message = "...\n19 to pole specjalne, przenosisz się na pole 11."
                    console.log(message);
                    alert(message);
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

    rollTheDice = function () {
        const roll = Math.floor(Math.random() * 6) + 1;
        this.play(roll);
    }

    useGivenRoll = function () {
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
                const message = "...\nNiepoprawna liczba oczek. Podaj liczbę od 1 do 6."
                console.log(message);
                alert(message);
        }
        rollInput.value = ""
    }

    play = function (roll) {
        const rollNumberElement = document.getElementById("rollNumber");
        rollNumberElement.innerText = roll;
        this.rolls.push(roll);
        console.log("...\nLiczba wyrzuconych oczek: " + roll);
        this.calculatePosition(roll);
    }

    calculatePosition = function (roll) {
        let previousPosition = this.position;
        let newPosition = previousPosition + roll;
        if (newPosition > 20) {
            newPosition = 20 - (previousPosition + roll - 20);
        } else if (newPosition === 20) {
            this.setActiveElement(previousPosition, newPosition);
            const message = "... \nJesteś na pozycji 20, gra zakończona sukcesem. "
            this.endGame(message);
            return;
        }
        this.position = newPosition;
        console.log("Jesteś na pozycji: " + newPosition);
        this.setActiveElement(previousPosition, this.position);
        const gameField = this.board.find(el => el.number === newPosition);
        if (gameField.special) {
            gameField.special();
        }
    }

    setActiveElement = function (previousPosition, actualPosition) {
        const previousActiveFieldElement = document.getElementById(previousPosition);
        previousActiveFieldElement.classList.remove("activePosition");
        const auctualActiveFieldElement = document.getElementById(actualPosition);
        auctualActiveFieldElement.className += " activePosition";
    }

    calculateAvarageRoll = function (rollsArray) {
        const sum = rollsArray.reduce((a, b) => a + b, 0);
        const avarage = sum / rollsArray.length;
        return avarage ? Math.round(avarage) : 0;
    }

    endGame = function (message = "") {
        this.gameInProgres = false;
        const averageRoll = this.calculateAvarageRoll(this.rolls);
        message = message + "\nLiczba rzutów: " + this.rolls.length + "\nŚrednia liczba wyrzuconych oczek: " + averageRoll;
        console.log(message);
        alert(message);
    }

}


let boardGame;

const startGame = function () {
    boardGame = new BoardGame();
    boardGame.startGame();
    manageButtons();
}

const rollTheDice = function () {
    boardGame.rollTheDice();
    manageButtons();
}

const useGivenRoll = function () {
    boardGame.useGivenRoll();
    manageButtons();
}

const useGivenRollIfPressedKeyIsEnter = function (event) {
    if (event.code === "Enter") {
        boardGame.useGivenRoll();
        manageButtons();
    }
}

const endGame = function () {
    boardGame.endGame();
    manageButtons();
}

const manageButtons = function () {
    if (boardGame.gameInProgres) {
        document.getElementById("rollButton").disabled = false;
        document.getElementById("rollInput").disabled = false;
        document.getElementById("specifyRollButton").disabled = false;
        document.getElementById("endButton").disabled = false;
    } else {
        document.getElementById("rollButton").disabled = true;
        document.getElementById("rollInput").disabled = true;
        document.getElementById("specifyRollButton").disabled = true;
        document.getElementById("endButton").disabled = true;
    }
}