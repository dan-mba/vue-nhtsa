<template>
  <Dropdown
    v-model="selected"
    :value="value"
    :options="descriptions"
    option-label="text"
    option-value="value"
    placeholder="Vehicle Description"
    class="grow-0 shrink-0 basis-[320px] m-1 dark:border-transparent"
    :pt="{label: 'p-2'}"
  />
</template>

<script setup>
import {ref, watch} from 'vue';
import getUrl from '../constants/endpoints';

const props = defineProps({
  value: {type: String, default: ''},
  year: {type: String, default: ''},
  make: {type: String, default: ''},
  model: {type: String, default: ''},
});
const emit = defineEmits(['input']);
const descriptions = ref([]);
const selected = ref('');

watch(() => props.year, () => {
  if((props.year === "") || (props.make === "") || (props.model === "")) {
    descriptions.value=[];
    return;
  }
  getData();
});
watch(() => props.make, () => {
  if((props.year === "") || (props.make === "") || (props.model === "")) {
    descriptions.value=[];
    return;
  }
  getData();
});    
watch(() => props.model, () => {
  if((props.year === "") || (props.make === "") || (props.model === "")) {
    descriptions.value=[];
    return;
  }
  getData();
});
watch (selected, () => {
  emit('input', selected.value);
});

function getData() {
  selected.value = '';
  fetch(getUrl(`/modelyear/${props.year}/make/${props.make}/model/${props.model}`))
    .then(res => res.json())
    .then(response => {
      descriptions.value = response.Results.map(result => {
        return {
          value: result.VehicleId,
          text: result.VehicleDescription
        }
      })
    })
    .catch(error => {
      console.log(error);
    })
}
</script>
