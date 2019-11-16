<template>
  <div v-if="vehicle" id="vehicle">
    <h2> {{ vehicle.description }} </h2>
    <div class="cols">
      <div class="img-flex">
        <img id="vehpic" :src="vehicle.picture" alt=" ">
      </div>
      <div>
        <div>Overall Rating: <Stars :stars="vehicle.overallRating"/></div>
        <div>Rollover Rating: <Stars :stars="vehicle.rolloverRating"/></div>
        <div>Rollover Possibility: {{vehicle.rolloverPossibility | percent}}</div>
        <div v-for="(feature, index) in vehicle.nhtsaVars" :key="index">{{feature}}</div>
        <div>Complaints Count: {{vehicle.complaints}}</div>
        <div>Recalls Count: {{vehicle.recalls}}</div>
        <div>Investigations Count: {{vehicle.investigations}}</div>
      </div>
    </div>
    <div v-if="vehicle.crashRatings" id="crash">
      <h4>Crash Ratings</h4>
      <div class="cols">
        <div class="img-flex">
          <img id="frcrashpic" :src="vehicle.frontCrashPic" alt=" ">
        </div>
        <div>
          <div>Front Crash Rating: <Stars :stars="vehicle.frontCrashRating"/></div>
          <div>Driver Side Rating: <Stars :stars="vehicle.driverSideRating"/></div>
          <div>Passenger Side Rating: <Stars :stars="vehicle.passengerSideRating"/></div>
        </div>
        <div class="img-flex">
          <img id="sidecrashpic" :src="vehicle.sideCrashPicture" alt=" ">
        </div>
        <div>
          <div>Side Crash Rating: <Stars :stars="vehicle.sideCrashRating"/></div>
          <div>Driver Side Rating: <Stars :stars="vehicle.sideDriverSideRating"/></div>
          <div>Passenger Side Rating: <Stars :stars="vehicle.sidePassengerSideRating"/></div>
        </div>
        <div class="img-flex">
          <img id="sidepolecrashpic" :src="vehicle.sidePolePicture" alt=" ">
        </div>
        <div>Side Pole Crash Rating: <Stars :stars="vehicle.sidePoleCrashRating"/></div>
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
  filters: {
    percent: function(value) {
      const p = value*100;
      return p.toFixed(2) + '%';
    }
  }
}
</script>

<style>
#vehicle {
  margin: 20px 0;
}

h2, h4 {
  padding: .5em 0;
}

h2 {
  font-size: 1.75em
}

h4 {
  font-size: 1.3em;
}

#crash {
  clear: both;
  margin: 10px 0 0;
}

#crash img, #vehpic{
  border: none;
  max-width: 300px;
}

.cols > div.img-flex {
  flex: 0 0 300px;
  text-align: right;
}

.cols {
  display: flex;
  flex-flow: row-reverse wrap;
  row-gap: 10px;
}

.cols > div {
  flex-grow: 1;
}

.clear:after {
  content: '';
  display: block;
  clear: both;
  margin-bottom: 10px;
}

@media (max-width: 690px) {
  .cols {
    flex-flow: column;
  }

  .cols > div.img-flex {
    text-align: center;
    flex-basis: auto;
  }
}
</style>
