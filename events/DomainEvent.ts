export abstract class DomainEvent {
    constructor(readonly name: string, readonly data: any) { }
}