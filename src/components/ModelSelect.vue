<template>
  <div class="select-div" style="flex:0 0 320px;">
    <select :value=value @input="$emit('input',$event.target.value)">
      <option value="">Model:</option>
      <option v-for="model in models" :key="model.name" :value="model.value">{{model.name}}</option>
    </select>
  </div>
</template>

<script>
import NHTSA from '../constants/endpoints'
import axios from 'axios-jsonp-pro'

export default {
  name: 'ModelSelect',
  props: {
    value: String,
    year: String,
    make: String,
  },
  data (){
    return {
      models: []
    }
  },
  watch: {
    year: function (){
      if((this.year === "") || (this.make === "")) {
        this.models=[];
        return;
      }
      this.getData();
    },
    make: function (){
      if((this.year === "") || (this.make === "")) {
        this.models=[];
        return;
      }
      this.getData();
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
              name: result.Model
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

</style>
