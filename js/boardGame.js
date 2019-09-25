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
        const gameBoardWinNumber = this.numberOfGameFIelds;
        if (newPosition > gameBoardWinNumber) {
            const rollExcess = Math.abs(gameBoardWinNumber - (previousPosition + roll))
            newPosition = gameBoardWinNumber - rollExcess;
            const message = "...Docierasz do ostatniego pola o numerze " + gameBoardWinNumber + ". Pozostałe punty ruchu to " + rollExcess + ". Cofasz się o tę wartość.";
            renderers.renderMessage(message);
        } else if (newPosition === gameBoardWinNumber) {
            renderers.setActiveElement(previousPosition, newPosition);
            const message = "... \nJesteś na pozycji " + gameBoardWinNumber + ", gra zakończona sukcesem. "
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