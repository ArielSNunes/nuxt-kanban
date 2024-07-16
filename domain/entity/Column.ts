import { Card } from "~/domain/entity/Card";

export class Column {
    cards: Card[];

    constructor(readonly name: string, readonly hasEstimative: boolean) {
        this.cards = [];
    }

    addCard(card: Card) {
        this.cards.push(card);
    }

    getEstimative() {
        return this.cards.reduce(
            (total: number, card: Card) => total + card.estimative, 0
        );
    }
}