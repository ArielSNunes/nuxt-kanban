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
                            { title: 'A' },
                            { title: 'B' },
                            { title: 'C' }
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
            }
        }
    }
}
</script>

<template>
    <h3 class="font-bold text-3xl">
        {{ board.name }}
    </h3>
    <div class="columns">
        <div v-for="column in board.columns" class="column">
            <h4 class="font-bold text-2xl">{{ column.name }}</h4>
            <div v-for="card in column.cards" class="card">
                {{ card.title }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.columns {
    @apply flex;
    @apply flex-row;
}

.column {
    @apply w-52;
    @apply text-center;
    @apply bg-gray-400;
    @apply mr-1;
    @apply p-3;
    @apply border;
    @apply border-black;
    @apply border-solid;

}

.card {
    @apply flex;
    @apply items-center;
    @apply justify-center;
    @apply text-center;
    @apply bg-amber-300;
    @apply h-20;
    @apply border;
    @apply border-black;
    @apply border-solid;
    @apply mb-3;
    @apply w-full;
}
</style>