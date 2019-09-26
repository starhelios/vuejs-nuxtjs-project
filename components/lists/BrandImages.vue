<template>
  <v-container
    py-0
    class="brand-images"
  >
    <v-layout
      row
      wrap
      :justify-space-around="$vuetify.breakpoint.smAndUp"
      :justify-space-between="$vuetify.breakpoint.xsOnly"
    >
      <img
        src="/img/companies/logos-mobile.svg"
        class="hidden-sm-and-up mb-4"
        style="max-width: 100%"
      >
      <img
        src="/img/companies/logos-desktop.svg"
        class="hidden-xs-only"
        style="max-width: 100%"
      >
    </v-layout>
  </v-container>
</template>
