<!-- ColorPicker - Color picker used when editing widget properties.
     Can show material-design colors, 20-distinct colors, and arbitrary colors.
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file
-->

<template>
<v-card :style="{backgroundColor: ( this.$vuetify.theme.dark ? '#424242' : '#F5F5F5')}"
 flat class="mx-3 mb-0 mt-3 rounded-lg">
            <v-card-title class="ma-0 py-1 px-4">
              {{$t('drawers.color')}}
            </v-card-title>
            <v-card-text class="ma-0 pa-0">
              <v-color-picker :style="{backgroundColor: ( this.$vuetify.theme.dark ? '#424242' : '#F5F5F5')}"  class="py-3 px-2 ma-0 rounded-xl" hide-inputs hide-canvas hide-sliders mode="hexa" show-swatches swatches-max-height="auto"
                        :swatches="swatches" :value="value" @update:color="changeColor">
          </v-color-picker>
            </v-card-text>
          </v-card>
</template>

<style scoped>
.v-sheet { min-width: 350px; margin: 0px; padding: 0px; margin: auto;}
</style>

<script scoped>
import md_colors from 'vuetify/es5/util/colors.js'

export default {
  name: "ColorPicker",

  props: {
    label: { default: null },
    hint: { default: null },
    value: { default: '#00BCD4' },
  },

  data() {
    const swatches = []
    for (let c in md_colors) {
      const color = md_colors[c]
      if ('black' in color) break;
      if (color.base == '#9e9e9e') break;
      if (c == 'shades') {
        swatches.push( Object.values(color) )
      } else {
        swatches.push( ['lighten3', 'base', 'darken3'].map(l => color[l]) )
      }
    }
    return {
      show_picker: false,
      swatches,
    }
  },

  methods: {
    changeColor(c) {
      if (c && c.hexa == "#00000000") {
        this.$emit('input', "") // gives us text color with theme support
      } else {
        this.$emit('input', c.hex)
      }
    },
  },

}
</script>
