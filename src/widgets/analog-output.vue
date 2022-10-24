<!-- Gauge is a simple wrapper around the svg-gauge component.
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file
-->

<template>
  <div class="gauge d-flex flex-column justify-top align-center mt-2">
    <svg-gauge :color='stateColor' v-bind="bindings" :value="((typeof this.value == 'number' && this.value.toString() != 'NaN') ? value : 0)"></svg-gauge>
    <div class="label d-flex flex-column mx-auto absolute" style="top: 40%">
      <v-card-text class="value d-flex pa-0 width100">
        <span class="mx-auto">{{valTxt}}</span>
      </v-card-text>
    </div>
  </div>
</template>

<style scoped>
.gauge { padding: 0.5ex; width:100%; min-height: 20px; position: relative; }
.gauge svg { width: 100%; }
.gauge .label.absolute { z-index: 1; position: absolute; }
.gauge .label.below { margin-top: -2ex; margin-bottom: -4px; }
.unit { vertical-align: 15%; margin-left: 0.1em; font-size: 80%; }
.gauge .value { line-height: 3rem; font-size: 1.8rem; }

</style>

<script scoped>
import SvgGauge from '/src/components/svg-gauge.vue'

export default {
  name: 'analog-output',
  icon: '$anlgout',

  help: ``,

  components: {
    SvgGauge,
  },

  props: {
    inputs: { type: Object, value: ["value"]},
    value: { type: Number, default: 0, dynamic: "" },
    color: { type: String, default: 'cyan', tip: "color of filled segment" },
  },

  data() {return {
    bindings: {
      min: 0,
      max: 255,
      needle_color: 'pink',
      radius: 75,
      stretch: false,
      base_color: 'lightgrey'
    }
  }},

  computed: {

    stateColor() {
      if (typeof this.value == 'number' && this.value.toString() != 'NaN') {
        if (this.value < 0 || this.value > 255) {
        return 'red'
      }
      else {
        return this.color
      }
    }
      
    },

    valTxt() {
      if (typeof this.value == 'number' && this.value.toString() != 'NaN') {
        if (this.value > 255) return 'too high'
        else if (this.value < 0) return 'too low'
        else return Math.round(this.value*10.0)/10.0
        }
      else if (this.value === null) return "--"
      else return "--"
    },
  },
}
</script>
