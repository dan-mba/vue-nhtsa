<template>
  <div id="app">
    <YearSelect v-model="year"></YearSelect>
    <MakeSelect v-model="make" :year="year"></MakeSelect>
    <ModelSelect v-model="model" :year="year" :make="make"></ModelSelect>
    <DescSelect v-model="vehId" :year="year" :make="make" :model="model"></DescSelect>
    <div v-if="vehicle">
      <img :src="vehicle.img">
    </div>
  </div>
</template>

<script>
import NHTSA from './constants/endpoints';
import axios from 'axios-jsonp-pro';
import YearSelect from './components/YearSelect';
import MakeSelect from './components/MakeSelect';
import ModelSelect from './components/ModelSelect';
import DescSelect from './components/DescSelect';

export default {
  name: 'app',
  components: {
    YearSelect,
    MakeSelect,
    ModelSelect,
    DescSelect,
  },
  data() {
    return {
      year: "",
      make: "",
      model: "",
      vehId: "",
      vehicle: null
    }
  },
  methods: {
    getData: function (){
      if(this.vehId === "") {
        this.vehicle = null;
        return;
      }
      axios
        .jsonp(NHTSA.endpoint+'/vehicleid/'+this.vehId+NHTSA.dataType)
        .then(response => {
          const data = response.Results[0];
          this.vehicle = {
            img: data?.VehiclePicture,
          };
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  watch: {
    year: function (){
      this.make="";
      this.model="";
      this.vehId="";
    },
    make: function (){
      this.model="";
      this.vehId="";
    },
    model: function (){
      this.vehId="";
    },
    vehId: function (){
      this.getData();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
