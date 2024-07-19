import { BaseEntity } from "~/domain/entity/BaseEntity";
import { Card } from "~/domain/entity/Card";
import { Column } from "~/domain/entity/Column";
import { AddColumnEvent } from "~/events/AddColumnEvent";

export class Board extends BaseEntity {
    columns: Column[];

    constructor(readonly id: number, readonly name: string) {
        super();
        this.columns = [];
    }

    getEstimative() {
        return this.columns.reduce(
            (total: number, col: Column) => total + col.getEstimative(), 0
        );
    }

    addColumn(name: string, hasEstimative: boolean) {
        this.columns.push(new Column(name, hasEstimative));
        const domainEvent = new AddColumnEvent({
            name, hasEstimative, boardId: this.id
        });
        this.publish(domainEvent);
    }

    addCard(columnName: string, cardTitle: string, cardEstimative: number) {
        const column = this.columns.find(col => col.name === columnName);
        if (!column) throw new Error('Column not found');
        column.addCard(new Card(cardTitle, cardEstimative));
    }

    decreaseEstimative(card: Card) {
        card.decreaseEstimative();
    }

    increaseEstimative(card: Card) {
        card.increaseEstimative();
    }
}