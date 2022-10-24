import Vue from 'vue';
import Vuetify from 'vuetify/lib';
//import 'vuetify/dist/vuetify.min.css'
//import colors from 'vuetify/lib/util/colors'

//  It would be good to move to the SVG version and drop the -outline icons, then see how
//  to load on-demand even afer bundling. We only need "all icons" so the user can pick arbitrary
//  icons for tabs and widgets...
import '@mdi/font/css/materialdesignicons.css'

// See https://fontsource.org/docs/getting-started
// The browser does seem to load only the fonts actually used, gotta see what the bundling
// ends up doing... This seems better or worked-out internally in Vuetify3
import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'
import '@fontsource/roboto/100-italic.css'
import '@fontsource/roboto/300-italic.css'
import '@fontsource/roboto/400-italic.css'
import '@fontsource/roboto/500-italic.css'
import '@fontsource/roboto/700-italic.css'
import '@fontsource/roboto/900-italic.css'
import lcd from '../icons/lcd.vue'
import sevseg1 from '../icons/sevseg1.vue'
import sevseg2 from '../icons/sevseg2.vue'
import sevseg3 from '../icons/sevseg3.vue'
import sevseg4 from '../icons/sevseg4.vue'
import anlgout from '../icons/anlgout.vue'
import anlgin from '../icons/anlgin.vue'



Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      variations: false, // generate darken-N and lighten-N variations
      customProperties: true, // generates --v-primary-base, etc, CSS colors
    },
    themes: {
      light: {
        background: '#E0E0E0', // page background
        surface: '#fffdfd', // widget surfaces
        panel: '#f4f2f2', // editing panel
        primary: '#ad1625', // node-red red
        primary_light: '#e5504d',
        primary_dark: '#760000',
        error: '#ec7422',
        highlight: '#fff5ce', // selected widget
      },
      dark: {
        background: '#616161',
        surface: '#201d1d',
        panel: '#262424',
        primary: '#ad1625', // node-red red
        primary_light: '#e5504d',
        primary_dark: '#760000',
        error: '#ec7422',
        highlight: '#716741',
      },
    },
  },
  icons: {
    values: {
      lcd: { // name of our custom icon
        component: lcd, // our custom component
      },
      sevseg1: {
        component: sevseg1
      },
      sevseg2: {
        component: sevseg2
      },
      sevseg3: {
        component: sevseg3
      },
      sevseg4: {
        component: sevseg4
      },
      anlgout: {
        component: anlgout
      },
      anlgin: {
        component: anlgin
      }
    },
  },
})
