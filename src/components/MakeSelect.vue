<template>
  <v-select
    v-model="selected"
    :value=value
    label="Make"
    :items="makes"
    class="make mx-1"
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
  name: 'MakeSelect',
  props: {
    value: String,
    year: String,
  },
  data (){
    return {
      makes: [],
      selected: ""
    }
  },
  watch: {
    year: function (){
      if(this.year === "") {
        this.makes=[];
        return;
      }
      this.selected="";
      axios
        .jsonp(NHTSA.endpoint+'/modelyear/'+this.year+NHTSA.dataType)
        .then(response => {
          this.makes = response.Results.map(result => {
            return {
              value: result.Make.replace(/&/g,'_'),
              text: result.Make
            }
          })
        })
        .catch(error => {
          console.log(error);
        })
    },
    selected: function() {
      this.$emit('input', this.selected);
    }
  }
}
</script>

<style>
.v-input.make {
  flex: 0 0 210px;
}
</style>
