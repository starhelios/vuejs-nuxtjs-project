<template>
  <div
    v-if="isLocal()"
    class="styling-image"
    :style="getClasses()"
  />
</template>
<style>
    .styling-image {
        background: no-repeat center 0;
        /*background-size: contain;*/
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0.5;
    }

    @media (max-width: 375px) {
        .styling-image {
            /*background-size: cover;*/
        }
    }
</style>
<script>
export default {

  data() {
    return {
      isHydrated: false
    }
  },

  computed: {
    isDevice() {
      return this.isHydrated
        ? ['sm', 'xs', 'md'].indexOf(this.$vuetify.breakpoint.name) > -1
        : false
    },
    currentImage() {
      return this.getImagePath('site')
    }
  },

  mounted() {
    this.isHydrated = true
  },

  methods: {

    getClasses() {
      return {
        'background-image': 'url(' + this.currentImage + ')',
        'display': this.isLocal() ? 'block' : 'none'
      }
    },

    getImagePath(name) {
      return '/delete/' + (this.isDevice ? 'mobile' : 'desktop') + '-' + name + '.png'
    },

    isLocal() {
      return false
    }
  }

}
</script>
