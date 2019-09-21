class GameField {
    constructor(number, special = false) {
        this.number = number;
        this.special = special;
    }
}

class BoardGame {
    constructor() {
        this.board = this.createBoard();
        this.position = 0;
        this.rolls = [];
        this.gameInProgres = true;
        console.clear();
        console.log("Nowa gra");
    }

    createBoard = function () {
        let array = [];
        for (let i = 1; i <= 20; i++) {
            let gameField = new GameField(i);
            array.push(gameField);
        }
        array = this.setSpecialFields(array);
        return array;
    }

    setSpecialFields = function (array) {
        const specialFields = [{
                number: 12,
                fn: () => {
                    console.log("...");
                    console.log("12 to pole specjalne, gra zakończona porażką.")
                    this.endGame();
                }
            },
            {
                number: 19,
                fn: () => {
                    this.position = 11;
                    console.log("19 to pole specjalne, przenosisz się na pole 11.");
                }
            }
        ];
        specialFields.forEach((specialField) => {
            const gameField = array.find(el => el.number === specialField.number);
            gameField.special = specialField.fn;
        });
        return array;
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
                console.log("...");
                console.log("Niepoprawna liczba oczek. Podaj liczbę od 1 do 6");
        }
        rollInput.value = ""
    }

    play = function (roll) {
        this.rolls.push(roll);
        console.log("...");
        console.log("Liczba wyrzuconych oczek: " + roll);
        this.calculatePosition(roll);
    }

    calculatePosition = function (roll) {
        let previousPosition = this.position;
        let newPosition = previousPosition + roll;
        if (newPosition > 20) {
            newPosition = 20 - (previousPosition + roll - 20);
        } else if (newPosition === 20) {
            console.log("...");
            console.log("Jesteś na pozycji 20, gra zakończona sukcesem.")
            this.endGame();
            return;
        }
        this.position = newPosition;
        console.log("Jesteś na pozycji: " + newPosition);
        const gameField = this.board.find(el => el.number === newPosition);
        if (gameField.special) {
            gameField.special();
        }
    }

    calculateAvarageRoll = function (rollsArray) {
        const sum = rollsArray.reduce((a, b) => a + b, 0);
        const avarage = sum / rollsArray.length;
        return avarage ? Math.round(avarage) : 0;
    }

    endGame = function () {
        this.gameInProgres = false;
        console.log("...");
        console.log("Liczba rzutów: " + this.rolls.length);
        console.log("Średnia liczba wyrzuconych oczek: " + this.calculateAvarageRoll(this.rolls));
    }

}


let boardGame;

const startGame = function () {
    boardGame = new BoardGame();
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