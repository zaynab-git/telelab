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
    <span class="ma-auto">
      <!-- <v-icon :color="state">mdi-adjust</v-icon> -->
      <div v-if="this.$vuetify.rtl" :style="{position: 'relative',
        width: '12px',
        height: '12px',
        bottom: '15px',
        background: state('pin DP'),
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
        background: state('pin B'),
        borderRadius: '10px 0px 0px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '6px',
        top: '10px',
        background: state('pin F'),
        borderRadius: '0px 10px 10px 0px'}"
        :class="state"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '6px',
        top: '53px',
        background: state('pin E'),
        borderRadius: '0px 10px 10px 0px'}"></div>
        <div :style="{position: 'absolute',
        width: '9px',
        height: '36px',
        left: '46px',
        top: '53px',
        background: state('pin C'),
        borderRadius: '10px 0px 0px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '5px',
        background: state('pin A'),
        borderRadius: '0px 0px 10px 10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '45px',
        background: state('pin G'),
        borderRadius: '10px'}"></div>
        <div :style="{position: 'absolute',
        width: '36px',
        height: '9px',
        left: '12px',
        top: '84px',
        background: state('pin D'),
        borderRadius: '10px 10px 0px 0px'}"></div>
      </div>
      <div v-if="! this.$vuetify.rtl" :style="{position: 'relative',
        width: '12px',
        height: '12px',
        bottom: '15px',
        background: state('pin DP'),
        borderRadius: '5px'}"
        class="d-inline-block">
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
  name: 'seven-segment-1',
  icon: '$sevseg1',
  // help displayed in the UI: the first line is used in the widgets menu and is always shown in
  // the edit card. Successive lines can be expanded in the card and are markdown-formatted.
  help: ``,

  // properties are inputs to the widget, these can be set to static values or bound to dynamic
  // data by topic in the FlexDash UI. The type is used to display the appropriate kind of input
  // field and also to convert data (ex: string to number). Dynamic is used to bind an input
  // to a data topic right when the widget is created so it animates tight off the bat.
  props: {
    inputs: { type: Object, value: ["pin A", "pin B", "pin C", "pin D", "pin E", "pin G", "pin DP", "pin COM"] },
    "pin A": { default: "", dynamic: "GND" },
    "pin B": { default: "", dynamic: "GND" },
    "pin C": { default: "", dynamic: "GND" },
    "pin D": { default: "", dynamic: "GND" },
    "pin E": { default: "", dynamic: "GND" },
    "pin F": { default: "", dynamic: "GND" },
    "pin G": { default: "", dynamic: "GND" },
    "pin DP": { default: "", dynamic: "GND" },
    "pin COM": { default: "", dynamic: "GND" },
    color: { type: String, default: "#00BCD4", tip: "value color, null->text color" }
  },

  methods: {
    state(port) {
     if (this.$props['pin COM'] == 'ON') {
        return (this.$props[port] != "ON" ? this.color : 'grey');
     }
    return (this.$props[port] == "ON" ? this.color : 'grey');
    }
  }

}
</script>
