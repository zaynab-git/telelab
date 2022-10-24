<!-- Stat - Status widget that can display a numeric or text value in a color.
     A unit string can optionally be appended and is rendered as a superscript.
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file
-->
<template>
  <!-- The widget title is rendered by the wrapper, we only render the value. Perhaps confusingly
       the title is rendered as v-card-text while the value is rendered here as v-card-title,
       that's so the value is more prominent than the title... ma-auto applies auto margins all
       around, which centers the value. -->
    <v-container>
    <v-row no-gutters align="center" justify="center" >
        <v-btn 
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          style="filter: brightness(1.5);"
          @click="keyPressed(1,1)"
        >
          1
        </v-btn>
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          style="filter: brightness(1.5);"
          @click="keyPressed(1,2)"
        >
          2
        </v-btn>
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          style="filter: brightness(1.5);"
          @click="keyPressed(1,3)"
        >
          3
        </v-btn>
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          @click="keyPressed(1,4)"
        >
          A
        </v-btn>
    </v-row>
    <v-row no-gutters align="center" justify="center">
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          style="filter: brightness(1.5);"
          @click="keyPressed(2,1)"
        >
          4
        </v-btn>
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          style="filter: brightness(1.5);"
          @click="keyPressed(2,2)"
        >
          5
        </v-btn>
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          style="filter: brightness(1.5);"
          @click="keyPressed(2,3)"
        >
          6
        </v-btn>
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          @click="keyPressed(2,4)"
        >
          B
        </v-btn>
    </v-row>
    <v-row no-gutters align="center" justify="center">
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          style="filter: brightness(1.5);"
          @click="keyPressed(3,1)"
        >
          7
        </v-btn>
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          style="filter: brightness(1.5);"
          @click="keyPressed(3,2)"
        >
          8
        </v-btn>
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          style="filter: brightness(1.5);"
          @click="keyPressed(3,3)"
        >
          9
        </v-btn>
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          @click="keyPressed(3,4)"
        >
          C
        </v-btn>
    </v-row>
    <v-row no-gutters align="center" justify="center">
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          @click="keyPressed(4,1)"
        >
          *
        </v-btn>
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          style="filter: brightness(1.5);"
          @click="keyPressed(4,2)"
        >
          0
        </v-btn>
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          @click="keyPressed(4,3)"
        >
          #
        </v-btn>
        <v-btn
          class="px-1 py-8 text-h5 ma-1"
          :color="color"
          @click="keyPressed(4,4)"
        >
          D
        </v-btn>
    </v-row>
  </v-container>
</template>

<style scoped>
.unit { vertical-align: 15%; margin-left: 0.1em; }
</style>

<script scoped>
export default {
  name: 'hex-keypad',
  icon: 'mdi-dialpad',
  // help displayed in the UI: the first line is used in the widgets menu and is always shown in
  // the edit card. Successive lines can be expanded in the card and are markdown-formatted.
  help: ``,

  // properties are inputs to the widget, these can be set to static values or bound to dynamic
  // data by topic in the FlexDash UI. The type is used to display the appropriate kind of input
  // field and also to convert data (ex: string to number). Dynamic is used to bind an input
  // to a data topic right when the widget is created so it animates tight off the bat.
  props: {
    outputs: { type: Object, value: ['R1', 'R2', 'R3', 'R4', 'C1', 'C2', 'C3', 'C4']},
    "R1": { default: "", static: "" },
    "R2": { default: "", static: "" },
    "R3": { default: "", static: "" },
    "R4": { default: "", static: "" },
    "C1": { default: "", static: "" },
    "C2": { default: "", static: "" },
    "C3": { default: "", static: "" },
    "C4": { default: "", static: "" },
    color: { default: "#00BCD4", tip: "value color, null->text color" }
  },



  methods: {

    keyPressed(row, col) {
        this.$emit('send', {title: this.$props['R' + row.toString()].toString(), value: 'ON'});
        this.$emit('send', {title: this.$props['C' + col.toString()].toString(), value: 'ON'});
    }
  }

}
</script>
