<template>
  <span class="navmainOverlay"
        ref="navmainOverlay"
        @click.prevent="closeNavmain"></span>
</template>

<script>
export default {
  name: 'NavmainOverlay',
  methods: {
    /**
     * Close navmain
     */
    closeNavmain () {
      this.$store.commit('parameters/setOpenNavmain', false)
      document.documentElement.removeAttribute('style')
    }
  },
  mounted () {
    // Listener touchstart overlay
    if (this.$refs.navmainOverlay) this.$refs.navmainOverlay.addEventListener('touchstart', this.closeNavmain, false)
  },
  destroyed () {
    if (this.$refs.navmainOverlay) this.$refs.navmainOverlay.removeEventListener('touchstart', this.closeNavmain, false)
  }
}
</script>

<style scoped lang="scss">
.navmainOverlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: $zIndex;
  cursor: pointer;
  background-color: rgba(Black, .7);
}
</style>
