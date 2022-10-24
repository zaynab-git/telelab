<template>
      <v-navigation-drawer :color="this.$vuetify.theme.dark ? '#212121' : 'white'" :right="!$vuetify.rtl" v-model="drawer" clipped app mobile-breakpoint="960" width="400" >
      </v-navigation-drawer>
</template>

<script>
export default {
    data() {return {
        drawer:true
    }}
}
</script>
