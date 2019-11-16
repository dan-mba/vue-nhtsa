<template>
  <span>
    <font-awesome-icon 
      v-for="count in stars"
      :key="count"
      :icon="['fas','star']"
    ></font-awesome-icon>
    <font-awesome-icon 
      v-for="count in emptyStars"
      :key="count+stars"
      :icon="['far','star']"
    ></font-awesome-icon>
  </span>
</template>

<script>
export default {
  name: 'Stars',
  props: {
    stars: Number,
  },
  data() {
    return {
      emptyStars: 5-this.stars,
    }
  }
}
</script>

<style>

</style>
