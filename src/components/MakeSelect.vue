<template>
  <Dropdown
    v-model="selected"
    :value="value"
    :options="makes"
    option-label="text"
    option-value="value"
    placeholder="Make"
    class="grow-0 shrink-0 basis-[210px] m-1 dark:border-transparent"
    :pt="{label: 'p-2'}"
  />
</template>

<script setup>
import {ref, watch} from 'vue';
import getUrl from '../constants/endpoints';

const props = defineProps({
  value: {type: String, default: ''},
  year: {type: String, default: ''},
});
const emit = defineEmits(['input']);

const makes = ref([]);
const selected = ref('');

watch(() => props.year, () => {
  if(props.year === '') {
    makes.value=[];
    return;
  }
  selected.value = '';
  fetch(getUrl(`/modelyear/${props.year}`))
    .then(res => res.json())
    .then(response => {
      makes.value = response.Results.map(result => {
        return {
          value: result.Make.replace(/&/g,'_'),
          text: result.Make
        }
      })
    })
    .catch(error => {
      console.log(error);
    })
});

watch(selected, () => {
  emit('input', selected.value);
});
</script>
