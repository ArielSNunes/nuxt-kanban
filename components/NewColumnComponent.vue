<script lang="ts" setup>
import { Board } from '~/domain/entity/Board';

defineProps({ board: Board });
const columnName = ref('');
</script>

<template>
  <div class="column new-column" v-if="board">
    <input type="text" v-model="columnName" />
    <button @click="board.addColumn(columnName, true)">Add</button>
  </div>
</template>

<style scoped></style>