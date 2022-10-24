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
      <div style="
      position: relative;
      width: 60px;
      height: 98px;"
      class="d-inline-block mx-1"
      >
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '46px',
        top: '10px',
        background: state('pin B', 'digit 1'),
        borderRadius: '10px 0px 0px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '6px',
        top: '10px',
        background: state('pin F', 'digit 1'),
        borderRadius: '0px 10px 10px 0px'}"
        :class="state"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '6px',
        top: '53px',
        background: state('pin E', 'digit 1'),
        borderRadius: '0px 10px 10px 0px'}"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '46px',
        top: '53px',
        background: state('pin C', 'digit 1'),
        borderRadius: '10px 0px 0px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '5px',
        background: state('pin A', 'digit 1'),
        borderRadius: '0px 0px 10px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '45px',
        background: state('pin G', 'digit 1'),
        borderRadius: '10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '84px',
        background: state('pin D', 'digit 1'),
        borderRadius: '10px 10px 0px 0px'}"></div>
      </div>
      <div :style="{position: 'relative',
        width: '12px',
        height: '12px',
        bottom: '15px',
        background: state('pin DP 1'),
        borderRadius: '5px'}"
        class="d-inline-block">
      </div>
      <div style="
      position: relative;
      width: 60px;
      height: 98px;"
      class="d-inline-block mx-1"
      >
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '46px',
        top: '10px',
        background: state('pin B', 'digit 2'),
        borderRadius: '10px 0px 0px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '6px',
        top: '10px',
        background: state('pin F', 'digit 2'),
        borderRadius: '0px 10px 10px 0px'}"
        :class="state"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '6px',
        top: '53px',
        background: state('pin E', 'digit 2'),
        borderRadius: '0px 10px 10px 0px'}"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '46px',
        top: '53px',
        background: state('pin C', 'digit 2'),
        borderRadius: '10px 0px 0px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '5px',
        background: state('pin A', 'digit 2'),
        borderRadius: '0px 0px 10px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '45px',
        background: state('pin G', 'digit 2'),
        borderRadius: '10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '84px',
        background: state('pin D', 'digit 2'),
        borderRadius: '10px 10px 0px 0px'}"></div>
      </div>
      <div style="
      position: relative;
      width: 13px;
      height: 98px;"
      class="d-inline-block mx-1"
      > 
      <div :style="{position: 'absolute',
        width: '12px',
        height: '12px',
        bottom: '15px',
        background: state('pin DP 2'),
        borderRadius: '5px'}"
        class="d-inline-block">
      </div>
      <div :style="{position: 'absolute',
        width: '12px',
        height: '12px',
        top: '20px',
        background: state('pin DP 3'),
        borderRadius: '5px'}"
        class="d-inline-block">
      </div>
      </div>
      <div style="
      position: relative;
      width: 60px;
      height: 98px;"
      class="d-inline-block mx-1"
      >
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '46px',
        top: '10px',
        background: state('pin B', 'digit 3'),
        borderRadius: '10px 0px 0px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '6px',
        top: '10px',
        background: state('pin F', 'digit 3'),
        borderRadius: '0px 10px 10px 0px'}"
        :class="state"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '6px',
        top: '53px',
        background: state('pin E', 'digit 3'),
        borderRadius: '0px 10px 10px 0px'}"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '46px',
        top: '53px',
        background: state('pin C', 'digit 3'),
        borderRadius: '10px 0px 0px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '5px',
        background: state('pin A', 'digit 3'),
        borderRadius: '0px 0px 10px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '45px',
        background: state('pin G', 'digit 3'),
        borderRadius: '10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '84px',
        background: state('pin D', 'digit 3'),
        borderRadius: '10px 10px 0px 0px'}"></div>
      </div>
      <div :style="{position: 'relative',
        width: '12px',
        height: '12px',
        bottom: '15px',
        background: state('pin DP 4'),
        borderRadius: '5px'}"
        class="d-inline-block">
      </div>
      <div style="
      position: relative;
      width: 60px;
      height: 98px;"
      class="d-inline-block mx-1"
      >
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '46px',
        top: '10px',
        background: state('pin B', 'digit 4'),
        borderRadius: '10px 0px 0px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '6px',
        top: '10px',
        background: state('pin F', 'digit 4'),
        borderRadius: '0px 10px 10px 0px'}"
        :class="state"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '6px',
        top: '53px',
        background: state('pin E', 'digit 4'),
        borderRadius: '0px 10px 10px 0px'}"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '46px',
        top: '53px',
        background: state('pin C', 'digit 4'),
        borderRadius: '10px 0px 0px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '5px',
        background: state('pin A', 'digit 4'),
        borderRadius: '0px 0px 10px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '45px',
        background: state('pin G', 'digit 4'),
        borderRadius: '10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '84px',
        background: state('pin D', 'digit 4'),
        borderRadius: '10px 10px 0px 0px'}"></div>
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
  name: 'seven-segment-4',
  icon: '$sevseg4',

  // help displayed in the UI: the first line is used in the widgets menu and is always shown in
  // the edit card. Successive lines can be expanded in the card and are markdown-formatted.
  help: ``,

  // properties are inputs to the widget, these can be set to static values or bound to dynamic
  // data by topic in the FlexDash UI. The type is used to display the appropriate kind of input
  // field and also to convert data (ex: string to number). Dynamic is used to bind an input
  // to a data topic right when the widget is created so it animates tight off the bat.
  props: {
    inputs: { type: Object, value: ["pin A", "pin B", "pin C", "pin D", "pin E", "pin G", "pin DP 1", "pin DP 2", "pin DP 3", "pin DP 4", "pin COM", "digit 1", "digit 2", "digit 3", "digit 4"] },
    "pin A": { default: "", dynamic: "GND" },
    "pin B": { default: "", dynamic: "GND" },
    "pin C": { default: "", dynamic: "GND" },
    "pin D": { default: "", dynamic: "GND" },
    "pin E": { default: "", dynamic: "GND" },
    "pin F": { default: "", dynamic: "GND" },
    "pin G": { default: "", dynamic: "GND" },
    "pin DP 1": { default: "", dynamic: "GND" },
    "pin DP 2": { default: "", dynamic: "GND" },
    "pin DP 3": { default: "", dynamic: "GND" },
    "pin DP 4": { default: "", dynamic: "GND" },
    "pin COM": { default: "", dynamic: "GND" },
    "digit 1": { default: "", dynamic: "GND" },
    "digit 2": { default: "", dynamic: "GND" },
    "digit 3": { default: "", dynamic: "GND" },
    "digit 4": { default: "", dynamic: "GND" },

    color: { type: String, default: "#00BCD4", tip: "value color, null->text color" }
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
    state(port, digit) {
     if (this.$props['pin COM'] == 'ON') {
        return ((this.$props[port] != "ON" && (this.$props[digit] == "ON" || port == 'pin DP 1' || port == 'pin DP 2' || port == 'pin DP 3' || port == 'pin DP 4') ) ? this.color : 'grey');
     }
    return ((this.$props[port] == "ON" && (this.$props[digit] == "ON" || port == 'pin DP 1' || port == 'pin DP 2' || port == 'pin DP 3' || port == 'pin DP 4')) ? this.color : 'grey');
    }
  }

}
</script>
