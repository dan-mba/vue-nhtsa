<template>
  <div
    v-if="vehicle"
    id="vehicle"
  >
    <div class="p-grid p-jc-center p-mt-3">
      <div class="p-col-12 p-mb-3">
        <h2 class="p-text-center p-font-weight-bold p-mb-3">
          {{ vehicle.description }}
        </h2>
        <img
          :v-if="vehicle.picture"
          id="vehpic"
          :src="vehicle.picture"
          alt=" "
          class="p-mx-auto p-d-block main-img"
        />
      </div>

      <div v-if="main" class="p-col-10 p-md-4">
        <Card class="sm-card">
          <template #content>
            <div>Overall: <Stars :stars="vehicle.overallRating"/></div>
            <div>Rollover: <Stars :stars="vehicle.rolloverRating"/></div>
            <div>Rollover Possibility: {{rolloverPercent}}</div>
          </template>
        </Card>
      </div>
      <div v-if="vehicle.nhtsaVars.length" class="p-col-10 p-md-4">
        <Card>
          <template #content>
            <div v-for="(feature, index) in vehicle.nhtsaVars" :key="index">{{feature}}</div>
          </template>
        </Card>
      </div>
      <div class="p-col-10 p-md-4">
        <Card class="sm-card">
          <template #content>
            <div>Complaints: {{vehicle.complaints}}</div>
            <div>Recalls: {{vehicle.recalls}}</div>
            <div>Investigations: {{vehicle.investigations}}</div>
          </template>
        </Card>
      </div>
      <div v-if="vehicle.crashRatings" id="crash" class="p-col-12">
        <div class="p-grid p-jc-center p-mt-md-2">
          <div v-if="front" class="p-col-10 p-md-4">
            <Card>
              <template #content>
                <img :src="vehicle.frontCrashPic" alt=" " class="p-d-block p-mx-auto p-mb-2">
                <div class="ratings">
                  <div>Front Crash: <Stars :stars="vehicle.frontCrashRating"/></div>
                  <div>Driver Side: <Stars :stars="vehicle.driverSideRating"/></div>
                  <div>Passenger Side: <Stars :stars="vehicle.passengerSideRating"/></div>
                </div>
              </template>
            </Card>
          </div>
          <div v-if="side" class="p-col-10 p-md-4">
            <Card>
              <template #content>
                <img :src="vehicle.sideCrashPicture" alt=" " class="p-d-block p-mx-auto p-mb-2">
                <div class="ratings">
                  <div>Side Crash: <Stars :stars="vehicle.sideCrashRating"/></div>
                  <div>Driver Side: <Stars :stars="vehicle.sideDriverSideRating"/></div>
                  <div>Passenger Side: <Stars :stars="vehicle.sidePassengerSideRating"/></div>
                </div>
              </template>
            </Card>
          </div>
          <div v-if="pole" class="p-col-10 p-md-4">
            <Card>
              <template #content>
                <img :src="vehicle.sidePolePicture" alt=" " class="p-d-block p-mx-auto p-mb-2">
                <div class="ratings">
                  Side Pole Crash: <Stars :stars="vehicle.sidePoleCrashRating"/>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    },
    rolloverPercent(){
      const p = this.vehicle.rolloverPossibility*100;
      return `${p.toFixed(2)}%`;
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
.p-card {
  height: 100%;
  width: 100%;
}

.ratings, .sm-card .p-card-content {
  width: 14em;
  margin: 0 auto;
}

</style>
