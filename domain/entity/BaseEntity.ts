import type { DomainEvent } from "~/events/DomainEvent";
import type { Events } from "~/events/Events";

export class BaseEntity {
    private callbacks: { eventName: string, callback: Function }[];

    constructor() {
        this.callbacks = [];
    }

    on(eventName: Events, callback: (event: DomainEvent) => void) {
        this.callbacks.push({ eventName, callback });
    }

    publish(event: DomainEvent) {
        for (const callback of this.callbacks) {
            if (callback.eventName === event.name) {
                callback.callback(event);
            }
        }
    }
}