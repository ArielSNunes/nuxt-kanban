<script lang="ts" setup>
import { Board } from '~/domain/entity/Board';
import type { GetBoardOutput } from '~/domain/input/GetBoardOutput';

const data = reactive<{ board: Board | undefined }>({
    board: undefined
});
const cardTitle = ref('');
const columnName = ref('');

onMounted(async () => {
    const { data: responseData } = await useFetch<GetBoardOutput>('http://localhost/boards/1', {
        method: 'get'
    });
    const boardData = responseData.value;
    if (boardData) {
        const board = new Board(boardData.name);
        for (const columnData of boardData.columns) {
            board.addColumn(columnData.name, columnData.hasEstimative);
            for (const cardData of columnData.cards) {
                board.addCard(columnData.name, cardData.title, cardData.estimative);
            }
        }
        data.board = board;
    }
})
</script>

<template>
    <div v-if="data.board" class="flex flex-col items-center justify-center">
        <h3 class="font-bold text-3xl my-5">
            {{ data.board.name }} ({{ data.board.getEstimative() }})
        </h3>
        <div class="columns">
            <div v-for="column in data.board.columns" class="column">
                <h4 class="font-bold text-2xl py-5">{{ column.name }} ({{ column.getEstimative() }})</h4>
                <div v-for="card in column.cards" class="card">
                    {{ card.title }} ({{ card.estimative }})
                    <div class="card-buttons">
                        <button @click="data.board.decreaseEstimative(card)">-</button>
                        <button @click="data.board.increaseEstimative(card)">+</button>
                    </div>
                </div>
                <div class="card new-card">
                    {{ cardTitle }}
                    <input type="text" v-model="cardTitle" />
                    <button @click="data.board?.addCard(column.name, cardTitle, 0)">Add</button>

                </div>
            </div>
            <div class="column new-column">
                {{ columnName }}
                <input type="text" v-model="columnName" />
                <button @click="data.board?.addColumn(columnName, true)">Add</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.columns {
    @apply flex flex-row;
}

.column {
    @apply w-52 text-center bg-gray-400 mr-1 p-3 border border-black border-solid;
}

.card {
    @apply flex flex-col items-center justify-center text-center bg-amber-300 h-24 border border-black border-solid mb-3 w-full py-3 rounded-lg;
}

.card-buttons {
    @apply flex flex-row gap-3;
}

.new-column {
    @apply bg-gray-300 border-dashed border border-black flex flex-col;
}

.new-card {
    @apply bg-gray-300 border-dashed border border-black flex flex-col;
}

.new-column input,
.new-card input {
    @apply max-w-[85%] mx-auto;
}

button {
    @apply border border-black p-3 px-6 h-3 w-3 flex items-center justify-center mx-1 my-2;
}
</style>