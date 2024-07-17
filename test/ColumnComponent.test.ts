import { expect, test } from "vitest";
import { mount } from '@vue/test-utils';
import ColumnComponent from "~/components/ColumnComponent.vue";
import { Board } from "~/domain/entity/Board";

test('Deve testar o componente de column', async function () {
    const board = new Board("Projeto 01");
    board.addColumn('Todo', true);
    board.addColumn('Doing', true);
    board.addColumn('Done', false);
    board.addCard('Todo', 'Atividade 1', 3);
    board.addCard('Todo', 'Atividade 2', 2);
    board.addCard('Todo', 'Atividade 3', 1);

    const wrapper = mount(ColumnComponent, {
        props: { board, column: board.columns[0] }
    });
    expect(wrapper.get('.estimative').text()).toBe('6');
});
test('Deve testar o componente de column para a segunda coluna', async function () {
    const board = new Board("Projeto 01");
    board.addColumn('Todo', true);
    board.addColumn('Doing', true);
    board.addColumn('Done', false);
    board.addCard('Todo', 'Atividade 1', 3);
    board.addCard('Todo', 'Atividade 2', 2);
    board.addCard('Todo', 'Atividade 3', 1);

    const wrapper = mount(ColumnComponent, {
        props: { board, column: board.columns[1] }
    });
    expect(wrapper.get('.estimative').text()).toBe('0');
});