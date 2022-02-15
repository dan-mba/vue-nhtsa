<template>
  <div
    v-if="vehicle"
    id="vehicle"
  >
    <div class="grid justify-content-center mt-3">
      <div class="col-12 mb-3">
        <h2 class="text-center font-weight-bold mb-3">
          {{ vehicle.description }}
        </h2>
        <img
          id="vehpic"
          :v-if="vehicle.picture"
          :src="vehicle.picture"
          alt=" "
          class="mx-auto block main-img"
        >
      </div>

      <div
        v-if="main"
        class="col-10 md:col-4"
      >
        <Card class="sm-card">
          <template #content>
            <div>Overall: <Stars :stars="vehicle.overallRating" /></div>
            <div>Rollover: <Stars :stars="vehicle.rolloverRating" /></div>
            <div>Rollover Possibility: {{ rolloverPercent }}</div>
          </template>
        </Card>
      </div>
      <div
        v-if="vehicle.nhtsaVars.length"
        class="col-10 md:col-4"
      >
        <Card>
          <template #content>
            <div
              v-for="(feature, index) in vehicle.nhtsaVars"
              :key="index"
            >
              {{ feature }}
            </div>
          </template>
        </Card>
      </div>
      <div class="col-10 md:col-4">
        <Card class="sm-card">
          <template #content>
            <div>Complaints: {{ vehicle.complaints }}</div>
            <div>Recalls: {{ vehicle.recalls }}</div>
            <div>Investigations: {{ vehicle.investigations }}</div>
          </template>
        </Card>
      </div>
      <div
        v-if="vehicle.crashRatings"
        id="crash"
        class="col-12"
      >
        <div class="grid justify-content-center mt-md-2">
          <div
            v-if="front"
            class="col-10 md:col-4"
          >
            <Card>
              <template #content>
                <img
                  :src="vehicle.frontCrashPic"
                  alt=" "
                  class="block mx-auto mb-2"
                >
                <div class="ratings">
                  <div>Front Crash: <Stars :stars="vehicle.frontCrashRating" /></div>
                  <div>Driver Side: <Stars :stars="vehicle.driverSideRating" /></div>
                  <div>Passenger Side: <Stars :stars="vehicle.passengerSideRating" /></div>
                </div>
              </template>
            </Card>
          </div>
          <div
            v-if="side"
            class="col-10 md:col-4"
          >
            <Card>
              <template #content>
                <img
                  :src="vehicle.sideCrashPicture"
                  alt=" "
                  class="block mx-auto mb-2"
                >
                <div class="ratings">
                  <div>Side Crash: <Stars :stars="vehicle.sideCrashRating" /></div>
                  <div>Driver Side: <Stars :stars="vehicle.sideDriverSideRating" /></div>
                  <div>Passenger Side: <Stars :stars="vehicle.sidePassengerSideRating" /></div>
                </div>
              </template>
            </Card>
          </div>
          <div
            v-if="pole"
            class="col-10 md:col-4"
          >
            <Card>
              <template #content>
                <img
                  :src="vehicle.sidePolePicture"
                  alt=" "
                  class="block mx-auto mb-2"
                >
                <div class="ratings">
                  Side Pole Crash: <Stars :stars="vehicle.sidePoleCrashRating" />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, computed} from 'vue';
import Stars from './Stars'

const props = defineProps({
  vehicle: {type: Object, default: () => {return {}}}
});
const main = computed(() => props.vehicle.overallRating || props.vehicle.rolloverRating);
const front = computed(() => {
  return props.vehicle.frontCrashPic || props.vehicle.frontCrashRating ||
    props.vehicle.driverSideRating || props.vehicle.passengerSideRating;
});
const side = computed(() => {
  return props.vehicle.sideCrashPic || props.vehicle.sideCrashRating ||
    props.vehicle.sideDriverSideRating || props.vehicle.sidePassengerSideRating;
});
const pole = computed(() => props.vehicle.sidePolePicture || props.vehicle.sidePoleCrashRating);
const rolloverPercent = computed(() => {
  const p = props.vehicle.rolloverPossibility*100;
  return `${p.toFixed(2)}%`;
});
</script>

<style>
img {
  max-width: min(100%, 450px);
}
.main-img {
  max-height: 35vh;
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
