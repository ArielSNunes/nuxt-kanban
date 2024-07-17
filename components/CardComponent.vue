<script lang="ts" setup>
import { Board } from '~/domain/entity/Board';
import { Card } from '~/domain/entity/Card';

defineProps({ board: Board, card: Card });
</script>

<template>
  <div v-if="card">
    {{ card.title }} (<span class="estimative">{{ card.estimative }}</span>)
    <div class="card-buttons">
      <button class="card-decrease-estimative" @click="board?.decreaseEstimative(card)">-</button>
      <button class="card-increase-estimative" @click="board?.increaseEstimative(card)">+</button>
    </div>
  </div>
</template>