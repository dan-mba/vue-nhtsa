<template>
  <Dropdown
    v-model="selected"
    :value="value"
    :options="years"
    option-label="value"
    option-value="value"
    placeholder="Year"
    class="year m-1"
  />
</template>

<script>
import NHTSA from '../constants/endpoints';
import axios from 'axios-jsonp-pro';

export default {
  name: 'YearSelect',
  props: {
    value: {type: String, default: ''}
  },
  emits: ['input'],
  data (){
    return {
      years: [],
      selected: ""
    }
  },
  watch: {
    selected: function(){
      this.$emit('input', this.selected.toString());
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
  }
}
</script>

<style>
div.year {
  flex: 0 0 90px;
}
</style>
