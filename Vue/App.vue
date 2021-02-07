<template>
  <div id="App">
    <!-- Banner IE -->
    <BannerIE v-if="browserLessIe11"
              :version="browserVersion"/>

    <!-- Flash message -->
    <FlashMessage/>

    <!-- Header -->
    <Header/>

    <HeaderGhost/>
    <!-- / Header -->

    <!-- Navmain -->
    <template v-if="$store.state.navmain.items.length">
      <transition name="vueFadeEffect">
        <NavmainOverlay v-if="$store.state.parameters.openNavmain"/>
      </transition>
      <Navmain :key="`${$store.state.navmain.key}-navmain`"/>
    </template>
    <!-- / Navmain -->

    <!-- Content -->
    <transition name="vueFadeEffectPage"
                mode="out-in">
      <router-view :key="`${$route.params.id}-view`"/>
    </transition>
    <!-- / Content -->

    <!-- Footer -->
    <Footer v-if="[$enums.pages.ERROR_404, $enums.pages.GALLERY].indexOf($store.state.route.current) === -1"/>

    <!-- Cookies info -->
    <CookiesBar/>
  </div>
</template>

<script>
import Header from '@Components/header/Header'
import HeaderGhost from '@Components/header/HeaderGhost'
import Navmain from '@Components/navmain/Navmain'
import NavmainOverlay from '@Components/navmain/NavmainOverlay'
import CookiesBar from '@Components/cookiesBar/CookiesBar'
import BannerIE from '@Components/banner/BannerIE'
import FlashMessage from '@Components/flashMessage/FlashMessage'
import Footer from '@Components/footer/Footer'

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
    Header,
    HeaderGhost,
    Navmain,
    NavmainOverlay,
    CookiesBar,
    BannerIE,
    FlashMessage,
    Footer
  },
  computed: {
    /**
     * Current lang url
     * @returns {string}
     */
    cLangActive () {
      return this.$store.state.parameters.urlLang
    },
    /**
     * Status navmain
     * @returns {boolean}
     */
    cToggleNavmain () {
      return this.$store.state.parameters.openNavmain
    }
  },
  watch: {
    cLangActive (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadDataNavmain(this.cLangActive)
        this.loadDataGalleriesExtract(this.cLangActive)
        this.loadDataMeta(this.cLangActive)
      }
    },
    cToggleNavmain (newVal, oldVal) {
      if (newVal !== oldVal && newVal === false) {
        this.resetNavmain()
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
     * Load data navmain
     * @param {string} lang
     */
    loadDataNavmain (lang) {
      this.$store.dispatch('navmain/get', lang)
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
          // Flash message error
          this.$store.dispatch('flashMessage/error', {
              title: this.$t('flashMessage.error.title-1'),
              msg: this.$t('flashMessage.error.content-3'),
              reloadButton: true
            }
          )
        })
    },
    /**
     * Load data galleries extract
     * @param {string} lang
     */
    loadDataGalleriesExtract (lang) {
      this.$store.dispatch('gallery/getExtract', lang)
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
    },
    /**
     * Load data meta
     * @param {string} lang
     */
    loadDataMeta (lang) {
      this.$store.dispatch('meta/get', lang)
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
    }
  },
  created () {
    // Detect IE browser
    const browser = detect()
    if (browser) this.browserVersion = browser.version
    this.browserLessIe11 = browser && browser.name === 'ie' && this.browserVersion !== '11.0.0'
    if (browser && ['ie'].indexOf(browser.name) !== -1) document.body.classList.add('ie')

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
          }
        )
      })

    // Meta description
    this.loadDataMeta(this.cLangActive)

    // Navmain data
    this.loadDataNavmain(this.cLangActive)

    // Galleries extract
    if (this.$enums.config.GALLERY) this.loadDataGalleriesExtract(this.cLangActive)
  }
}
</script>

<style lang="scss">
.grecaptcha-badge {
  visibility: hidden;
}
</style>
