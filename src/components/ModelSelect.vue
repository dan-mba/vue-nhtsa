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
import {ref, watch} from 'vue';
import getUrl from '../constants/endpoints';

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
  fetch(getUrl(`/modelyear/${props.year}/make/${props.make}`))
    .then(res => res.json())
    .then(response => {
      models.value = response.Results.map(result => {
        return {
          value: result.Model.replace(/&/g,'_').replace(/ /g,'%20'),
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
