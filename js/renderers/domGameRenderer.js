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