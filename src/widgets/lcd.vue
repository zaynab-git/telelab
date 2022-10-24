<!-- Stat - Status widget that can display a numeric or text value in a color.
     A unit string can optionally be appended and is rendered as a superscript.
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file
-->
<template>
  <!-- The widget title is rendered by the wrapper, we only render the value. Perhaps confusingly
       the title is rendered as v-card-text while the value is rendered here as v-card-title,
       that's so the value is more prominent than the title... ma-auto applies auto margins all
       around, which centers the value. -->
       
  <v-card-title class="pa-0 mt-0"> 
        <v-row class="ma-0 pa-0" style="width: 530px">
           <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
        </v-row>
        <v-row  class="ma-0 pa-0" style="width: 530px">
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
            <lcd-part :contrast="contrast" input="00000000"></lcd-part>
        </v-row>
  </v-card-title>
</template>

<script scoped>

import LcdPart from '../components/lcd-part.vue'

export default {
  name: 'LCD',
  components: { LcdPart },
  icon: '$lcd',
  // help displayed in the UI: the first line is used in the widgets menu and is always shown in
  // the edit card. Successive lines can be expanded in the card and are markdown-formatted.
  help: ``,

  // properties are inputs to the widget, these can be set to static values or bound to dynamic
  // data by topic in the FlexDash UI. The type is used to display the appropriate kind of input
  // field and also to convert data (ex: string to number). Dynamic is used to bind an input
  // to a data topic right when the widget is created so it animates tight off the bat.
  props: {
    inputs: { type: Object, value: ['VSS pin', 'VDD pin', 'VE pin', 'RS pin', 'RW pin', 'EN_pin', 'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', '+ve pin', '-ve pin']},
    'VSS pin' : { default: "", dynamic: "GND" },
    'VDD pin' : { default: "", dynamic: "GND" },
    'VE pin' : { default: "", dynamic: "GND" },
    'RS pin' : { default: "", dynamic: "GND" },
    'RW pin' : { default: "", dynamic: "GND" },
    EN_pin : { default: "", dynamic: "GND" },
    'D0 pin' : { default: "", dynamic: "GND" },
    'D1 pin' : { default: "", dynamic: "GND" },
    'D2 pin' : { default: "", dynamic: "GND" },
    'D3 pin' : { default: "", dynamic: "GND" },
    'D4 pin' : { default: "", dynamic: "GND" },
    'D5 pin' : { default: "", dynamic: "GND" },
    'D6 pin' : { default: "", dynamic: "GND" },
    'D7 pin' : { default: "", dynamic: "GND" },
    '+ve pin' : { default: "", dynamic: "GND" },
    '-ve pin' : { default: "", dynamic: "GND" },
    color: { default: "#00BCD4" }
  },

  computed: {
    contrast() {
      return (this.$props['VE pin'] == 'ON' ? 1 : 0.5)
    }
  },

  watch: {
    EN_pin: function () {
      
      if (this.$props.EN_pin == 'ON' && this.$props['VSS pin'] == 'OFF' && this.$props['VDD pin'] == 'ON') {
        if (this.$props['RS pin'] == 'OFF' && this.$props['RW pin'] == 'OFF') {
          this.command()
        }
      }
    }
  },

  methods: {
    command() {
      console.log('comand')
    },
    data() {
      console.log('data')
    }
  }

}
</script>

<style scoped>
.unit { vertical-align: 15%; margin-left: 0.1em; }
</style>
