import type { SaveColumnInput } from "~/domain/input/SaveColumnInput";
import { DomainEvent } from "~/events/DomainEvent";
import { Events } from "~/events/Events";

export class AddColumnEvent extends DomainEvent {
    constructor(override readonly data: SaveColumnInput) {
        super(Events.ADD_COLUMN, data);
    }
}