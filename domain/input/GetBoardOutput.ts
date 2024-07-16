import type { ColumnOutput } from "~/domain/output/ColumnOutput"

export type GetBoardOutput = {
    name: string,
    estimative: number,
    columns: ColumnOutput[]
}