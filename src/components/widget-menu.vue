<!-- WidgetMenu - Display button to add a widget via a menu
     When a menu entry is selected, emits a 'select' event with the widget kind.
     Copyright ©2021 Thorsten von Eicken, MIT license, see LICENSE file
-->

<template>
<div>
      <v-navigation-drawer disable-resize-watcher v-model="menuDrawer" app :right="$vuetify.rtl" mobile-breakpoint="960" width="200" >
        <v-list dense>
      <v-list-item class="py-1 px-1" v-for="(icon, kind) in widget_list" :key="kind" @click="$emit('select', kind)">
          <v-list-item-icon class="mx-2">
            <v-icon left size="30px">{{icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title><span style="white-space: normal;">{{$t('components.'+kind)}}</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list>
      </v-navigation-drawer >  
</div>

  <!-- <v-menu offset-y v-model="show">
    <template v-slot:activator="{ on:menu, attrs }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on:tt }">
          <v-btn small icon :class="button_class" color="primary" v-bind="attrs" v-on="{...tt, ...menu}">
            <v-icon  size="3rem">mdi-plus-circle</v-icon>
          </v-btn>
        </template>
        <span>Add a widget to the end of the grid</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-subheader>Add Widget to the end of the grid</v-subheader>
      <v-list-item v-for="(descr, kind) in widget_list" :key="kind"
                   @click="$emit('select', kind)" link>
          <v-list-item-title>{{$t('components.'+kind)}}</v-list-item-title>
          <v-list-item-subtitle v-if="descr">{{descr}}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-menu> -->
</template>

<style scoped>
/* reduce height of menu */
.v-menu__content .v-list-item { min-height: 2rem; width: 500px;}
.v-menu__content .v-list-item__title { flex: 0 0 auto; margin-right: 12px; }
</style>

<script scoped>
export default {
  name: 'WidgetMenu',

  inject: [ 'palette' ],

  props: {
    button_class: [],
    drawer: {default: false}
  },


  computed: {
    // list of available widgets for the menu
    menuDrawer: {
      get() {
        return this.drawer
      },
      set(val) {
        if (!val) this.$emit('drwr', false);
      }
    },

    widget_list() {
      // the map() below extracts the first line from the help for inclusion in the menu
      return Object.fromEntries(Object.keys(this.palette.widgets).sort().map(w =>
        [ w, (this.palette.widgets[w].icon||"").replace(/^([^.\n]{0,80}).*/s, "$1") ]
      ))
    },
  },

}
</script>
