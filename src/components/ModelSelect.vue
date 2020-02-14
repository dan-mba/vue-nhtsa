<template>
  <v-select
    v-model="selected"
    :value=value
    label="Model"
    :items="models"
    class="model mx-1"
    menu-props="dark"
    dense
    dark
    solo
  />
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
.v-input.model {
  flex: 0 0 300px;
}
</style>
