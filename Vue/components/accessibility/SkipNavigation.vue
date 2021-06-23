<template>
  <div>
    <!-- Target first element to focus -->
    <span :id="firstElementFocus"
          tabindex="-1"></span>

    <!-- Skip links -->
    <nav class="skipNavigation visually-hidden-focusable">
      <!-- To main content -->
      <a v-scroll-to="{
            el: `#${$enums.anchor.MAIN_CONTENT}`,
            duration: 50,
            onStart: () => $store.commit('accessibility/setFocusToContent', false),
            onDone: changeFocusToContentStatus
          }"
         class="skipNavigation__link buttonType1"
         href="#">{{ $t('accessibility.skipToContent') }}</a>
      <!-- / To main content -->

      <!-- To navmain -->
      <a class="skipNavigation__link buttonType1"
         href="#"
         @click.prevent="openNavmain">{{ $t('accessibility.skipToNavigation') }}</a>
      <!-- / To navmain -->

      <!-- To search engine -->
      <a v-if="![$enums.pages.ERROR_404, $enums.pages.GALLERY].includes($store.state.route.current)"
         class="skipNavigation__link buttonType1"
         href="#"
         @click.prevent="openSearchEngine">{{ $t('accessibility.skipToSearch') }}</a>
      <!-- / To search engine -->
    </nav>
    <!-- / Skip links -->
  </div>
</template>

<script>
export default {
  name: 'SkipNavigation',
  data () {
    return {
      firstElementFocus: process.env.FIRST_ELEMENT_FOCUS
    }
  },
  methods: {
    /**
     * Change status focusToContent in store
     */
    changeFocusToContentStatus () {
      setTimeout(() => {
        this.$store.commit('accessibility/setFocusToContent', true)
      }, 0)
    },
    /**
     * Open navmain
     */
    openNavmain () {
      this.$store.commit('parameters/setOpenNavmain', true)
    },
    /**
     * Open search engine
     */
    openSearchEngine () {
      this.$store.commit('search/setOpenSearch', true)
    }
  }
}
</script>

<style scoped lang="scss">
.skipNavigation {
  padding: rem(10);
  position: fixed;
  top: 0;
  left: 50%;
  z-index: $zIndex + 40;
  transform: translateX(-50%);
  background-color: White;
  box-shadow: 0 0 4px rgba(Black, .4);
  @media #{$isMobile} {
    left: 15%;
    right: 15%;
    transform: none;
  }

  &__link {
    margin-top: rem(10);
    display: block;

    &:first-of-type {
      margin-top: 0;
    }
  }
}
</style>
