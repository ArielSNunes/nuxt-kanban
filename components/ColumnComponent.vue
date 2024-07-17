<script lang="ts" setup>
import CardComponent from '~/components/CardComponent.vue';
import { Board } from '~/domain/entity/Board';
import { Column } from '~/domain/entity/Column';

defineProps({ board: Board, column: Column })
</script>

<template>
  <div v-if="column">
    <h4 class="font-bold text-2xl py-5">
      {{ column.name }} (<span class="estimative">{{ column.getEstimative() }}</span>)
    </h4>
    <div v-for="card in column.cards" class="card">
      <CardComponent :card="card" :board="board" />
    </div>
  </div>
</template>