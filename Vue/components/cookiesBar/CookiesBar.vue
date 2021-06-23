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
          :to="{ name: $enums.pages.LEGAL_NOTICE, params: { lang: cCurrentLanguage, seo: cSeo, slug: $pagesUrl[$i18n.locale].legalNotice }, hash: `#${$enums.anchor.COOKIES}` }"
          class="cookiesBar__link"
          @click.native="refreshNavmain">
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
$cookiesBar: '.cookiesBar';

#{$cookiesBar} {
  $spacing: 30px;

  padding: rem(15);
  max-width: 400px;
  max-height: calc(100vh - #{$spacing});
  position: fixed;
  left: $spacing;
  bottom: $spacing;
  z-index: $zIndex + 20;
  overflow: {
    x: hidden;
    y: auto;
  }
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
    margin-bottom: rem(5);
    font-family: $robotoBold;
  }

  &__text {
    font-size: rem(15);
  }

  &__content {
    margin-bottom: rem(20);
    display: flex;

    #{$cookiesBar}__text {
      width: 60%;
      @media #{$isMobile} {
        width: 100%;
      }
    }

    #{$cookiesBar}__img {
      margin-left: rem(20);
      width: 40%;
      @media #{$isMobile} {
        display: none;
      }
    }
  }

  &__link {
    margin: rem(5) 0;
    display: inline-block;
    color: $mainColor;

    &:hover {
      color: Peru;
      text-decoration: none;
    }
  }

  &__button {
    height: rem(36);
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
