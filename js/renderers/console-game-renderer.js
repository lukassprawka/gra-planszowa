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