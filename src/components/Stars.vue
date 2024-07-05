<template>
  <span>
    <Rating
      :model-value="stars"
      :readonly="true"
      :cancel="false"
    />
  </span>
</template>

<script setup>
defineProps({
  stars: {type: Number, default: 0},
});
</script>

<style>
@layer primevue {
  div.p-rating {
    display: inline;
  }
  div.p-rating .p-rating-option .p-rating-icon {
    margin-left: .2rem;
    font-size: 1rem;
  }
}
</style>
