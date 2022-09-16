<template>
  <Rating
    :model-value="stars"
    :readonly="true"
    :cancel="false"
  />
</template>

<script setup>
defineProps({
  stars: {type: Number, default: 0},
});
</script>

<style>
div.p-rating {
  display: inline;
}
div.p-rating .p-rating-item .p-rating-icon {
  margin-left: .25rem;
  font-size: 1rem;
}
</style>
