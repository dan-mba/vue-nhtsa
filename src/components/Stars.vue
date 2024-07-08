<template>
  <span>
    <Rating
      :model-value="stars"
      :readonly="true"
      :cancel="false"
      :pt="{root: 'inline', onicon: 'ml-1 text-base', officon: 'ml-1 text-base'}"
    />
  </span>
</template>

<script setup>
defineProps({
  stars: {type: Number, default: 0},
});
</script>
