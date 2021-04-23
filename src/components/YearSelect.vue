<template>
  <Dropdown
    v-model="selected"
    :value=value
    :options="years"
    optionLabel="value"
    optionValue="value"
    placeholder="Year"
    class="year p-m-1"
  />
</template>

<script>
import NHTSA from '../constants/endpoints';
import axios from 'axios-jsonp-pro';

export default {
  name: 'YearSelect',
  props: {
    value: String
  },
  data (){
    return {
      years: [],
      selected: ""
    }
  },
  mounted (){
    axios
      .jsonp(NHTSA.endpoint+NHTSA.dataType)
      .then(response => {
        this.years = response.Results.map(result => {
          return {value: `${result.ModelYear}`}
        });
      })
      .catch(error => {
        console.log(error);
      })
  },
  watch: {
    selected: function(){
      this.$emit('input', this.selected.toString());
    }
  }
}
</script>

<style>
div.year {
  flex: 0 0 90px;
}
</style>
