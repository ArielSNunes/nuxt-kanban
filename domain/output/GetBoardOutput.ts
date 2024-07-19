import type { ColumnOutput } from "~/domain/output/ColumnOutput"

export type GetBoardOutput = {
    id: number,
    name: string,
    estimative: number,
    columns: ColumnOutput[]
}