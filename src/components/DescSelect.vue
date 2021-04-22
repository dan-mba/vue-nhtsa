<template>
  <Dropdown
    v-model="selected"
    :value=value
    :options="descriptions"
    optionLabel="text"
    optionValue="value"
    placeholder="Vehicle Description"
    class="desc p-mx-1"
  />
</template>

<script>
import NHTSA from '../constants/endpoints';
import axios from 'axios-jsonp-pro';

export default {
  name: 'DescSelect',
  props: {
    value: String,
    year: String,
    make: String,
    model: String,
  },
  data (){
    return {
      descriptions: [],
      selected: ""
    }
  },
  watch: {
    year: function (){
      if((this.year === "") || (this.make === "") || (this.model === "")) {
        this.descriptions=[];
        return;
      }
      this.getData();
    },
    make: function (){
      if((this.year === "") || (this.make === "") || (this.model === "")) {
        this.descriptions=[];
        return;
      }
      this.getData();
    },
    model: function (){
      if((this.year === "") || (this.make === "") || (this.model === "")) {
        this.descriptions=[];
        return;
      }
      this.getData();
    },
    selected: function (){
      this.$emit('input', this.selected.toString());
    }
  },
  methods: {
    getData: function (){
      this.selected="";
      axios
        .jsonp(NHTSA.endpoint
          + '/modelyear/' + this.year
          + '/make/' + this.make
          + '/model/' + this.model
          + NHTSA.dataType)
        .then(response => {
          this.descriptions = response.Results.map(result => {
            return {
              value: result.VehicleId,
              text: result.VehicleDescription
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
div.desc {
  flex: 0 0 320px;
}
</style>
