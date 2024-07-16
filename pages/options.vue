<script lang="ts">
export default {
    data() {
        return {
            board: {
                name: "Projeto 01",
                columns: [
                    {
                        name: 'Todo',
                        cards: [
                            { title: 'A', estimative: 3 },
                            { title: 'B', estimative: 2 },
                            { title: 'C', estimative: 1 }
                        ]
                    },
                    {
                        name: 'Doing',
                        cards: []
                    },
                    {
                        name: 'Done',
                        cards: []
                    }
                ]
            },
            columnName: '',
            cardTitle: ''
        }
    },
    async mounted() {
        const { data, status, error } = await useFetch<any>('http://localhost/boards/1', {
            method: 'get'
        });
        this.board = data.value;
    },
    methods: {
        async addColumn(columnName: string) {
            this.board.columns.push({
                name: columnName,
                cards: []
            })
        },
        async addCard(column: typeof this.board.columns[0], cardTitle: string) {
            column.cards.push({ title: cardTitle, estimative: 3 })
            column.estimative += 3;
        },
        async increaseEstimative(card: any) {
            card.estimative++;
        },
        async decreaseEstimative(card: any) {
            card.estimative--;
        }
    },
    computed: {
        boardEstimative() {
            return this.board.columns.reduce((total, col) => {
                return total + col.estimative;
            }, 0);
        }
    }
}
</script>

<template>
    <h3 class="font-bold text-3xl">
        {{ board.name }} ({{ boardEstimative }})
    </h3>
    <div class="columns">
        <div v-for="column in board.columns" class="column">
            <h4 class="font-bold text-2xl">{{ column.name }} ({{ column.estimative }})</h4>
            <div v-for="card in column.cards" class="card">
                {{ card.title }} ({{ card.estimative }})
                <br />
                <button @click="decreaseEstimative(card)">-</button>
                <button @click="increaseEstimative(card)">+</button>
            </div>
            <div class="card new-card">
                {{ cardTitle }}
                <input type="text" v-model="cardTitle" />
                <button @click="addCard(column, cardTitle)">Add</button>

            </div>
        </div>
        <div class="column new-column">
            {{ columnName }}
            <input type="text" v-model="columnName" />
            <button @click="addColumn(columnName)">Add</button>
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
    @apply flex items-center justify-center text-center bg-amber-300 h-20 border border-black border-solid mb-3 w-full;
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
    @apply border border-black p-3 h-3 w-3 flex items-center justify-center mx-1;
}
</style>