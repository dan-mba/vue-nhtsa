<template>
  <select :value=value @input="$emit('input',$event.target.value)">
    <option value="">Make:</option>
    <option v-for="make in makes" :key="make.name" :value="make.value">{{make.name}}</option>
  </select>
</template>

<script>
import NHTSA from '../constants/endpoints';
import axios from 'axios-jsonp-pro';

export default {
  name: 'MakeSelect',
  props: {
    value: String,
    year: String,
  },
  data (){
    return {
      makes: []
    }
  },
  watch: {
    year: function (){
      if(this.year === "") {
        this.makes=[];
        return;
      }
      axios
        .jsonp(NHTSA.endpoint+'/modelyear/'+this.year+NHTSA.dataType)
        .then(response => {
          this.makes = response.Results.map(result => {
            return {
              value: result.Make.replace(/&/g,'_'),
              name: result.Make
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
