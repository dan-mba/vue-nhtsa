<template>
  <Dropdown
    v-model="selected"
    :value="value"
    :options="years"
    option-label="value"
    option-value="value"
    placeholder="Year"
    class="year m-1"
  />
</template>

<script setup>
import {ref, watch, onMounted} from 'vue';
import NHTSA from '../constants/endpoints';

defineProps({
  value: {type: String, default: ''}
});
const emit = defineEmits(['input']);

const years = ref([]);
const selected = ref('');

watch(selected, () => {
  emit('input', selected.value.toString());
});

onMounted(() => {
  fetch(`${NHTSA.proxy}?quest=${NHTSA.endpoint}`)
    .then(res => res.json())
    .then(response => {
      years.value = response.Results.map(result => {
        return {value: `${result.ModelYear}`}
      });
    })
    .catch(error => {
      console.log(error);
    })
});
</script>

<style>
div.year {
  flex: 0 0 90px;
}
</style>
