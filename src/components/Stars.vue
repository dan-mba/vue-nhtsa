<template>
  <Rating
    :model-value="stars"
    :readonly="true"
    :cancel="false"
  />
</template>

<script setup>
import {defineProps} from 'vue';
defineProps({
  stars: {type: Number, default: 0},
});
</script>

<style>
.p-rating {
  display: inline;
}
div.p-rating .p-rating-icon {
  margin-left: .25rem;
  font-size: 1rem;
}
</style>
