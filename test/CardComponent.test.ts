import { beforeEach, expect, test } from "vitest";
import { mount } from '@vue/test-utils';
import { Board } from "~/domain/entity/Board";
import CardComponent from "~/components/CardComponent.vue";

let board: Board;
beforeEach(() => {
    board = new Board(1, "Projeto 01");
    board.addColumn('Todo', true);
    board.addColumn('Doing', true);
    board.addColumn('Done', false);
    board.addCard('Todo', 'Atividade 1', 3);
    board.addCard('Todo', 'Atividade 2', 2);
    board.addCard('Todo', 'Atividade 3', 1);
});

test('Deve testar o componente de card', async function () {
    const wrapper = mount(CardComponent, {
        props: { board, card: board.columns[0].cards[0] }
    });
    expect(wrapper.get('.estimative').text()).toBe('3');
});

test('Deve testar o componente de card para o segundo card', async function () {
    const wrapper = mount(CardComponent, {
        props: { board, card: board.columns[0].cards[1] }
    });
    expect(wrapper.get('.estimative').text()).toBe('2');
});

test('Deve testar o componente de card para o terceiro card', async function () {
    const wrapper = mount(CardComponent, {
        props: { board, card: board.columns[0].cards[2] }
    });
    expect(wrapper.get('.estimative').text()).toBe('1');
});

test('Deve testar o clique para reduzir estimativa', async function () {
    const wrapper = mount(CardComponent, {
        props: { board, card: board.columns[0].cards[2] }
    });
    expect(wrapper.get('.estimative').text()).toBe('1');
    await wrapper.get('.card-decrease-estimative').trigger('click');
    expect(wrapper.get('.estimative').text()).toBe('0');
});

test('Deve testar o clique para aumentar estimativa', async function () {
    const wrapper = mount(CardComponent, {
        props: { board, card: board.columns[0].cards[2] }
    });
    expect(wrapper.get('.estimative').text()).toBe('1');
    await wrapper.get('.card-increase-estimative').trigger('click');
    expect(wrapper.get('.estimative').text()).toBe('2');
    await wrapper.get('.card-increase-estimative').trigger('click');
    expect(wrapper.get('.estimative').text()).toBe('3');
});

test('Deve testar o clique para reduzir estimativa, nunca menor do que zero', async function () {
    const wrapper = mount(CardComponent, {
        props: { board, card: board.columns[0].cards[2] }
    });
    expect(wrapper.get('.estimative').text()).toBe('1');
    await wrapper.get('.card-decrease-estimative').trigger('click');
    expect(wrapper.get('.estimative').text()).toBe('0');
    await wrapper.get('.card-decrease-estimative').trigger('click');
    expect(wrapper.get('.estimative').text()).toBe('0');
    await wrapper.get('.card-decrease-estimative').trigger('click');
    expect(wrapper.get('.estimative').text()).toBe('0');
    await wrapper.get('.card-decrease-estimative').trigger('click');
    expect(wrapper.get('.estimative').text()).toBe('0');
});