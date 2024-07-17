<script lang="ts" setup>
import { Board } from '~/domain/entity/Board';

const data = reactive<{ board: Board | undefined }>({
  board: undefined
});

onMounted(async () => {
  const { $boardService } = useNuxtApp();
  const board = await $boardService.getBoard(1);
  if (board) {
    data.board = board;
  }
})
</script>

<template>
  <BoardComponent :board="data.board" />
</template>

<style scoped></style>