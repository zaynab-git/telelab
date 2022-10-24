<!-- WidgetEdit - Wrapper around actual widget components providing editing functionality for
     modifying the bindings.
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file

     WidgetEdit provides a floating card extension with controls to edit the widget's bindings.
     The set of available properties are detected by inspecting the component, specifically,
     the definition of its props.

     Currently editing is a bit spread out over the grid, widget-wrapper and this component.
     The widget-wrapper has the edit button and the grid has the ultimate control.

     FIXME: This component should be refactored. Each type of input should become its own
     component that gets plopped down into the grid and fed its specific config as a model.
     This way the long validation and type switcharoo gets broken up. Maybe in the end the two
     widget-xxx components can be merged again... All this would also allow the editing components
     to be reused in other parts of the dashboard.
-->

<template>
  <!-- without div the v-for in parent gets confused by v-menu -->
  <div class="widget-edit" :style="widgetStyle" >
    <v-navigation-drawer disable-resize-watcher :color="this.$vuetify.theme.dark ? '#212121' : 'white'" :right="!$vuetify.rtl" v-model="active_edit" clipped app mobile-breakpoint="960" :width="this.$vuetify.breakpoint.width >= 750 ? '400' :  '300'" >
      <v-card v-if="color" flat  class="pb-3" >
        <v-card-title class="text-h5 font-weight-medium pt-0 pb-2">
          {{$t('drawers.appearance')}}
          <v-spacer></v-spacer>
          <v-btn icon @click="endEdit">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card :style="{backgroundColor: ( this.$vuetify.theme.dark ? '#424242' : '#F5F5F5')}" 
        flat class="mx-3 mb-0 mt-3 rounded-lg">
                    <v-card-title class="ma-0 py-2 px-4">
                      {{$t('drawers.name')}}
                    </v-card-title>
                    <v-card-text class=" ma-0 pa-4">
                      <v-text-field 
                      class="ma-0 pa-0"
                        :value="widget.static['title']" :hide-details="true"
                        @input="handleEdit('static', 'title', $event)">
                      </v-text-field>
                    </v-card-text>
                </v-card>

        <v-card  :style="{backgroundColor: ( this.$vuetify.theme.dark ? '#424242' : '#F5F5F5')}" 
        flat class="mx-3 mb-0 mt-3 rounded-lg">
            <v-card-title class="ma-0 py-1 px-4">
              {{$t('drawers.order')}}
            </v-card-title>
            <v-card-text class="d-inline mx-3 pa-0">
              <v-btn  class="text-body-2 pl-1 pr-2 mx-1 my-4" @click="moveWidget(-1)">
                <v-icon large  >mdi-arrow-left-bold</v-icon>
                Move To Left
              </v-btn>
              <v-btn class="text-body-2 pl-2 pr-1 mx-1 my-4" @click="moveWidget(1)">
                Move To Right
                <v-icon large>mdi-arrow-right-bold</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>

          <color-picker v-if="widget.kind != 'traffic-light'"
                    label="color" :hint="prop_info['color'].hint"
                    :value="widget.static['color']"
                    @input="handleColorEdit('color', $event)">
          </color-picker>
    </v-card>
      <v-card flat color="wight" v-else-if="help"  class="pb-3" >
        <v-card-title class="text-h5 font-weight-medium pt-0 pb-2">
          {{$t('drawers.help')}}
          <v-spacer></v-spacer>
          <v-btn icon @click="endEdit">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
          <v-card  :key=ind :style="{backgroundColor: ( $vuetify.theme.dark ? '#424242' : '#F5F5F5')}"
           flat class="mx-3 mb-0 mt-3 rounded-lg">
              <v-card-title class="ma-0 pb-0 px-4">
                 {{$t('drawers.whatis')}} {{ widget.kind }} ?
              </v-card-title>
              <v-card-text class="d-inline mx-3 black--text">
                <h3 class="px-4 ma-0">{{ widget_help.what }}</h3>
              </v-card-text>
          </v-card>
          <v-card :style="{backgroundColor: ( $vuetify.theme.dark ? '#424242' : '#F5F5F5')}"
           flat class="mx-3 mb-0 mt-3 rounded-lg">
              <v-card-title class="ma-0 pb-0 px-4">
                {{$t('drawers.pins')}}
              </v-card-title>
              <v-card-text class="d-inline mx-3">
                <ul class="px-8 black--text">
                  <li v-for="(p,ind) in widget_help.pins" :key=ind ><span class="body-1">{{ind}}</span> : {{ p }} </li>
                </ul>
              </v-card-text>
          </v-card>
    </v-card>
    <v-card color="wight" v-else-if="edit" flat class="pb-3">
        <v-card-title class="text-h5 font-weight-medium pt-0 pb-2">
          {{$t('drawers.edit')}}
          <v-spacer></v-spacer>
          <v-btn icon @click="endEdit">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
            <v-card :style="{backgroundColor: ( this.$vuetify.theme.dark ? '#424242' : '#F5F5F5')}"
             flat class="mx-3 mb-0 mt-3 rounded-lg"
             v-if="Object.keys(this.child_props).includes('inputs')">
                    <v-card-title class="ma-0 py-1 px-4">
                      {{$t('drawers.inputs')}}
                    </v-card-title>
                    <v-card-text class=" ma-0 pa-4">
                      <v-container class="ma-0 pa-1 mt-3">

            <!-- Display component properties for editing -->
            <v-row align="center">
              <!-- For each property of the component, show some type of edit field-->
              <v-col class="d-flex" cols="6" v-for="prop in this.child_props.inputs.value" :key=prop>
                <!-- toggle buttons to select static vs. dynamic -->
                
                <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn-toggle mandatory dense class="mt-2 mr-1"
                                  :value="prop_static[prop]" @change="toggleStatic(prop, $event)"
                                  background-color="rgba(0,0,0,0)" color="primary">
                      <v-btn x-small icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-link-variant</v-icon></v-btn>
                      <v-btn x-small icon v-bind="attrs" v-on="on">
                        <v-icon>{{prop_info[prop].icon}}</v-icon></v-btn>
                    </v-btn-toggle>
                  </template>
                  <span>Toggle dynamic link vs. literal value</span>
                </v-tooltip> -->
                <!-- dynamic link -->
                 <v-select
                class="ma-0 pa-0"
                    clearable dense persistent-hint 
                    :label="prop"
                    :items="sd_keys"
                    :value="widget.dynamic[prop]"
                    @input="handleEdit('dynamic', prop, $event)">
                </v-select>
                <!-- <topic-tree v-if="!prop_static[prop]"
                    :label="prop" hint='topic (/-separated path)' :value="widget.dynamic[prop]"
                    @input="handleEdit('dynamic', prop, $event)">
                </topic-tree>
                <v-text-field v-else-if="prop_info[prop].type === Number"
                    :label="prop" type="number" dense
                    :hint="prop_info[prop].hint"
                    :value="propVal(prop)"
                    @input="handleEdit('static', prop, $event)">
                </v-text-field>
                <v-switch v-else-if="prop_info[prop].type === Boolean"
                    :label="prop" class="mt-0 ml-2"
                    :hint="prop_info[prop].hint"
                    :input-value="propVal(prop)"
                    @change="handleEdit('static', prop, $event)">
                </v-switch>
                <v-text-field v-else-if="prop_info[prop].type === Array"
                    :label="prop" dense
                    :value="JSON.stringify(widget.static[prop]||prop_info[prop].default)"
                    :rules="[validateArray]"
                    @input="handleEdit('static', prop, $event)">
                </v-text-field>
                <v-text-field v-else-if="prop_info[prop].type === Object"
                    :label="prop" dense
                    :hint="prop_info[prop].hint"
                    :value="JSON.stringify(widget.static[prop]||prop_info[prop].default)"
                    :rules="[validateObject]"
                    @input="handleEdit('static', prop, $event)">
                </v-text-field>
               
                <v-text-field v-else class="w-edit"
                    :label="prop" dense
                    :hint="prop_info[prop].hint"
                    :value="widget.static[prop]||prop_info[prop].default"
                    @input="handleEdit('static', prop, $event)">
                  <template v-slot:append-outer>
                    <v-btn icon x-small @click=popupTextField(prop)>
                      <v-icon>mdi-arrow-expand-all</v-icon>
                    </v-btn>
                  </template>
                </v-text-field> -->
              </v-col>
            </v-row>

          </v-container>
                    </v-card-text>
            
            </v-card >
             <v-card :style="{backgroundColor: ( this.$vuetify.theme.dark ? '#424242' : '#F5F5F5')}"
               flat class="mx-3 mb-0 mt-3 rounded-lg"
               v-if="Object.keys(this.child_props).includes('outputs')">
                <v-card-title class="ma-0 py-1 px-4">
                  {{$t('drawers.outputs')}}
                </v-card-title>
                <v-card-text class=" ma-0 pa-4">
                  <v-container class="ma-0 pa-1 mt-3">

            <!-- row for output binding -->
            <v-row  align="center">
              <v-col class="d-flex" cols="6" v-for="prop of this.child_props.outputs.value" :key=prop>
                <!--h4 class="mt-2 mr-3">Output binding:</h4-->
                <v-select
                class="ma-0 pa-0"
                    clearable dense persistent-hint
                    :label="prop"
                    :items="sd_keys"
                    :value="widget.static[prop]"
                    @input="handleEdit('static', prop, $event)">
                </v-select>
              </v-col>
              <!-- <v-col v-if="widget.kind == 'hex-keypad'" class="d-flex" cols="12" sm="6" md="4">
                <v-combobox
                    label="output binding" clearable dense persistent-hint
                    :hint='output_tip'
                    :items="sd_keys"
                    :value="widget.output"
                    @input="handleEditOutput($event)">
                </v-combobox>
              </v-col>
              <v-col v-if="widget.kind == 'hex-keypad'" class="d-flex" cols="12" sm="6" md="4">
                <v-combobox
                    label="output binding" clearable dense persistent-hint
                    :hint='output_tip'
                    :items="sd_keys"
                    :value="widget.output"
                    @input="handleEditOutput($event)">
                </v-combobox>
              </v-col>
              <v-col v-if="widget.kind == 'hex-keypad'" class="d-flex" cols="12" sm="6" md="4">
                <v-combobox
                    label="output binding" clearable dense persistent-hint
                    :hint='output_tip'
                    :items="sd_keys"
                    :value="widget.output"
                    @input="handleEditOutput($event)">
                </v-combobox>
              </v-col>
              <v-col v-if="widget.kind == 'hex-keypad'" class="d-flex" cols="12" sm="6" md="4">
                <v-combobox
                    label="output binding" clearable dense persistent-hint
                    :hint='output_tip'
                    :items="sd_keys"
                    :value="widget.output"
                    @input="handleEditOutput($event)">
                </v-combobox>
              </v-col>
              <v-col v-if="widget.kind == 'hex-keypad'" class="d-flex" cols="12" sm="6" md="4">
                <v-combobox
                    label="output binding" clearable dense persistent-hint
                    :hint='output_tip'
                    :items="sd_keys"
                    :value="widget.output"
                    @input="handleEditOutput($event)">
                </v-combobox>
              </v-col>
              <v-col v-if="widget.kind == 'hex-keypad'" class="d-flex" cols="12" sm="6" md="4">
                <v-combobox
                    label="output binding" clearable dense persistent-hint
                    :hint='output_tip'
                    :items="sd_keys"
                    :value="widget.output"
                    @input="handleEditOutput($event)">
                </v-combobox>
              </v-col>
              <v-col v-if="widget.kind == 'hex-keypad'" class="d-flex" cols="12" sm="6" md="4">
                <v-combobox
                    label="output binding" clearable dense persistent-hint
                    :hint='output_tip'
                    :items="sd_keys"
                    :value="widget.output"
                    @input="handleEditOutput($event)">
                </v-combobox>
              </v-col> -->
            </v-row>

          </v-container>
          </v-card-text>
        </v-card>
      </v-card>
    </v-navigation-drawer>

    <widget-wrap :config="widget" :no_border="no_border"  :color="selected"
      @edit="toggleEdit" @delete="$emit('delete')" @clone="$emit('clone')" 
      @help="toggleHelp"
      @color="toggleColor">
    </widget-wrap>

    <!-- <v-navigation-drawer right v-model="help" clipped app mobile-breakpoint="960" width="400">
    
    </v-navigation-drawer> -->


    <!-- <v-navigation-drawer right v-model="color" clipped app mobile-breakpoint="960" width="400">
    
    </v-navigation-drawer> -->

    
  </div>
</template>

<style>
.widget-edit .popup-spacer { margin-top: 3px; margin-bottom: 3px; }
.widget-edit .w-edit > .v-input__append-outer { margin-left: 4px !important; }
.widget-edit-dialog .v-input.height100 div { height: 100% !important; } 
</style>

<script scoped>

import WidgetWrap from '/src/components/widget-wrap.vue'
import md from '/src/components/md.vue'
import ColorPicker from '/src/components/color-picker.vue'
import TopicTree from '/src/components/topic-tree.vue'
import copyToClipboard from '/src/utils/clipboard.js'

export default {
  name: 'WidgetEdit',

  components: { WidgetWrap, md, ColorPicker, TopicTree },
  inject: [ '$store', 'palette' ],

  props: {
    id: { type: String, required: true }, // my widget ID
    edit_active:  { type: Boolean, default: false },
    no_border: { type: Boolean, default: false }, // true causes no "card" border, used by panel
  },

  data() { return {
    prop_static: {}, // manual toggle between static and dynamic binding
    sd_keys: [], // list of keys from store.sd to show in editing combobox
    // hack to reposition the edit window when changing widget shape/position, this will go
    // away once we have dragging...
    reposition: true,
    edit: false,
    color: false,
    help: false, // more... help text expansion toggle
    // child_props holds the description of the widget component's props
    child_props: {}, 
    // prop_info is child_props further massaged:
    // {name:{type, default, validator, hint, icon, dynamic},...}
    // prop types: String, Number, Boolean, Array, Object, Date //, Function, Symbol
    prop_info: {},
    output_tip: "",

    // pop-up dialog to edit string property full-page
    dialog: false,
    dialog_prop: null,
  }},

  created() {
    //console.log("Created widget", this.id)
    // fetch the widget config from the store and perform some init
    const w = JSON.parse(JSON.stringify(this.$store.widgetByID(this.id)))
    let update = false // whether we need to update the widget
    if (w.static === undefined) { w.static = {}; update = true }
    if (w.dynamic === undefined) { w.dynamic = {}; update = true }
    // inspect the component and extract child props
    let cp = {}
    const p = this.palette.widgets
    if (w.kind in p) cp = p[w.kind].props || {}
    // massage child_props into prop_info
    const icons = { String: 'mdi-format-quote-close', Number: 'mdi-numeric',
        Boolean: 'mdi-yin-yang', Array: "mdi-code-brackets", Object: "mdi-code-braces" }
    let pi = {}
    for (let name in cp) {
      let type = cp[name].type || String
      if (![String, Number, Boolean, Array, Object].includes(type)) type = String
      let hint = cp[name].tip || type.name
      let def = cp[name].default
      if (typeof def === 'function') def = def() // array/obj prop defaults...
      if (def !== undefined) hint += `, default: ${def}`
      let icon = icons[type.name]
      pi[name] = {type, default: def, validator: cp[name].validator,
                  hint, icon, dynamic: cp[name].dynamic}
    }
    // FlexDash doesn't have any good place to tweak a freshly instantiated widget. It
    // just gets added "all undefined" in the store. Right now the code here "does some
    // stuff"...
    // The defaults for the widget inputs (props) are currently handled by
    // Vue's prop defaults, so the store just setting static={} works, except for dynamic
    // default. We hack them here.
    for (const p in pi) {
      // if the prop definition says it's dynamic and it's completely unset, then set it
      if (pi[p].dynamic && !(p in w.dynamic) && !(p in w.static)) {
        w.dynamic[p] = pi[p].dynamic
        update = true
      }
    }
    // process any widget output binding
    if (w.kind in p && p[w.kind].output) {
      // apply defaults from widget "class"
      const o = p[w.kind].output
      if (typeof o === 'string') {
        if (!('output' in w)) w.output = o
      } else {
        if (!('output' in w)) w.output = p[w.kind].output.default || null
        if (p[w.kind].output.tip) this.output_tip += ", " + p[w.kind].output.tip
      }
    }
    if (w.output_hint) { w.output_hint = null; update = true } // patch a bug
    // update instance variables
    if (update) this.$store.updateWidget(this.id, w)
    this.child_props = cp
    this.prop_info = pi
    // handle init edit_mode being active
    if (this.edit_active) this.propStatic()
  },

  computed: {
    // list of keys from store.sd to show in editing combobox
    //sd_keys() { return Object.keys(this.$store.sd).sort() }, // reactivity failure...

    // list of child prop names for editing, excluding title
    // edit_props() {
    //   const cp = Object.keys(this.child_props)
    //   let filtered = cp.filter(p => p !== 'title')
    //   filtered = filtered.filter(p => p !== 'color')
    //   filtered = filtered.filter(p => !p.endsWith('_color'))
    //   return filtered
    // },
    widget_help() {
      const p = this.palette.widgets
      let help = p[this.widget.kind].help
      return (this.$i18n.locale == 'fa' ? help.fa : help.en)
    },
    // widget_help_pins() {
    //   const p = this.palette.widgets
    //   let help = p[this.widget.kind].help
    //   return help.pin
    // },
    active_edit: {
      get() {
        return this.edit_active
      },
      set(val) {
        if (!val && this.edit_active) this.$emit('edit', false);
      }
    },
    // handle a non-vue-standard "help" option in a widget
    child_help() {
      const p = this.palette.widgets
      if (this.widget.kind in p) return p[this.widget.kind].help
      return undefined
    },
    child_help_title() {
      return this.child_help ? this.child_help.replace(/[.\n].*/s, "") : null
    },
    child_help_text() {
      return this.child_help ? this.child_help.replace(/^.*?[.\n]\s/s, "") : null
    },

    selected() {
      if (this.edit_active) return this.$vuetify.theme.dark ? 'cyan darken-4' : 'cyan lighten-5'
      return this.$vuetify.theme.dark ? 'grey darken-4' : 'wight'
    },

    // style attribute for widget to determine size
    widgetStyle() {
      // note: if rows/cols don't exist when the widget is created the widgetStyle will not
      // recompute in Vue2
      const row = `grid-row-start: span ${this.widget.rows||1}`
      const col = `grid-column-start: span ${this.widget.cols||1}`
      return `${row}; ${col};`
    },

    widget() { return this.$store.widgetByID(this.id) },
  },

  watch: {
    edit_active(val) {
      if (val) {
        this.propStatic()
        // this.sd_keys = Object.keys(this.$store.sd)
        this.sd_keys = ["0","1","2","3","GND"]
      }
    },
  },

  methods: {
    // set the dynamic/static toggles according to what's in the config.
    // Afterwards they're controlled by the user.
    propStatic() {
      this.prop_static = Object.fromEntries(
        // if prop in config.dynamic then 0 (not static) else 1 (static)
        Object.keys(this.child_props).map(p => [p, (p in this.widget.dynamic)?0:1])
      )
    },

    // value of a property: either config if set, else default
    propVal(prop) {
      if (this.widget.static[prop] !== undefined) return this.widget.static[prop]
      else return this.prop_info[prop].default
    },

    // toggle static vs. dynamic for a specific prop
    toggleStatic(prop, val) {
      this.prop_static[prop] = val
      // if a prop is toggled to static we need to delete the dynamic value 'cause it takes
      // priority, i.e. defeats the switch
      if (val) this.widget.dynamic[prop] = undefined
    },

    // toggle edit handles the edit event from the child component
    toggleEdit() { 
      this.$emit('edit', false);
      this.$emit('edit', true); 
      this.edit = true; 
      this.help = false;
      this.color = false;
    },

    toggleHelp() { 
      this.$emit('edit', false);
      this.$emit('edit', true); 
      this.help = true;  
      this.edit = false;
      this.color = false;
    },

    toggleColor() { 
      this.$emit('edit', false);
      this.$emit('edit', true); 
      this.color = true; 
      this.help = false;
      this.edit = false;
    },

    endEdit() {  this.$emit('edit', false); this.help = false; this.color = false; this.edit = false },

    handleEdit(which, prop, value) {
      console.log(this.widget)

      if (!(which in this.widget)) return

      if (prop != 'title') {
        if (!(prop in this.child_props)) return
      console.log("edit:", which, prop, value)

        // for static values we get a string from the text_field and may need to convert
        if (which == 'static') {
          const type = this.child_props[prop].type
          // handle Number coming in as String
          if (type === Number && typeof value === 'string') {
            value = Number.parseFloat(value)
          // handle Array and Object values
          } else if (type === Array || type === Object) {
            try { value = JSON.parse(value)
            } catch(e) { return }
          }
        }
      }

      this.$store.updateWidgetProp(this.id, which, prop, value)
    },

    handleColorEdit(prop, value) {
      if (value == "" || value == '#FF0000') value = '#00838F'
      this.handleEdit('static', prop, value)
    },

    handleEditOutput(prop, value) {
      console.log(this.widget)
      let p = {};
      p[`outputs/${prop}`] = value;
      console.log("edit: output:", value)
      this.$store.updateWidget(this.id, p)
    },

    validateArray(v) {
      let a
      try {
        a = JSON.parse(v)
      } catch(e) {
        return e.toString().replace(/^.*?parse:/, "")
      }
      if (!Array.isArray(a)) return "array required"
      return true
    },

    validateObject(v) {
      let a
      try {
        a = JSON.parse(v)
      } catch(e) {
        return e.toString().replace(/^.*?parse:/, "")
      }
      if (typeof a !== 'object') return "object required"
      return true
    },

    // pop up a dialog box to edit a text field
    popupTextField(prop) {
      if (this.dialog) {
        this.dialog = false
      } else {
        this.dialog_prop = prop
        this.dialog = true
      }
    },

    // adjust number of rows spanned by widget (dir=-1/+1)
    adjustRows(dir) {
      const w = this.widget
      let r = (w.rows||1) + dir
      if (r < 1) r = 1
      if (r > 16) r = 16
      this.$store.updateWidget(this.id, {rows: r})
      // reposition the edit window
      this.reposition = false; this.$nextTick(() => {this.reposition = true})
    },

    // adjust number of cols spanned by widget (dir=-1/+1)
    adjustCols(dir) {
      const w = this.widget
      let c = (w.cols||1) + dir
      if (c < 1) c = 1
      if (c > 16) c = 16
      this.$store.updateWidget(this.id, {cols: c})
      this.reposition = false; this.$nextTick(() => {this.reposition = true})
    },

    moveWidget(dir) {
      this.$emit('move', dir)
      this.reposition = false; this.$nextTick(() => {this.reposition = true})
    },

    copyWidget(dir) {
      copyToClipboard(JSON.stringify(this.$store.widgetByID(this.id)))
      // FIXME: need some visual feedback
    },

  },

}

</script>
