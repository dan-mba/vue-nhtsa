<template>
  <Rating :modelValue="stars" :readonly="true" :cancel="false"/>
</template>

<script>
export default {
  name: 'Stars',
  props: {
    stars: Number,
  }
}
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
