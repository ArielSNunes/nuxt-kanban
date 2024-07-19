<script lang="ts" setup>
import { Board } from '~/domain/entity/Board';
import { AddColumnEvent } from '~/events/AddColumnEvent';
import { Events } from '~/events/Events';

const data = reactive<{ board: Board | undefined }>({
  board: undefined
});

onMounted(async () => {
  const { $boardService } = useNuxtApp();
  const board = await $boardService.getBoard(1);
  if (board) {
    data.board = board;
    board.on(Events.ADD_COLUMN, async function (event: AddColumnEvent) {
      await $boardService.saveColumn(event.data);
    });
  }
})
</script>

<template>
  <BoardComponent :board="data.board" />
</template>

<style scoped></style>