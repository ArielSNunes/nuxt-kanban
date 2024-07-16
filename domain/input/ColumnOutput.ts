import type { CardOutput } from "~/domain/output/CardOutput"

export type ColumnOutput = {
    name: string,
    estimative: number,
    hasEstimative: boolean,
    cards: CardOutput[]
}