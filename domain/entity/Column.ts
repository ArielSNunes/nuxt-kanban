import { BaseEntity } from "~/domain/entity/BaseEntity";
import { Card } from "~/domain/entity/Card";

export class Column extends BaseEntity {
    cards: Card[];

    constructor(readonly name: string, readonly hasEstimative: boolean) {
        super();
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