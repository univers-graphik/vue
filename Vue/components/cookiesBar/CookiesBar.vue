<template>
  <transition name="vueFadeEffect">
    <div v-if="cAlreadySeen && isVisible"
         class="cookiesBar">
      <p class="cookiesBar__title">{{ $t('cookies.content-1') }}</p>

      <div class="cookiesBar__content">
        <i18n path="cookies.content-2"
              tag="p"
              class="cookiesBar__text">
          <template v-slot:line-break>
            <br/>
          </template>
        </i18n>
        <div class="cookiesBar__img">
          <img src="/medias/interface/cookies.jpg"
               alt="cookies"/>
        </div>
      </div>
      <p class="cookiesBar__text">
        <router-link
          :to="{ name: $enums.pages.LEGAL_NOTICE, params: { lang: $store.state.parameters.urlLang, slug: $pagesUrl[$i18n.locale].legalNotice }, hash: `#${$enums.anchor.COOKIES}` }"
          class="cookiesBar__link">
          {{ $t('cookies.link') }}
        </router-link>
        <button class="button cookiesBar__button"
                type="button"
                @click.prevent="toggleCookieBar">{{ $t('cookies.button') }}
        </button>
      </p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CookiesBar',
  data () {
    return {
      cookieName: 'cookiesBar',
      isVisible: true
    }
  },
  computed: {
    /**
     * Cookies bar already seen
     * @returns {boolean}
     */
    cAlreadySeen () {
      return !localStorage.getItem(this.cookieName)
    }
  },
  methods: {
    /**
     * Hide and storage status
     */
    toggleCookieBar () {
      localStorage.setItem(this.cookieName, 'see')
      this.isVisible = !this.isVisible
    }
  }
}
</script>

<style scoped lang="scss">
  .cookiesBar {
    padding: 15px;
    max-width: 400px;
    position: fixed;
    left: 30px;
    bottom: 30px;
    z-index: $zIndex + 20;
    border-radius: 4px;
    background-color: White;
    box-shadow: 0 0 10px rgba(Black, .5);
    @media #{$isMobile} {
      max-width: 100%;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 0;
    }

    &__title {
      margin-top: 0;
      margin-bottom: 5px;
      font-family: $robotoBold;
    }

    &__text {
      font-size: 13px;
    }

    &__content {
      margin-bottom: 20px;
      display: flex;

      .cookiesBar__text {
        width: 60%;
        font-size: 13px;
        @media #{$isMobile} {
          width: 100%;
        }
      }

      .cookiesBar__img {
        margin-left: 20px;
        width: 40%;
        @media #{$isMobile} {
          display: none;
        }
      }
    }

    &__link {
      margin-top: 5px;
      display: inline-block;
      color: $mainColor;

      &:hover {
        color: Peru;
        text-decoration: none;
      }
    }

    &__button {
      height: 26px;
      float: right;
      border-radius: 2px;
      background-color: MediumSeaGreen;
      color: White;
      transition: background-color .5s ease;

      &:hover {
        background-color: Peru;
      }
    }
  }
</style>
