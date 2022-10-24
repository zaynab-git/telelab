<!-- Stat - Status widget that can display a numeric or text value in a color.
     A unit string can optionally be appended and is rendered as a superscript.
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file
-->
<template>
  <!-- The widget title is rendered by the wrapper, we only render the value. Perhaps confusingly
       the title is rendered as v-card-text while the value is rendered here as v-card-title,
       that's so the value is more prominent than the title... ma-auto applies auto margins all
       around, which centers the value. -->
       
  <v-card-title class=" pa-0 ma-0 " > 
      <!-- <v-icon :color="state">mdi-adjust</v-icon> -->
      <v-icon style="margin-top: -5px;" size="45px" :color="(state ? color : 'grey')" > {{ (state ? 'mdi-led-on' : 'mdi-led-variant-off') }}</v-icon>

  </v-card-title>
</template>

<script scoped>
export default {
  name: 'LED',
  icon: 'mdi-led-variant-on',
  help: {
    en: {
      what: "A light emitting diode (LED) is a semiconductor light source that emits light when current passes through it.",
      pins: {
        "Positive": "Positive pin or Anode pin. For the LED to work this pin needs to be connected to a voltage source (VCD)",
        "Negative": "Negative pin or Cathode. For the LED to work this pin needs to be connected to the Ground (GND)",
      }
    },
    fa: {
      what: "دیود ساطع کننده نور(LED) یک منبع نور نیمه هادی است که با عبور جریان برق از آن نور ساطع می کند.",
      pins: {
        "Positive ": "پین مثبت یا آند. برای کارکرد LED، این پین باید به یک منبع ولتاژ (VCD) متصل شود.",
        "Negative ": "پین منفی یا کاتد. برای کارکرد LED، این پین باید به زمین (GND) متصل شود.",
      }
    },
  },
  // help displayed in the UI: the first line is used in the widgets menu and is always shown in
  // the edit card. Successive lines can be expanded in the card and are markdown-formatte

  // properties are inputs to the widget, these can be set to static values or bound to dynamic
  // data by topic in the FlexDash UI. The type is used to display the appropriate kind of input
  // field and also to convert data (ex: string to number). Dynamic is used to bind an input
  // to a data topic right when the widget is created so it animates tight off the bat.
  props: {
    inputs: { type: Object, value: ["pin Positive", "pin Negative"]},
    "pin Positive": { default: "", dynamic: "GND" },
    "pin Negative": { default: "", dynamic: "GND" },
    color: { default: "#00BCD4" }
  },

  computed: {
    state() {
      if (this.$props['pin GND'] == 0 && this.$props['pin VDC'] == 1) {
        return true;
      }
      return false
    }
  }    
}
</script>

<style scoped>
.unit { vertical-align: 15%; margin-left: 0.1em; }
</style>
