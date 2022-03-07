<template>
  <Dropdown
    v-model="selected"
    :value="value"
    :options="makes"
    option-label="text"
    option-value="value"
    placeholder="Make"
    class="make m-1"
  />
</template>

<script setup>
import {ref, watch} from 'vue';
import NHTSA from '../constants/endpoints';
import axios from 'axios';

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
  axios
    .get(`${NHTSA.proxy}?quest=${NHTSA.endpoint}/modelyear/${props.year}`)
    .then(response => {
      makes.value = response.data.Results.map(result => {
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

<style>
div.make {
  flex: 0 0 210px;
}
</style>
