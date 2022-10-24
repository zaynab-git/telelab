<!-- Stat - Status widget that can display a numeric or text value in a color.
     A unit string can optionally be appended and is rendered as a superscript.
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file
-->
<template>
  <!-- The widget title is rendered by the wrapper, we only render the value. Perhaps confusingly
       the title is rendered as v-card-text while the value is rendered here as v-card-title,
       that's so the value is more prominent than the title... ma-auto applies auto margins all
       around, which centers the value. -->
    <span class="ma-auto mt-0 pa-0">
      <audio class="mt-0 pa-0" id="myAudio">  
        <source src="http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3">  
      </audio> 
      <!-- <v-icon :color="state">mdi-adjust</v-icon> -->
      <v-icon class="mt-0 pa-0" large :class="(state ? 'shake' : '')" :color="(state ? color : 'grey')"> {{ (state ? 'mdi-bell-ring' : 'mdi-bell') }}</v-icon>

      <!-- <span class="font-weight-medium" style="font-size: 125%; line-height: 125%;">{{valTxt}}</span> -->
      <!-- <span class="unit">{{unitTxt}}</span> -->
    </span>
</template>

<script scoped>
export default {
  name: 'buzzer',
  icon: 'mdi-bell',
  // help displayed in the UI: the first line is used in the widgets menu and is always shown in
  // the edit card. Successive lines can be expanded in the card and are markdown-formatted.
  help: ``,

  // properties are inputs to the widget, these can be set to static values or bound to dynamic
  // data by topic in the FlexDash UI. The type is used to display the appropriate kind of input
  // field and also to convert data (ex: string to number). Dynamic is used to bind an input
  // to a data topic right when the widget is created so it animates tight off the bat.
  props: {
    inputs: { type: Object, value: ["pin VDC", "pin GND"]},
    "pin VDC": { default: "", dynamic: "GND" },
    "pin GND": { default: "", dynamic: "GND" },
    color: { default: "#00BCD4" }
  },

  computed: {
    state() {
      var sound = document.getElementById("myAudio");
      if (this.$props['pin GND'] == 'OFF' && this.$props['pin VDC'] == 'ON') {
        sound.play();
        return true;
      }
      if (sound != null) {
        sound.pause();
      }
      return false
    }
  }    
}
</script>

<style scoped>
.shake {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
  }
  @keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
