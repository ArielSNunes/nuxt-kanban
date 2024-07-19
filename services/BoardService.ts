import type { Board } from "~/domain/entity/Board";
import type { SaveColumnInput } from "~/domain/input/SaveColumnInput";

export interface BoardService {
    getBoard(boardId: number): Promise<Board | null>;
    saveColumn(column: SaveColumnInput): Promise<number | null>;
}