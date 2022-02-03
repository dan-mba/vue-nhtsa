<template>
  <Dropdown
    v-model="selected"
    :value="value"
    :options="descriptions"
    option-label="text"
    option-value="value"
    placeholder="Vehicle Description"
    class="desc m-1"
  />
</template>

<script>
import NHTSA from '../constants/endpoints';
import axios from 'axios';

export default {
  name: 'DescSelect',
  props: {
    value: {type: String, default: ''},
    year: {type: String, default: ''},
    make: {type: String, default: ''},
    model: {type: String, default: ''},
  },
  emits: ['input'],
  data (){
    return {
      descriptions: [],
      selected: ""
    }
  },
  watch: {
    year: function (){
      if((this.year === "") || (this.make === "") || (this.model === "")) {
        this.descriptions=[];
        return;
      }
      this.getData();
    },
    make: function (){
      if((this.year === "") || (this.make === "") || (this.model === "")) {
        this.descriptions=[];
        return;
      }
      this.getData();
    },
    model: function (){
      if((this.year === "") || (this.make === "") || (this.model === "")) {
        this.descriptions=[];
        return;
      }
      this.getData();
    },
    selected: function (){
      this.$emit('input', this.selected.toString());
    }
  },
  methods: {
    getData: function (){
      this.selected="";
      axios
        .get(`${NHTSA.proxy}?quest=${NHTSA.endpoint}/modelyear/${this.year}/make/${this.make}/model/${this.model}`)
        .then(response => {
          this.descriptions = response.data.Results.map(result => {
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
  }
}
</script>

<style>
div.desc {
  flex: 0 0 320px;
}
</style>
