import { expect, test } from "vitest";
import { mount } from '@vue/test-utils';
import BoardView from "~/components/BoardView.vue";
import type { BoardService } from "~/services/BoardService";
import { Board } from "~/domain/entity/Board";

const sleep = (ms: number) => new Promise(
    resolve => setTimeout(() => resolve(true), ms)
);

test('Deve testar a tela de board', async function () {
    const boardService: BoardService = {
        async getBoard(boardId) {
            const board = new Board("Projeto 01");
            board.addColumn('Todo', true);
            board.addColumn('Doing', true);
            board.addColumn('Done', false);
            board.addCard('Todo', 'Atividade 1', 3);
            board.addCard('Todo', 'Atividade 2', 2);
            board.addCard('Todo', 'Atividade 3', 1);
            return board;
        },
    }
    const wrapper = mount(BoardView, {
        global: {
            provide: boardService
        }
    });
    await sleep(200);
    expect(wrapper.get('#estimative').text()).toBe('(6)');
});