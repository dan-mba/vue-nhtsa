<template>
  <div v-if="vehicle" id="vehicle">
    <div class="grid grid-cols-12 gap-4 justify-center mt-4">
      <div class="col-span-12 mb-4">
        <h2 class="text-center text-2xl font-bold mb-4">
          {{ vehicle.description }}
        </h2>
        <img
          id="vehpic"
          :v-if="vehicle.picture"
          :src="vehicle.picture"
          alt=" "
          class="mx-auto block max-h-[35vh] max-w-[min(100%,450px)]"
        >
      </div>

      <div v-if="main" class="col-span-10 md:col-span-4">
        <Card :pt="{content: 'w-56 my-0 mx-auto'}" class="h-full w-full">
          <template #content>
            <div>Overall: <Stars :stars="vehicle.overallRating" /></div>
            <div>Rollover: <Stars :stars="vehicle.rolloverRating" /></div>
            <div>Rollover Possibility: {{ rolloverPercent }}</div>
          </template>
        </Card>
      </div>
      <div v-if="vehicle.nhtsaVars.length" class="col-span-10 md:col-span-4">
        <Card class="h-full w-full">
          <template #content>
            <div v-for="(feature, index) in vehicle.nhtsaVars" :key="index">
              {{ feature }}
            </div>
          </template>
        </Card>
      </div>
      <div class="col-span-10 md:col-span-4">
        <Card :pt="{content: 'w-56 my-0 mx-auto'}" class="h-full w-full">
          <template #content>
            <div>Complaints: {{ vehicle.complaints }}</div>
            <div>Recalls: {{ vehicle.recalls }}</div>
            <div>Investigations: {{ vehicle.investigations }}</div>
          </template>
        </Card>
      </div>
      <div v-if="vehicle.crashRatings" id="crash" class="col-span-12">
        <div class="grid grid-cols-12 gap-4 justify-center mt-md-2">
          <div v-if="front" class="col-span-10 md:col-span-4">
            <Card class="h-full w-full">
              <template #content>
                <img
                  :src="vehicle.frontCrashPic"
                  alt=" "
                  class="block mx-auto mb-2 max-w-[min(100%,450px)]"
                >
                <div class="mx-auto my-0 w-56">
                  <div>Front Crash: <Stars :stars="vehicle.frontCrashRating" /></div>
                  <div>Driver Side: <Stars :stars="vehicle.driverSideRating" /></div>
                  <div>Passenger Side: <Stars :stars="vehicle.passengerSideRating" /></div>
                </div>
              </template>
            </Card>
          </div>
          <div v-if="side" class="col-span-10 md:col-span-4">
            <Card class="h-full w-full">
              <template #content>
                <img
                  :src="vehicle.sideCrashPicture"
                  alt=" "
                  class="block mx-auto mb-2 max-w-[min(100%,450px)]"
                >
                <div class="ratings">
                  <div>Side Crash: <Stars :stars="vehicle.sideCrashRating" /></div>
                  <div>Driver Side: <Stars :stars="vehicle.sideDriverSideRating" /></div>
                  <div>Passenger Side: <Stars :stars="vehicle.sidePassengerSideRating" /></div>
                </div>
              </template>
            </Card>
          </div>
          <div v-if="pole" class="col-span-10 md:col-span-4">
            <Card class="h-full w-full">
              <template #content>
                <img
                  :src="vehicle.sidePolePicture"
                  alt=" "
                  class="block mx-auto mb-2 max-w-[min(100%,450px)]"
                >
                <div class="mx-auto my-0 w-56">
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
import {computed} from 'vue';
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
