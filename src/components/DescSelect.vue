<template>
  <div id="desc" class="select-div">
    <select :value=value @input="$emit('input',$event.target.value)">
      <option value="">Vehicle Description:</option>
      <option 
        v-for="description in descriptions"
        :key="description.id"
        :value="description.id"
      >
        {{description.name}}
      </option>
    </select>
    <font-awesome-icon :icon="['fas','chevron-down']" class="chevron">
    </font-awesome-icon>
  </div>
</template>

<script>
import NHTSA from '../constants/endpoints'
import axios from 'axios-jsonp-pro'

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
      descriptions: []
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
    }
  },
  methods: {
    getData: function (){
      axios
        .jsonp(NHTSA.endpoint
          + '/modelyear/' + this.year
          + '/make/' + this.make
          + '/model/' + this.model
          + NHTSA.dataType)
        .then(response => {
          this.descriptions = response.Results.map(result => {
            return {
              id: result.VehicleId,
              name: result.VehicleDescription
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
#desc {
  flex: 0 0 320px;
}
</style>
