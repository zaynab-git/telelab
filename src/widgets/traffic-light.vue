<!-- Stat - Status widget that can display a numeric or text value in a color.
     A unit string can optionally be appended and is rendered as a superscript.
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file
-->
<template>
  <!-- The widget title is rendered by the wrapper, we only render the value. Perhaps confusingly
       the title is rendered as v-card-text while the value is rendered here as v-card-title,
       that's so the value is more prominent than the title... ma-auto applies auto margins all
       around, which centers the value. -->
  <v-card-title class="headline pa-0 flex-grow-1">
    <span class="ma-auto" :style="statStyle">
      <!-- <v-icon :color="state">mdi-adjust</v-icon> -->
      <div :style="{
      position: 'relative',
      width: '70px',
      height: '180px',
      borderRadius: '20px',
      background: (this.$vuetify.theme.dark ? '#eeeeee' : '#212121')}"
      class="d-inline-block mx-1"
      >
        <div :style="{position: 'absolute',
        width: '50px',
        height: '50px',
        left: '10px',
        top: '10px',
        background: state('pin red', '#FF5722'),
        borderRadius: '25px'}"></div>
        <div :style="{position: 'absolute',
        width: '50px',
        height: '50px',
        left: '10px',
        top: '65px',
        background: state('pin yellow', '#FFEB3B'),
        borderRadius: '25px'}"></div>
        <div :style="{position: 'absolute',
        width: '50px',
        height: '50px',
        left: '10px',
        top: '120px',
        background: state('pin green', '#4CAF50'),
        borderRadius: '25px'}"></div>
      </div>

      <!-- <span class="font-weight-medium" style="font-size: 125%; line-height: 125%;">{{valTxt}}</span> -->
      <!-- <span class="unit">{{unitTxt}}</span> -->
    </span>
  </v-card-title>
</template>

<style scoped>
.unit { vertical-align: 15%; margin-left: 0.1em; }
</style>

<script scoped>
export default {
  name: 'traffic-light',
  icon: 'mdi-traffic-light',
  // help displayed in the UI: the first line is used in the widgets menu and is always shown in
  // the edit card. Successive lines can be expanded in the card and are markdown-formatted.
  help: ``,

  // properties are inputs to the widget, these can be set to static values or bound to dynamic
  // data by topic in the FlexDash UI. The type is used to display the appropriate kind of input
  // field and also to convert data (ex: string to number). Dynamic is used to bind an input
  // to a data topic right when the widget is created so it animates tight off the bat.
  props: {
    inputs: { type: Object, value: ["pin red", 'pin yellow', 'pin green', 'pin GND']},
    "pin red": { default: "", dynamic: "GND" },
    "pin yellow": { default: "", dynamic: "GND" },
    "pin green": { default: "", dynamic: "GND" },
    "pin GND": { default: "", dynamic: "GND" },
    color: { default: "cyan" }
  },

  computed: {
    // don't display a unit if there's no value
    unitTxt() { return this.valTxt === "--" ? "" : this.unit; },
    // round values to one decimal (should make that adjustable) and show "--" if the value is
    // null or undefined
    valTxt() {
      if (typeof this.value == 'number') return Math.round(this.value*10.0)/10.0
      else if (this.value === null) return "--";
      else return this.value;
    },
    val() {
      this.value
    },
    // compute the color for number values
    numColor() {
      if (typeof this.value !== 'number') return this.color
      if (this.low_threshold !== null && this.value <= this.low_threshold) return this.low_color
      if (this.high_threshold !== null && this.value >= this.high_threshold) return this.high_color
      return this.color
    },
    // compute the color for text values
    lowRegexp() { return this.low_regexp && new RegExp(this.low_regexp) },
    highRegexp() { return this.high_regexp && new RegExp(this.high_regexp) },
    textColor() {
      if (typeof this.value !== 'string') return this.color
      if (this.lowRegexp && this.lowRegexp.text(this.value)) return this.low_color
      if (this.highRegexp && this.highRegexp.test(this.value)) return this.low_color
      return this.color
    },
    finalColor() { return (typeof this.value === 'number') ? this.numColor : this.textColor },
    // compute the CSS style for the value
    statStyle() {
      return this.finalColor ? { color: this.finalColor } : {}
    },
  },

  methods: {
    state(pin, color) {
     if (this.$props['pin GND'] == 'OFF') {
        return (this.$props[pin] == "ON" ? color : '#bdbdbd');
     }
     return 'grey'
    }
  }

}
</script>
