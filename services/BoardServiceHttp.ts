import { Board } from "~/domain/entity/Board";
import type { SaveColumnInput } from "~/domain/input/SaveColumnInput";
import type { GetBoardOutput } from "~/domain/output/GetBoardOutput";
import type { HttpClient } from "~/infra/http/HttpClient";
import type { BoardService } from "~/services/BoardService";

export class BoardServiceHttp implements BoardService {

    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) { }

    async getBoard(boardId: number): Promise<Board | null> {
        const data = await this.httpClient.get<GetBoardOutput>(
            `${this.baseUrl}/boards/${boardId}`
        );
        const boardData = data;
        if (boardData) {
            const board = new Board(boardData.id, boardData.name);
            for (const columnData of boardData.columns) {
                board.addColumn(columnData.name, columnData.hasEstimative);
                for (const cardData of columnData.cards) {
                    board.addCard(columnData.name, cardData.title, cardData.estimative);
                }
            }
            return board;
        }
        return null;
    }

    async saveColumn(column: SaveColumnInput): Promise<number | null> {
        const data = await this.httpClient.post<number>(
            `${this.baseUrl}/boards/${column.boardId}/columns`,
            column
        );
        return data;
    }
}