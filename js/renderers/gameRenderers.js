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