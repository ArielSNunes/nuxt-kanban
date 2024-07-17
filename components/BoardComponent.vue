<script lang="ts" setup>
import ColumnComponent from '~/components/ColumnComponent.vue';
import NewCardComponent from '~/components/NewCardComponent.vue';
import NewColumnComponent from '~/components/NewColumnComponent.vue';
import { Board } from '~/domain/entity/Board';

defineProps({ board: Board });
const cardTitle = ref('');
const columnName = ref('');
</script>

<template>
  <div v-if="board" class="flex flex-col items-center justify-center">
    <h3 class="font-bold text-3xl my-5">
      {{ board.name }} (<span id="estimative">{{ board.getEstimative() }}</span>)
    </h3>
    <div class="columns">
      <div v-for="column in board.columns" class="column">
        <ColumnComponent :board="board" :column="column" />
        <NewCardComponent :board="board" :column="column" />
      </div>
      <NewColumnComponent :board="board" />
    </div>
  </div>
</template>

<style>
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