<template>
  <div class="header"
       ref="header">
    <!-- Logo -->
    <router-link :to="{ name: $enums.pages.HOMEPAGE, params: { lang: $store.state.parameters.urlLang } }"
                 @click.native="resetNavmain">
      <img :alt="$enums.config.SOCIETY_NAME"
           class="header__logo"
           src="/medias/logo/logo.png"
           srcset="/medias/logo/logo@2x.png"/>
    </router-link>
    <!-- / Logo -->

    <!-- Icon hamburger -->
    <button v-if="$store.state.navmain.items.length"
            :class="{ isOpen: $store.state.parameters.openNavmain }"
            class="menuIcon menuIcon--spin menuIcon--white"
            type="button"
            @click.prevent="toggleNavmain">
            <span class="menuIcon__box">
                <span class="menuIcon__inner"></span>
            </span>
    </button>
    <!-- / Icon hamburger -->

    <template v-if="[$enums.pages.ERROR_404, $enums.pages.GALLERY].indexOf($store.state.route.current) === -1">
      <!-- User tools -->
      <ul class="header__user">
        <!-- Search -->
        <li class="header__user__item">
          <button class="header__user__button button"
                  type="button"
                  @click.prevent="openSearch">
                        <span class="header__user__icon">
                            <i class="icon-search"></i>
                        </span>
            <span class="header__user__txt">
                            {{ $t('common.search') }}
                        </span>
          </button>
        </li>
        <!-- / Search -->

        <template v-if="$enums.config.E_COMMERCE">
          <!-- Account -->
          <li class="header__user__item">
            <button class="header__user__button button"
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
            <button class="header__user__button button"
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
      </ul>
      <!-- / User tools -->

      <!-- Translate -->
      <Language :light="true"
                class="header__language"/>

      <!-- Search engine -->
      <transition name="vueFadeEffect">
        <Search v-if="isVisible"
                ref="search"
                @isvisible="isVisible = false"/>
      </transition>
      <!-- / Search engine -->
    </template>
  </div>
</template>

<script>
import Language from '@Components/language/Language'
import Search from '@Components/search/Search'

export default {
  name: 'Header',
  components: {
    Language,
    Search
  },
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    /**
     * Toggle navmain
     */
    toggleNavmain () {
      const isOpen = !this.$store.state.parameters.openNavmain
      this.$store.commit('parameters/setOpenNavmain', isOpen)
      if (isOpen) {
        document.documentElement.style.height = '100%'
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.removeAttribute('style')
      }
    },
    /**
     * Open search engine
     */
    openSearch () {
      this.isVisible = !this.isVisible
      if (this.isVisible) {
        document.documentElement.style.height = '100%'
        document.documentElement.style.overflow = 'hidden'
        setTimeout(() => {
          this.$refs.search.$refs.searchEvent.click()
        }, 200)
      }
    }
  },
  mounted () {
    // Store header height
    this.$store.commit('parameters/setHeaderHeight', this.$refs.header.clientHeight)
  }
}
</script>

<style scoped lang="scss">
  .header {
    $spacingV: 10px;
    $spacingH: 15px;

    padding: $spacingV $spacingH;
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
      max-height: $headerHeight - $spacingV;
      @media #{$isMobile} {
        max-height: $headerHeightMobile - $spacingV;
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
      @include ulBullet();
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
        padding-top: 22px;
        position: relative;
        color: White;
        transition: color .5s ease;
        @media #{$isMobile} {
          padding-top: 0;
        }

        &:hover {
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
          font-size: 20px;
          @media #{$isMobile} {
            font-size: 22px;
          }

          &[data-cart-quantity] {
            &:after {
              @include badge(
                $background: $color7
              );
              content: attr(data-cart-quantity);
              position: absolute;
              top: -6px;
              right: -15px;
            }
          }
        }
      }

      .icon-shopping-cart {
        top: -2px;
        font-size: 25px;
        @media #{$isMobile} {
          top: 0;
          font-size: 24px;
        }
      }

      &__txt {
        margin-top: 5px;
        display: block;
        font: {
          size: 12px;
          family: $robotoLight;
        }
        @media #{$isMobile} {
          display: none;
        }
      }
    }
  }
</style>
