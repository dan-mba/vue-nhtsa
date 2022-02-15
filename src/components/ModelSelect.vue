<template>
  <Dropdown
    v-model="selected"
    :value="value"
    :options="models"
    option-label="text"
    option-value="value"
    placeholder="Model"
    class="model m-1"
  />
</template>

<script setup>
import {ref, watch, defineProps, defineEmits} from 'vue';
import NHTSA from '../constants/endpoints';
import axios from 'axios';

const props = defineProps({
    value: {type: String, default: ''},
    year: {type: String, default: ''},
    make: {type: String, default: ''},
});

const emit = defineEmits(['input']);
const models = ref([]);
const selected = ref('');

watch(() => props.year, () => {
  if((props.year === '') || (props.make === '')) {
    models.value=[];
    return;
  }
  selected.value = '';
  getData();
});

watch(() => props.make, () => {
  if((props.year === '') || (props.make === '')) {
    models.value=[];
    return;
  }
  selected.value = '';
  getData();
});

watch (selected, () => {
  emit('input', selected.value);
});

function getData() {
  axios
    .get(`${NHTSA.proxy}?quest=${NHTSA.endpoint}/modelyear/${props.year}/make/${props.make}`)
    .then(response => {
      models.value = response.data.Results.map(result => {
        return {
          value: result.Model.replace(/&/g,'_'),
          text: result.Model
        }
      })
    })
    .catch(error => {
      console.log(error);
    })
}
</script>

<style>
div.model {
  flex: 0 0 300px;
}
</style>
