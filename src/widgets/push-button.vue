<!-- PushButton - Simple button that sends a message when clicked
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file
-->
<template>
  <div >
      <v-icon large @click="clickEv($event)" :color="this.color"> {{ (press ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank') }} </v-icon>
      <span class="grey--text px-1 text--darken-2">{{ (press ? 'ON' : 'OFF') }}</span>
    <!-- <v-btn large dense class="ma-auto" max-width="95%"
               v-bind="Object.assign(bindings, attrs)" v-on="on" @click="clickEv($event)">
          <v-icon :large="!title"  v-if="icon">mdi-{{icon}}</v-icon> <span>{{ title }}</span>
    </v-btn> -->
  </div>
</template>

<script scoped>
export default {
  name: 'push-button',
  icon: 'mdi-radiobox-marked',

  help: ``,

  props: {
    inputs: { type: Object, value: ["pin VDC", "pin GND"]},
    "pin VDC": { default: "", dynamic: "GND" },
    "pin GND": { default: "", dynamic: "GND" },
    outputs: { type: Object, value: ["output"]},
    "output": { default: "", static: "" },
    color: { default: "#00BCD4" }
  },


  data() { return {
      press: false,
    }
  },

  methods: {
    clickEv(ev) {
      console.log(this.color)
      this.press = !this.press
      console.log("PushButton event:", (this.press ? 'ON' : 'OFF'))
      if (this.$props['pin VDC'] == 'ON' && this.$props['pin GND'] == 'OFF') {
        this.$emit('send', {title: this.$props.output.toString(),value:(this.press ? 'ON' : 'OFF')})
      }
    },
  },

}
</script>
