<template>
  <nav :class="{ isOpen: $store.state.parameters.openNavmain }"
       class="navmain"
       ref="navmain">
    <NavmainList :collection="$store.state.navmain.items"
                 :sub-nav="subNav"
                 :depth="1"/>
  </nav>
</template>

<script>
import NavmainList from './NavmainList'

export default {
  name: 'Navmain',
  data () {
    return {
      subNav: {}
    }
  },
  components: {
    NavmainList
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
    $navmainWidth: 230px;

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
  }
</style>
