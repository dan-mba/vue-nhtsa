<template>
  <Dropdown
    v-model="selected"
    :value="value"
    :options="years"
    option-label="value"
    option-value="value"
    placeholder="Year"
    class="grow-0 shrink-0 basis-[90px] m-1 dark:border-transparent"
    :pt="{label: 'py-2 px-[6px]'}"
  />
</template>

<script setup>
import {ref, watch, onMounted} from 'vue';
import getUrl from '../constants/endpoints';

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
  fetch(getUrl(''))
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
