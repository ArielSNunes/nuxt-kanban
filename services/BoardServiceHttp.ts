import { Board } from "~/domain/entity/Board";
import type { GetBoardOutput } from "~/domain/input/GetBoardOutput";
import type { BoardService } from "~/services/BoardService";

export class BoardServiceHttp implements BoardService {
    async getBoard(boardId: number): Promise<Board | null> {
        const { data: responseData } = await useFetch<GetBoardOutput>(
            `http://localhost/boards/${boardId}`,
            {
                method: 'get'
            }
        );
        const boardData = responseData.value;
        if (boardData) {
            const board = new Board(boardData.name);
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
}