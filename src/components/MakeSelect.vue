<template>
  <Dropdown
    v-model="selected"
    :value="value"
    :options="makes"
    option-label="text"
    option-value="value"
    placeholder="Make"
    class="make m-1"
  />
</template>

<script>
import NHTSA from '../constants/endpoints';
import axios from 'axios-jsonp-pro';

export default {
  name: 'MakeSelect',
  props: {
    value: {type: String, default: ''},
    year: {type: String, default: ''},
  },
  emits: ['input'],
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
div.make {
  flex: 0 0 210px;
}
</style>
