<template>
  <main>
    <h1 class="text-center text-bold my-3">
      NHTSA Safety Ratings Database
    </h1>
    <div class="flex justify-content-center flex-row flex-wrap">
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

<script setup>
import {ref, watch} from 'vue';
import getUrl from './constants/endpoints';
import YearSelect from './components/YearSelect';
import MakeSelect from './components/MakeSelect';
import ModelSelect from './components/ModelSelect';
import DescSelect from './components/DescSelect';
import DisplayVehicle from './components/DisplayVehicle';

const year = ref('');
const make = ref('');
const model = ref('');
const vehId = ref('');
const vehicle = ref(null);

watch(year, () => {
  make.value = '';
  model.value = '';
  vehId.value = '';
});

watch(make, () => {
  model.value = '';
  vehId.value = '';
});

watch(model, () => {
  vehId.value = '';
});

watch(vehId, () => {
  getData();
});

function getData() {
  if(vehId.value === '') {
    vehicle.value = null;
    return;
  }
  fetch(getUrl(`/VehicleId/${vehId.value}`))
    .then(res => res.json())
    .then(response => {
      const data = response.Results[0];
      vehicle.value = {
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
      if (vehicle.value.crashRatings) {
        vehicle.value = {
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
          ...vehicle.value
        };
      }
    })
    .catch(error => {
      console.log(error);
    })
}
</script>

<style>
main {
  width: 98%;
  margin: 0 auto;
}
</style>
