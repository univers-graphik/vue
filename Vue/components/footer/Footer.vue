<template>
  <footer class="footer">
    <div class="mainContainer">
      <!-- Translate -->
      <Language :light="true"
                class="footer__language"/>

      <div class="row">
        <!-- Contact informations -->
        <div class="col-sm-3">
          <h3 class="footer__title">{{ $t('common.contactUs') }}</h3>
          <template v-if="$store.state.contactInformation.loaded">
            <ul class="footer__list">
              <!-- E-mail -->
              <li v-if="$store.state.contactInformation.email"
                  class="footer__list__item">
                {{ $tc('common.email', 2) }} :
                <span
                  v-html="$options.filters.cryptMailto(cCryptEmail, 'linkType2 linkType2--white', $t('common.sendEmail'))"></span>
              </li>
              <!-- Phone -->
              <li v-if="$store.state.contactInformation.phone"
                  class="footer__list__item">
                {{ $tc('common.phone', 2) }} :
                {{ $store.state.contactInformation.phone }}
              </li>
              <!-- Fixed phone -->
              <li v-if="$store.state.contactInformation.fixedPhone"
                  class="footer__list__item">
                <span class="is-upperfirst">{{ $t('common.fixed_phone') }}</span> :
                {{ $store.state.contactInformation.fixedPhone }}
              </li>
              <!-- Fax -->
              <li v-if="$store.state.contactInformation.fax"
                  class="footer__list__item">
                <span class="is-upperfirst">{{ $t('common.fax') }}</span> :
                {{ $store.state.contactInformation.fax }}
              </li>
            </ul>
          </template>
          <div v-else
               class="loaderCircular loaderCircular--white is-marginTop-10"></div>
        </div>
        <!-- / Contact informations -->

        <div class="footer__separator is-mobile"></div>

        <!-- Informations -->
        <div class="col-sm-3">
          <h3 class="footer__title">{{ $t('common.informations') }}</h3>
          <ul class="footer__list">
            <li class="footer__list__item">
              <router-link
                :to="{ name: $enums.pages.CONTACT, params: { lang: $store.state.parameters.urlLang, slug: $pagesUrl[$i18n.locale].contact } }"
                :data-hint="$t('common.sendMessage')"
                class="footer__link hint-top-middle-mobile hint-anim"
                @click.native="resetNavmain">
                {{ $t('pages.navmain.contact') }}
              </router-link>
            </li>
            <li class="footer__list__item">
              <router-link
                :to="{ name: $enums.pages.LEGAL_NOTICE, params: { lang: $store.state.parameters.urlLang, slug: $pagesUrl[$i18n.locale].legalNotice } }"
                :data-hint="$t('common.importantSiteNotices')"
                class="footer__link hint-top-middle-mobile hint-anim"
                @click.native="resetNavmain">
                {{ $t('pages.navmain.legalNotice') }}
              </router-link>
            </li>
            <li class="footer__list__item">
              <a :data-hint="$t('common.websiteCreation')"
                 class="footer__link hint-top-middle-mobile hint-anim"
                 href="https://www.univers-graphik.fr/"
                 target="_blank">© Univers Graphik</a>
            </li>
          </ul>
        </div>
        <!-- / Information -->

        <div class="footer__separator is-mobile"></div>

        <!-- Social networkx -->
        <div class="col-sm-3">
          <h3 class="footer__title">{{ $t('common.followUs') }}</h3>
          <template v-if="$store.state.contactInformation.loaded">
            <!-- Facebook -->
            <a v-if="$store.state.contactInformation.facebookUrl"
               :href="$store.state.contactInformation.facebookUrl"
               :title="$t('common.followFacebook')"
               class="buttonType2 buttonType2--white is-marginTop-10 is-marginRight-5"
               target="_blank">
              <i class="icon-facebook"></i>
            </a>
            <!-- / Facebook -->

            <!-- Twitter -->
            <a v-if="$store.state.contactInformation.twitterUrl"
               :href="$store.state.contactInformation.twitterUrl"
               :title="$t('common.followTwitter')"
               class="buttonType2 buttonType2--white is-marginTop-10"
               target="_blank">
              <i class="icon-twitter"></i>
            </a>
            <!-- / Twitter -->
          </template>
          <div v-else
               class="loaderCircular loaderCircular--white is-marginTop-10"></div>
        </div>
        <!-- / Social network -->

        <!-- Logo / standards -->
        <div class="col-sm-3 footer__standards is-noMobile">
          <!-- Logo -->
          <img :alt="$enums.config.SOCIETY_NAME"
               class="footer__logo"
               src="/medias/logo/logo-white.png"/>

          <!-- Standards -->
          <p class="is-margin-0">
            <img v-for="(item, index) in standards"
                 :key="`${index}-standards`"
                 :src="`/medias/interface/${item.src}.png`"
                 :alt="item.label"
                 class="footer__standards__img"/>
          </p>
          <!-- / Standards -->
        </div>
        <!-- / Logo / standards -->
      </div>

      <div class="footer__separator"></div>

      <!-- Copyright -->
      <p class="is-marginBottom-0">
        Copyright © {{ cCurrentYear }} {{ $enums.config.SOCIETY_NAME }}
        <span class="copyrightSeparator"></span>
        {{ $t('footer.rightsReserved') }}
      </p>
    </div>
  </footer>
</template>

<script>
import Language from '@Components/language/Language'

export default {
  name: 'Footer',
  data () {
    return {
      standards: [
        {
          label: 'HTML5',
          src: 'html5'
        },
        {
          label: 'CSS3',
          src: 'css3'
        },
        {
          label: 'Vue.js',
          src: 'vue'
        }
      ]
    }
  },
  components: {
    Language
  },
  computed: {
    /**
     * Current year
     * @returns {number}
     */
    cCurrentYear () {
      return new Date().getFullYear()
    },
    /**
     * Crypt with btoa
     * @returns {string}
     */
    cCryptEmail () {
      return btoa(this.$store.state.contactInformation.email)
    }
  }
}
</script>

<style scoped lang="scss">
  .footer {
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
    border-top: 1px solid White;
    background: transparent url('/medias/interface/background-footer.png') repeat left top;
    @include retina('/medias/interface/background-footer@2x.png', 200px, 200px);
    color: White;
    font-size: 13px;
    @media #{$isMobile} {
      padding-bottom: 50px;
    }

    &__title {
      margin: 0;
      padding-bottom: 6px;
      border-bottom: 1px solid lighten($color4, 5%);
      color: $color2;
      font: {
        weight: normal;
        family: $robotoLight;
      }
      text-transform: uppercase;
      @media #{$isMobile} {
        padding-bottom: 0;
        border-bottom: none;
      }
    }

    &__list {
      margin: 10px 0 0 0;
      padding: 0;
      list-style: none;

      &__item {
        margin-top: 5px;

        &:first-of-type {
          margin-top: 0;
        }
      }
    }

    &__link {
      display: inline-block;
      position: relative;
      color: White;
      text-decoration: none;
      transition: color .5s ease;

      &:hover {
        color: $color5;
      }
    }

    &__separator {
      margin: 20px 0;
      height: 0;
      border-top: 1px solid Black;
      border-bottom: 1px solid lighten($color4, 5%);

      .row & {
        margin: 15px 10px;
      }
    }

    &__logo {
      max-width: 130px;
    }

    &__standards {
      text-align: right;

      &__img {
        margin-left: 5px;
        width: 25px;
      }
    }

    .copyrightSeparator {
      margin-left: 5px;
      margin-right: 5px;
      display: inline-block;
      @media #{$isMobile} {
        margin: 0;
        display: block;
      }

      &:before {
        content: '-';
        @media #{$isMobile} {
          display: none;
        }
      }
    }

    &__language {
      display: none;
      position: absolute;
      right: 15px;
      top: 12px;
      z-index: 10;
      @media #{$isMobile} {
        display: block;
      }
    }
  }
</style>
