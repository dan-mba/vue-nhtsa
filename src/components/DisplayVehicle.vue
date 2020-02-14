<template>
  <v-container
    v-if="vehicle"
    id="vehicle"
    fluid
    grid-list-sm
  >
    <v-row justify="center" dense>
      <v-col cols="12" class="mb-3">
        <h2 class="blue-grey--text text--darken-4 display-1 text-center font-weight-bold mb-2">
          {{ vehicle.description }}
        </h2>
        <img
          v-if="vehicle.picture"
          id="vehpic"
          :src="vehicle.picture"
          alt=" "
          class="mx-auto d-block main-img"
        />
      </v-col>

      <v-col v-if="main" cols="10" md="4">
        <div class="main-card sm-card">
          <div>Overall: <Stars :stars="vehicle.overallRating"/></div>
          <div>Rollover: <Stars :stars="vehicle.rolloverRating"/></div>
          <div>Rollover Possibility: {{vehicle.rolloverPossibility | percent}}</div>
        </div>
      </v-col>
      <v-col v-if="vehicle.nhtsaVars.length" cols="10" md="4">
        <div class="main-card">
          <div v-for="(feature, index) in vehicle.nhtsaVars" :key="index">{{feature}}</div>
        </div>
      </v-col>
      <v-col  cols="10" md="4">
        <div class="main-card sm-card">
          <div>Complaints: {{vehicle.complaints}}</div>
          <div>Recalls: {{vehicle.recalls}}</div>
          <div>Investigations: {{vehicle.investigations}}</div>
        </div>
      </v-col>
      <v-col v-if="vehicle.crashRatings" id="crash" cols="12">
        <v-row justify="center" class="mt-md-3">
          <v-col v-if="front" cols="10" md="4">
            <div class="ratings-card">
              <img :src="vehicle.frontCrashPic" alt=" " class="d-block mx-auto">
              <div class="ratings">
                <div>Front Crash: <Stars :stars="vehicle.frontCrashRating"/></div>
                <div>Driver Side: <Stars :stars="vehicle.driverSideRating"/></div>
                <div>Passenger Side: <Stars :stars="vehicle.passengerSideRating"/></div>
              </div>
            </div>
          </v-col>
          <v-col v-if="side" cols="10" md="4">
            <div class="ratings-card">
              <img :src="vehicle.sideCrashPicture" alt=" " class="d-block mx-auto">
              <div class="ratings">
                <div>Side Crash: <Stars :stars="vehicle.sideCrashRating"/></div>
                <div>Driver Side: <Stars :stars="vehicle.sideDriverSideRating"/></div>
                <div>Passenger Side: <Stars :stars="vehicle.sidePassengerSideRating"/></div>
              </div>
            </div>
          </v-col>
          <v-col v-if="pole" cols="10" md="4">
            <div class="ratings-card">
              <img :src="vehicle.sidePolePicture" alt=" " class="d-block mx-auto">
              <div class="ratings">Side Pole Crash: <Stars :stars="vehicle.sidePoleCrashRating"/></div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Stars from './Stars'

export default {
  name: 'DisplayVehicle',
  components: {
    Stars,
  },
  props: {
    vehicle: Object
  },
  computed: {
    main(){
      return this.vehicle.overallRating || this.vehicle.rolloverRating
    },
    front(){
      return this.vehicle.frontCrashPic || this.vehicle.frontCrashRating ||
        this.vehicle.driverSideRating || this.vehicle.passengerSideRating;
    },
    side(){
      return this.vehicle.sideCrashPic || this.vehicle.sideCrashRating ||
        this.vehicle.sideDriverSideRating || this.vehicle.sidePassengerSideRating;
    },
    pole(){
      return this.vehicle.sidePolePicture || this.vehicle.sidePoleCrashRating;
    }
  },
  filters: {
    percent: function(value) {
      const p = value*100;
      return p.toFixed(2) + '%';
    }
  }
}
</script>

<style>
img {
  max-width: 100%;
}
.main-img {
  max-height: 35vh;
  width: 450px;
}
.main-card {
  background-color: #f5f5f5;
  border-color: #f5f5f5
}
.ratings, .sm-card {
  width: 13.5em;
  margin: 0 auto;
}
.ratings-card {
  background-color: #eeeeee;
  border-color: #eeeeee;
}
.ratings-card, .main-card {
  padding: 16px 8px;
  border-radius: 5px;
  height: 100%;
}
</style>
