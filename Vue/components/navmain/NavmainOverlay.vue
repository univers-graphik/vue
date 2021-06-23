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
    },
    /**
     * Close navmain by escape
     * @param {object} event
     */
    closeNavmainByEscape (event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.closeNavmain()
      }
      event.preventDefault()
    }
  },
  mounted () {
    // Listener touchstart overlay
    if (this.$refs.navmainOverlay) {
      this.$refs.navmainOverlay.addEventListener('touchstart', this.closeNavmain, false)
    }
    // Listener escape
    window.addEventListener('keyup', this.closeNavmainByEscape, false)
  },
  destroyed () {
    if (this.$refs.navmainOverlay) {
      this.$refs.navmainOverlay.removeEventListener('touchstart', this.closeNavmain, false)
    }
    window.removeEventListener('keyup', this.closeNavmainByEscape, false)
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
