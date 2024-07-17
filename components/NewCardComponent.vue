<script lang="ts" setup>
import { Board } from '~/domain/entity/Board';
import { Column } from '~/domain/entity/Column';

defineProps({ board: Board, column: Column });
const cardTitle = ref('');
</script>

<template>
  <div class="card new-card" v-if="column && board">
    <input type="text" v-model="cardTitle" />
    <button @click="board.addCard(column.name, cardTitle, 0)">Add</button>
  </div>
</template>