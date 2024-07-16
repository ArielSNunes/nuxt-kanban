export class Card {
    constructor(readonly title: string, public estimative: number) { }

    increaseEstimative() {
        this.estimative++;
    }

    decreaseEstimative() {
        if (this.estimative <= 0) {
            return;
        }
        this.estimative--;
    }
}