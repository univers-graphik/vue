<template>
  <span :id="$enums.anchor.MAIN_CONTENT"
        class="focusContent"
        tabindex="-1"
        ref="focusContent"></span>
</template>

<script>
export default {
  name: 'FocusToContent',
  computed: {
    /**
     * Status focus to content
     * @returns {boolean}
     */
    cFocusToContent () {
      return this.$store.state.accessibility.focusToContent
    }
  },
  watch: {
    cFocusToContent (newVal, oldVal) {
      if (newVal !== oldVal) {
        const element = this.$refs.focusContent
        newVal === true ? this.giveFocusTo(element) : this.removeFocusTo(element)
      }
    }
  }
}
</script>
