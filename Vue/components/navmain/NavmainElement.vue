<template>
  <nav :class="{ isOpen: $store.state.parameters.openNavmain }"
       :aria-label="$t('common.mainMenu')"
       class="navmain"
       role="navigation"
       tabindex="-1"
       ref="navmain"
       @keyup.tab.once="openNavmain">
    <navmain-list :collection="$store.state.navmain.items"
                  :sub-nav="subNav"
                  :depth="1"/>
    <!-- Close navmain with tab navigation -->
    <span tabindex="0"
          @keyup.tab.once="closeNavmain"></span>
  </nav>
</template>

<script>
import NavmainList from './NavmainList'

export default {
  name: 'NavmainElement',
  data () {
    return {
      subNav: {}
    }
  },
  components: {
    NavmainList
  },
  computed: {
    /**
     * Status focus to navmain
     * @returns {boolean}
     */
    cFocusToNavmain () {
      return this.$store.state.accessibility.focusToNavmain
    }
  },
  watch: {
    cFocusToNavmain (newVal, oldVal) {
      if (newVal !== oldVal) {
        const element = this.$refs.navmain
        newVal === true ? this.giveFocusTo(element) : this.removeFocusTo(element)
      }
    }
  },
  methods: {
    /**
     * Open navmain
     */
    openNavmain () {
      if (!this.$store.state.parameters.openNavmain) {
        this.$store.commit('parameters/setOpenNavmain', true)
      }
    },
    /**
     * Close navmain
     */
    closeNavmain () {
      if (this.$store.state.parameters.openNavmain) {
        this.$store.commit('parameters/setOpenNavmain', false)
      }
    }
  },
  mounted () {
    // If sub nav items
    if (Object.entries(this.$store.state.navmain[this.$enums.config.SUB_NAV]).length) {
      // Clone without reference
      this.subNav = { ...this.$store.state.navmain[this.$enums.config.SUB_NAV] }
      const loopItems = (currentItem) => {
        const targetCurrentItem = currentItem.parentElement.parentElement.parentElement
        if (targetCurrentItem.hasAttribute('data-sub')) {
          this.subNav[targetCurrentItem.dataset.sub] = true
          loopItems(targetCurrentItem)
        }
      }
      const currentItem = this.$refs.navmain.querySelector(`.${this.$enums.config.IS_CURRENT}`)
      if (currentItem) loopItems(currentItem)
    } else {
      this.subNav = this.$store.state.navmain[this.$enums.config.SUB_NAV]
    }
  }
}
</script>

<style scoped lang="scss">
.navmain {
  $navmainWidth: 270px;

  width: $navmainWidth;
  height: 100%;
  max-height: calc(100% - #{$headerHeight});
  position: fixed;
  top: $headerHeight;
  bottom: 0;
  left: 0;
  z-index: $zIndex;
  transform: translate3d(-$navmainWidth, 0, 0);
  overflow: {
    x: hidden;
    y: auto;
  }
  background-color: $color4;
  color: White;
  transition: transform .5s ease;
  @media #{$isMobile} {
    max-height: calc(100% - #{$headerHeightMobile});
    top: $headerHeightMobile;
  }

  &.isOpen {
    transform: translate3d(0, 0, 0);
  }

  &:focus {
    outline: none;
  }
}
</style>
