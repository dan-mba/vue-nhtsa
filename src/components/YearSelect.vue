<template>
  <div class="select-div" style="flex:0 0 100px;">
    <select :value=value @input="$emit('input',$event.target.value)">
      <option value="">Year:</option>
      <option v-for="year in years" :key="year" :value="year">{{year}}</option>
    </select>
    <font-awesome-icon :icon="['fas','chevron-down']" class="chevron"></font-awesome-icon>
  </div>
</template>

<script>
import NHTSA from '../constants/endpoints'
import axios from 'axios-jsonp-pro'

export default {
  name: 'YearSelect',
  props: {
    value: String
  },
  data (){
    return {
      years: []
    }
  },
  mounted (){
    axios
      .jsonp(NHTSA.endpoint+NHTSA.dataType)
      .then(response => {
        this.years = response.Results.map(result => result.ModelYear)
      })
      .catch(error => {
        console.log(error);
      })
  }
}
</script>

<style>

</style>
