import { expect, test } from "vitest";
import { mount } from '@vue/test-utils';
import { Board } from "~/domain/entity/Board";
import BoardComponent from "~/components/BoardComponent.vue";

test('Deve testar o componente de board', async function () {
    const board = new Board(1, "Projeto 01");
    board.addColumn('Todo', true);
    board.addColumn('Doing', true);
    board.addColumn('Done', false);
    board.addCard('Todo', 'Atividade 1', 3);
    board.addCard('Todo', 'Atividade 2', 2);
    board.addCard('Todo', 'Atividade 3', 1);

    const wrapper = mount(BoardComponent, {
        props: { board }
    });
    expect(wrapper.get('#estimative').text()).toBe('6');
});