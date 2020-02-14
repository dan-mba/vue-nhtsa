<template>
  <v-select
    v-model="selected"
    :value=value
    label="Year"
    :items="years"
    class="year mx-1"
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
        this.years = response.Results.map(result => result.ModelYear);
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
.v-input.year {
  flex: 0 0 90px;
}
</style>
