import type { Board } from "~/domain/entity/Board";

export interface BoardService {
    getBoard(boardId: number): Promise<Board | null>;
}