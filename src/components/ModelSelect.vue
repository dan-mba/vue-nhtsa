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

<script>
import NHTSA from '../constants/endpoints';
import axios from 'axios-jsonp-pro';

export default {
  name: 'ModelSelect',
  props: {
    value: {type: String, default: ''},
    year: {type: String, default: ''},
    make: {type: String, default: ''},
  },
  emits: ['input'],
  data (){
    return {
      models: [],
      selected: ""
    }
  },
  watch: {
    year: function (){
      if((this.year === "") || (this.make === "")) {
        this.models=[];
        return;
      }
      this.selected="";
      this.getData();
    },
    make: function (){
      if((this.year === "") || (this.make === "")) {
        this.models=[];
        return;
      }
      this.selected="";
      this.getData();
    },
    selected: function() {
      this.$emit('input', this.selected);
    }
  },
  methods: {
    getData: function (){
      axios
        .jsonp(NHTSA.endpoint
          + '/modelyear/' + this.year
          + '/make/' + this.make
          + NHTSA.dataType)
        .then(response => {
          this.models = response.Results.map(result => {
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
  }
}
</script>

<style>
div.model {
  flex: 0 0 300px;
}
</style>
