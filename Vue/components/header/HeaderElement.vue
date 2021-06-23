<template>
  <header class="header"
          ref="header"
          role="banner">
    <!-- Logo -->
    <router-link :to="{ name: $enums.pages.HOMEPAGE, params: { lang: $store.state.parameters.urlLang } }"
                 class="header__logoLink"
                 @click.native="refreshNavmain">
      <img :alt="$enums.config.SOCIETY_NAME"
           class="header__logo"
           src="/medias/logo/logo.png"
           srcset="/medias/logo/logo@2x.png 2x"/>
    </router-link>
    <!-- / Logo -->

    <!-- Icon hamburger -->
    <button v-if="$store.state.navmain.items.length"
            :class="{ isOpen: $store.state.parameters.openNavmain }"
            class="menuIcon menuIcon--spin menuIcon--hasFocus is-text-white"
            type="button"
            @click.prevent="toggleNavmain">
            <span class="menuIcon__box">
                <span class="menuIcon__inner"></span>
            </span>
    </button>
    <!-- / Icon hamburger -->

    <!-- Header tools -->
    <template v-if="![$enums.pages.ERROR_404, $enums.pages.GALLERY].includes($store.state.route.current)">
      <!-- User tools -->
      <ul class="header__user">
        <!-- Search button -->
        <li class="header__user__item">
          <button class="button header__user__button"
                  type="button"
                  @click.prevent="openSearchEngine">
            <span class="header__user__icon">
                <i class="icon-search"></i>
            </span>
            <span class="header__user__txt">
                {{ $t('common.search') }}
            </span>
          </button>
        </li>
        <!-- / Search button -->

        <!-- E-Commerce -->
        <template v-if="$enums.config.E_COMMERCE">
          <!-- Account -->
          <li class="header__user__item">
            <button class="button header__user__button"
                    type="button">
              <span class="header__user__icon">
                <i class="icon-account"></i>
              </span>
              <span class="header__user__txt">{{ $t('common.login') }}</span>
            </button>
          </li>
          <!-- / Account -->

          <!-- Shopping cart -->
          <li class="header__user__item">
            <button class="button header__user__button"
                    type="button">
              <span class="header__user__icon">
                <i class="icon-shopping-cart"
                   data-cart-quantity="2"></i>
              </span>
              <span class="header__user__txt">{{ $t('common.cart') }}</span>
            </button>
          </li>
          <!-- / Shopping cart -->
        </template>
        <!-- / E-Commerce -->
      </ul>
      <!-- / User tools -->

      <!-- Translate -->
      <language-choice :light="true"
                       class="header__language"/>

      <!-- Search engine -->
      <transition name="vueFadeEffect">
        <search-engine v-if="$store.state.search.openSearch"
                       ref="search"/>
      </transition>
      <!-- / Search engine -->
    </template>
    <!--/ Header tools -->
  </header>
</template>

<script>
import LanguageChoice from '@Components/language/LanguageChoice'
import SearchEngine from '@Components/search/SearchEngine'

export default {
  name: 'HeaderElement',
  components: {
    LanguageChoice,
    SearchEngine
  },
  methods: {
    /**
     * Toggle navmain
     */
    toggleNavmain () {
      this.$store.commit('parameters/setOpenNavmain', !this.$store.state.parameters.openNavmain)
    },
    /**
     * Open search engine
     */
    openSearchEngine () {
      this.$store.commit('search/setOpenSearch', true)
    }
  },
  mounted () {
    // Store header height
    this.$store.commit('parameters/setHeaderHeight', this.$refs.header.clientHeight)
  }
}
</script>

<style scoped lang="scss">
$header: '.header';

#{$header} {
  $spacingV: rem(5);

  padding: $spacingV rem(15);
  width: 100%;
  max-width: 100vw;
  height: $headerHeight;
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: $zIndex + 15;
  border-bottom: 1px solid Black;
  background: transparent url('/medias/interface/background-header.png') repeat left top;
  @include retina('/medias/interface/background-header@2x.png', 4px, 4px);
  box-shadow: 0 0 2px 0 rgba(Black, .5);
  @media #{$isMobile} {
    height: $headerHeightMobile;
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: radial-gradient(circle at center, rgba(White, .1), rgba(White, 0));
    @media #{$isMobile} {
      background: radial-gradient(circle at center, rgba(White, .05), rgba(White, 0));
    }
  }

  &__logo {
    width: auto;
    max-height: $headerHeight - ($spacingV * 2);
    vertical-align: middle;
    @media #{$isMobile} {
      max-height: $headerHeightMobile - ($spacingV * 2);
    }
  }

  &__logoLink {
    &:focus {
      #{$header}__logo {
        box-shadow: 0 0 6px $color5;
      }
    }
  }

  .menuIcon {
    margin-left: 20px;
    @media #{$isMobile} {
      margin-left: 0;
      margin-right: 10px;
      order: -1;
    }
  }

  &__language {
    margin-left: 30px;
    @media #{$isMobile} {
      display: none;
    }
  }

  &__user {
    @include ul-bullet();
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
    color: White;

    &__item {
      padding: 0 4px;
      border-right: 1px solid rgba(White, .3);
      @media #{$isMobile} {
        padding: 0 2px;
      }

      &:last-child {
        @media #{$isMobile} {
          padding-right: 0;
          border-right: none;
        }
      }
    }

    &__button {
      padding-top: rem(22);
      position: relative;
      color: White;
      transition: color .5s ease;
      @media #{$isMobile} {
        padding-top: 0;
      }

      &:hover,
      &:focus {
        color: $color5;
      }
    }

    &__icon {
      display: inline-block;
      vertical-align: top;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      @media #{$isMobile} {
        position: static;
      }

      [class^="icon-"] {
        position: relative;
        font-size: rem(20);
        @media #{$isMobile} {
          font-size: rem(22);
        }

        &[data-cart-quantity] {
          &:after {
            @include badge(
              $background: $color7
            );
            content: attr(data-cart-quantity);
            position: absolute;
            top: - rem(6);
            right: - rem(15);
          }
        }
      }
    }

    .icon-shopping-cart {
      top: - rem(2);
      font-size: rem(25);
      @media #{$isMobile} {
        top: 0;
        font-size: rem(24);
      }
    }

    &__txt {
      margin-top: 5px;
      display: block;
      font: {
        size: rem(13);
        family: $robotoLight;
      }
      @media #{$isMobile} {
        display: none;
      }
    }
  }
}
</style>
