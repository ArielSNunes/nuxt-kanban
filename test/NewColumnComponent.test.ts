import { expect, test } from "vitest";
import { mount } from '@vue/test-utils';
import { Board } from "~/domain/entity/Board";
import NewColumnComponent from "~/components/NewColumnComponent.vue";
import { Events } from "~/events/Events";
import type { AddColumnEvent } from "~/events/AddColumnEvent";
import type { DomainEvent } from "~/events/DomainEvent";

test('Deve testar o componente de new column', async function () {
    const board = new Board(1, "Projeto 01");
    board.addColumn('Todo', true);
    board.addColumn('Doing', true);
    board.addColumn('Done', false);
    board.addCard('Todo', 'Atividade 1', 3);
    board.addCard('Todo', 'Atividade 2', 2);
    board.addCard('Todo', 'Atividade 3', 1);
    expect(board.columns).toHaveLength(3);

    const events: DomainEvent[] = [];
    board.on(Events.ADD_COLUMN, function (event: AddColumnEvent) {
        events.push(event);
    });

    const wrapper = mount(NewColumnComponent, { props: { board } });
    const newColumnName = 'Coluna Teste 001';
    await wrapper.get('.new-column-input').setValue(newColumnName);
    await wrapper.get('.new-column-button').trigger('click');
    expect(board.columns).toHaveLength(4);
    expect(events).toHaveLength(1);

    const [event] = events;
    expect(event.data.name).toBe(newColumnName);
    expect(event.name).toBe(Events.ADD_COLUMN);
});