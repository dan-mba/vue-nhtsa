<template>
  <main>
    <h1
      class="p-text-center p-text-bold p-my-3"
    >
      NHTSA Safety Ratings Database
    </h1>
    <div class="p-d-flex p-jc-center p-flex-row p-flex-wrap">
      <YearSelect v-model="year" />
      <MakeSelect
        v-model="make"
        :year="year"
      />
      <ModelSelect
        v-model="model"
        :year="year"
        :make="make"
      />
      <DescSelect
        v-model="vehId"
        :year="year"
        :make="make"
        :model="model"
      />
    </div>
    <DisplayVehicle :vehicle="vehicle" />
  </main>
</template>

<script>
import NHTSA from './constants/endpoints';
import axios from 'axios-jsonp-pro';
import YearSelect from './components/YearSelect';
import MakeSelect from './components/MakeSelect';
import ModelSelect from './components/ModelSelect';
import DescSelect from './components/DescSelect';
import DisplayVehicle from './components/DisplayVehicle';

export default {
  name: 'App',
  components: {
    YearSelect,
    MakeSelect,
    ModelSelect,
    DescSelect,
    DisplayVehicle,
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
            description: data.VehicleDescription,
            picture: data.hasOwnProperty('VehiclePicture') ?
              data.VehiclePicture : "",
            overallRating: parseInt(data.OverallRating,10),
            rolloverRating: parseInt(data.RolloverRating, 10),
            rolloverPossibility: data.RolloverPossibility,
            nhtsaVars: Object.keys(data).filter(key => key.indexOf("NHTSA") === 0)
                        .map(key => key.match(/[A-Z][a-z]+/g).join(" ") + ': ' + data[key]),
            complaints: data.ComplaintsCount,
            recalls: data.RecallsCount,
            investigations: data.InvestigationCount,
            crashRatings: data.FrontCrashDriversideRating != "Not Rated"
          };
          if (this.vehicle.crashRatings) {
            this.vehicle = {
              frontCrashPic: data.hasOwnProperty('FrontCrashPicture') ?
                data.FrontCrashPicture : "",
              frontCrashRating: parseInt(data.OverallFrontCrashRating,10),
              driverSideRating: parseInt(data.FrontCrashDriversideRating,10),
              passengerSideRating: parseInt(data.FrontCrashPassengersideRating,10),
              sideCrashPicture: data.hasOwnProperty('SideCrashPicture') ?
                data.SideCrashPicture : "",
              sideCrashRating: parseInt(data.OverallSideCrashRating,10),
              sideDriverSideRating: parseInt(data.SideCrashDriversideRating,10),
              sidePassengerSideRating: parseInt(data.SideCrashPassengersideRating,10),
              sidePolePicture: data.hasOwnProperty('SidePolePicture') ?
                data.SidePolePicture : "",
              sidePoleCrashRating: parseInt(data.SidePoleCrashRating,10),
              ...this.vehicle
            };
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>

<style>
main {
  width: 98%;
  margin: 0 auto;
}
</style>
