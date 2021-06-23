<template>
  <div id="App">
    <!-- Skip navigation -->
    <skip-navigation/>

    <!-- Banner IE -->
    <banner-i-e v-if="browserLessIe11"
                :version="browserVersion"/>

    <!-- Flash message -->
    <flash-message/>

    <!-- Header -->
    <header-element/>
    <header-ghost/>
    <!-- / Header -->

    <!-- Navmain -->
    <template v-if="$store.state.navmain.items.length">
      <transition name="vueFadeEffect">
        <navmain-overlay v-if="$store.state.parameters.openNavmain"/>
      </transition>
      <navmain-element :key="`${$store.state.navmain.key}-navmain`"/>
    </template>
    <!-- / Navmain -->

    <!-- Content -->
    <transition name="vueFadeEffectPage"
                mode="out-in">
      <router-view :key="$route.params.id ? `${$route.params.id}-view` : 'view'"/>
    </transition>
    <!-- / Content -->

    <!-- Footer -->
    <footer-element v-if="![$enums.pages.ERROR_404, $enums.pages.GALLERY].includes($store.state.route.current)"/>

    <!-- Cookies info -->
    <cookies-bar/>
  </div>
</template>

<script>
import HeaderElement from '@Components/header/HeaderElement'
import HeaderGhost from '@Components/header/HeaderGhost'
import NavmainElement from '@Components/navmain/NavmainElement'
import NavmainOverlay from '@Components/navmain/NavmainOverlay'
import CookiesBar from '@Components/cookiesBar/CookiesBar'
import BannerIE from '@Components/banner/BannerIE'
import FlashMessage from '@Components/flashMessage/FlashMessage'
import FooterElement from '@Components/footer/FooterElement'
import SkipNavigation from '@Components/accessibility/SkipNavigation'

const { detect } = require('detect-browser')

export default {
  name: 'App',
  data () {
    return {
      browserLessIe11: false,
      browserVersion: null
    }
  },
  components: {
    HeaderElement,
    HeaderGhost,
    NavmainElement,
    NavmainOverlay,
    CookiesBar,
    BannerIE,
    FlashMessage,
    FooterElement,
    SkipNavigation
  },
  computed: {
    /**
     * Status navmain
     * @returns {boolean}
     */
    cToggleNavmain () {
      return this.$store.state.parameters.openNavmain
    }
  },
  watch: {
    cCurrentLanguage (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchDataNavmain(this.cCurrentLanguage)
        this.fetchDataMeta(this.cCurrentLanguage)
      }
    },
    cToggleNavmain (newVal, oldVal) {
      if (newVal !== oldVal && newVal === false) {
        this.refreshNavmain(false)
      }
    }
  },
  methods: {
    /**
     * Customization background
     */
    customization () {
      // Retina image
      if (this.$store.state.customization.imageRetina) {
        document.styleSheets[1].insertRule(
          `@media
            only screen and (-moz-min-device-pixel-ratio: 2),
            only screen and (-webkit-min-device-pixel-ratio: 2),
            only screen and (-o-min-device-pixel-ratio: 2/1),
            only screen and (min-device-pixel-ratio: 2),
            only screen and (min-resolution: 192dpi),
            only screen and (min-resolution: 2dppx) {
            .customization {
                background-image: url('${this.$store.getters['customization/path']('@2x')}');
            }
         }`, 0)
      }

      // Base
      const image = this.$store.state.customization.image ? `url('${this.$store.getters['customization/path']()}')` : 'none'
      const backgroundSize = !this.$store.state.customization.cover ? this.$store.state.customization.imageSize : 'cover'
      document.styleSheets[1].insertRule(
        `.customization {
            background: ${this.$store.state.customization.backgroundColor} ${image} ${this.$store.state.customization.backgroundPosition} top ${this.$store.state.customization.backgroundAttachment} ${this.$store.state.customization.backgroundRepeat};
            background-size: ${backgroundSize};
            min-height: 80vh;
        }`, 0)
      // Add background color to elem app
      document.querySelector('#App').style.backgroundColor = this.$store.state.customization.backgroundColor
    },
    /**
     * Fetch data navmain
     * @param {string} lang
     */
    fetchDataNavmain (lang) {
      this.$store.dispatch('navmain/get', lang)
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
          // Flash message error
          this.$store.dispatch('flashMessage/error', {
            title: this.$t('flashMessage.error.title-1'),
            msg: this.$t('flashMessage.error.content-3'),
            reloadButton: true
          })
        })
    },
    /**
     * Fetch data meta
     * @param {string} lang
     */
    fetchDataMeta (lang) {
      this.$store.dispatch('configuration/getMetaDescription', lang)
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
    }
  },
  created () {
    // Detect IE browser
    const browser = detect()
    if (browser) this.browserVersion = browser.version
    if (browser && browser.name) {
      this.$store.commit('parameters/setBrowserName', browser.name)
    }
    this.browserLessIe11 = browser && browser.name === this.$enums.browserName.IE && this.browserVersion !== '11.0.0'
    if (browser && [this.$enums.browserName.IE].includes(browser.name)) document.body.classList.add(this.$enums.browserName.IE)

    // Customization data
    this.$store.dispatch('customization/get')
      .then(() => {
        this.customization()
      })
      .catch((error) => {
        if (process.env.DEBUG) console.log(error.response)
      })

    // Contact information data
    this.$store.dispatch('contactInformation/get')
      .catch((error) => {
        if (process.env.DEBUG) console.log(error.response)
        // Flash message error
        this.$store.dispatch('flashMessage/error', {
          title: this.$t('flashMessage.error.title-1'),
          msg: this.$t('flashMessage.error.content-3'),
          reloadButton: true
        })
      })

    // Meta description
    this.fetchDataMeta(this.cCurrentLanguage)

    // Navmain data
    this.fetchDataNavmain(this.cCurrentLanguage)
  }
}
</script>

<style lang="scss">
.grecaptcha-badge {
  visibility: hidden;
}
</style>
