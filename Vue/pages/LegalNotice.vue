<!-- Locale translation -->
<i18n locale="fr-FR"
      src="@Locales/legalNotice/fr-FR.json"></i18n>
<i18n locale="en-US"
      src="@Locales/legalNotice/en-US.json"></i18n>
<!-- / Locale translation -->

<template>
  <div class="customization">
    <!-- Meta -->
    <meta-manager :title="`${$t('pages.title.legalNotice')} - ${$enums.config.SOCIETY_SITE}`"
                  :url="$pagesUrl[$i18n.locale].legalNotice"/>

    <!-- Panoramic -->
    <panoramic-image :type="$enums.panoramics.COMMON_TYPE"
                     :id="$enums.panoramics.LEGAL_NOTICE_ID"/>

    <!-- Main container -->
    <div class="mainContainer mainContainer--spacerTB containerFloatingCol containerFloatingCol--stickySideBar">
      <!-- Sections list -->
      <div class="floatingCol--small floatingCol--spacerRight is-noTabletPortrait">
        <affix :relative-element-selector="`#${affixReferent}`"
               :enabled="!$enums.breakpoints.MOBILE"
               :offset="{ top: $store.state.parameters.headerHeight + 10, bottom: 0 }"
               class="sidebar__item">
          <div class="sidebar__content sidebar__content--affix">
            <!-- Title -->
            <p class="sidebar__title">{{ $tc('common.heading', 2) }}</p>
            <!-- Sections -->
            <ul v-for="(item, index) in heading"
                :key="`${index}-heading`"
                class="headingList">
              <li class="headingList__item">
                <button v-scroll-to="`#${$enums.anchor[item.anchor]}`"
                        class="buttonType3"
                        type="button">{{ $t(item.label) }}
                </button>
              </li>
            </ul>
            <!-- / Sections -->
          </div>
        </affix>
      </div>
      <!-- / Sections list -->

      <!-- Main content -->
      <main :id="affixReferent"
            class="containerType1 floatingCol--large"
            role="main">
        <!-- Focus element for skip link -->
        <focus-to-content/>

        <!-- Main title -->
        <h1 class="titleType1 is-marginBottom-30"
            data-focus-title>{{ $t('pages.title.legalNotice') }}</h1>

        <!-- PROPERTY -->
        <madrid-card :id="$enums.anchor.PROPERTY"
                     :title="$t('legalNotice.property')">
          <template v-slot:content>
            <ul class="listType2 is-marginBottom-20">
              <li class="listType2__item"><b>UNIVERS GRAPHIK</b></li>
              <li class="listType2__item">
                {{ $tc('common.email', 2) }} :
                <span
                  v-html="$options.filters.cryptMailto(cCryptEmail, 'linkType5', $tc('common.sendMessage', 1))"></span>
              </li>
              <li class="listType2__item is-phone">{{ $tc('common.phone', 2) }} : 06 63 41 96 92</li>
              <li class="listType2__item">SIRET : 51283878000017</li>
              <li class="listType2__item">CODE NAF : 6201Z Programmation informatique</li>
            </ul>
          </template>
        </madrid-card>
        <!-- / PROPERTY -->

        <!-- HOSTING AND DOMAIN NAME -->
        <madrid-card :id="$enums.anchor.HOSTING"
                     :title="$t('legalNotice.hosting')">
          <template v-slot:content>
            <ul class="listType2">
              <li class="listType2__item">
                <a class="linkType5"
                   href="https://www.ovh.com/fr/"
                   target="_blank">OVH</a>
              </li>
              <li class="listType2__item">2 rue Kellermann, 59100 ROUBAIX - FRANCE</li>
              <li class="listType2__item">{{ $t('legalNotice.hostingContent-1') }} – Tourcoing 424 761 419 00045
              </li>
            </ul>
          </template>
        </madrid-card>
        <!-- / HOSTING AND DOMAIN NAME -->

        <!-- WEBSITE CREATOR -->
        <madrid-card :id="$enums.anchor.WEBSITE_CREATOR"
                     :title="$t('legalNotice.websiteCreator')">
          <template v-slot:content>
            <ul class="listType2 is-marginBottom-20">
              <li class="listType2__item"><b>Univers Graphik</b></li>
              <li class="listType2__item">Paris, Ile de France</li>
              <li class="listType2__item">{{ $tc('common.phone', 2) }} : 06 63 41 96 92</li>
              <li class="listType2__item">
                <a class="linkType5"
                   href="https://www.univers-graphik.com"
                   target="_blank">univers-graphik.com</a>
              </li>
            </ul>

            <!-- Standards -->
            <p><b>{{ $t('legalNotice.websiteCreatorContent-1') }} :</b></p>
            <figure v-for="(item, index) in standards"
                    :key="`${index}-standards-legal-notice`"
                    class="standards">
              <figcaption>{{ item.label }}</figcaption>
              <img :src="`/medias/interface/${item.src}.png`"
                   :srcset="`/medias/interface/${item.src}@2x.png 2x`"
                   :alt="item.label"
                   width="53"
                   height="60"/>
            </figure>
            <!-- / Standards -->

            <i18n path="legalNotice.websiteCreatorContent-2"
                  tag="p"
                  class="is-marginBottom-0">
              <router-link
                :to="{ name: $enums.pages.CONTACT, params: { lang: cCurrentLanguage, seo: cSeo, slug: $pagesUrl[$i18n.locale].contact }, hash: `#${$enums.anchor.CONTACT_FORM}` }"
                class="linkType5"
                @click.native="refreshNavmain">
                {{ $t('legalNotice.ourContactForm') }}
              </router-link>
            </i18n>
          </template>
        </madrid-card>
        <!-- / WEBSITE CREATOR -->

        <!-- CONTENT CREDITS -->
        <madrid-card :id="$enums.anchor.CONTENT_CREDITS"
                     :title="$t('legalNotice.contentCredits')">
          <template v-slot:content>
            <p><b>{{ $t('legalNotice.pictures') }}</b> : Pixabay / Univers Graphik</p>

            <p class="is-marginBottom-0"><b>{{ $t('legalNotice.fontsFace') }}</b></p>
            <ul class="listType1 is-marginBottom-20">
              <li class="listType1__item">Roboto font data copyright © Google 2012</li>
              <li class="listType1__item">Copyright © 2010-2011 News Cycle : Nathan Willis</li>
              <li class="listType1__item">Copyright © 2010 Bebas Neue : Ryoichi Tsunekawa</li>
              <li class="listType1__item">Copyright © 2011 Lobster Two : Pablo Impallari, Igino Marini</li>
            </ul>

            <template v-if="$enums.config.GALLERY">
              <p class="is-marginBottom-0"><b>{{ $t('common.galleries') }}</b></p>
              <ul class="listType1">
                <li class="listType1__item">Copyright © Lightgallery.js</li>
                <li class="listType1__item">Copyright © Viewer.js</li>
                <li class="listType1__item">Copyright © 2015 - 2019 MediaBox : Jiri Hybek</li>
                <li class="listType1__item">Copyright © node-photos</li>
              </ul>
            </template>
          </template>
        </madrid-card>
        <!-- / CONTENT CREDITS -->

        <!-- INTELLECTUAL PROPERTY -->
        <madrid-card :id="$enums.anchor.INTELLECTUAL_PROPERTY"
                     :title="$t('legalNotice.intellectualProperty')">
          <template v-slot:content>
            <i18n path="legalNotice.intellectualPropertyContent-1"
                  tag="p">
              <template v-slot:line-break>
                <br/>
              </template>
            </i18n>
          </template>
        </madrid-card>
        <!-- / INTELLECTUAL PROPERTY -->

        <!-- HOTLINKING -->
        <madrid-card :id="$enums.anchor.HOTLINKING"
                     :title="$t('legalNotice.hotlinking')">
          <template v-slot:content>
            <i18n path="legalNotice.hotlinkingContent-1"
                  tag="p"
                  class="is-marginBottom-20">
              <template v-slot:url>
                {{ $enums.config.SOCIETY_SITE }}
              </template>
              <template v-slot:line-break>
                <br/>
              </template>
            </i18n>
          </template>
        </madrid-card>
        <!-- / HOTLINKING -->

        <!-- DYSFUNCTION -->
        <madrid-card :id="$enums.anchor.DYSFUNCTION"
                     :title="$t('legalNotice.dysfunction')">
          <template v-slot:content>
            <p>{{ $t('legalNotice.dysfunctionContent-1', [$enums.config.SOCIETY_NAME]) }}</p>
            <ul class="listType1">
              <li class="listType1__item">{{ $t('legalNotice.dysfunctionContent-2') }}</li>
              <li class="listType1__item">{{ $t('legalNotice.dysfunctionContent-3') }}</li>
              <li class="listType1__item">{{ $t('legalNotice.dysfunctionContent-4') }}</li>
              <li class="listType1__item">{{ $t('legalNotice.dysfunctionContent-5') }}</li>
            </ul>
          </template>
        </madrid-card>
        <!-- / DYSFUNCTION -->

        <!-- COOKIES -->
        <madrid-card :id="$enums.anchor.COOKIES"
                     :title="$t('cookies.title')">
          <template v-slot:content>
            <i18n path="legalNotice.cookiesContent-1"
                  tag="p">
              <template v-slot:line-break>
                <br/>
              </template>
            </i18n>
            <p>{{ $t('legalNotice.cookiesContent-2', [$enums.config.SOCIETY_SITE]) }}</p>
            <ul class="listType1">
              <li class="listType1__item">{{ $t('legalNotice.cookiesContent-3') }}</li>
              <li class="listType1__item">{{ $t('legalNotice.cookiesContent-4') }}</li>
            </ul>
          </template>
        </madrid-card>
        <!-- / COOKIES -->
      </main>
      <!-- / Main content -->

      <!-- SideBar -->
      <sidebar-element :target="$enums.pages.LEGAL_NOTICE"/>
    </div>
    <!-- / Main container -->
  </div>
</template>

<script>
import MetaManager from '@Components/meta/MetaManager'
import PanoramicImage from '@Components/panoramic/PanoramicImage'
import { Affix } from 'vue-affix'
import SidebarElement from '@Components/sidebar/SidebarElement'
import FocusToContent from '@Components/accessibility/FocusToContent'
import MadridCard from '@Components/cards/MadridCard'

export default {
  name: 'LegalNotice',
  data () {
    return {
      affixReferent: 'affixReferent',
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
      ],
      heading: [
        {
          label: 'legalNotice.property',
          anchor: 'PROPERTY'
        },
        {
          label: 'legalNotice.hosting',
          anchor: 'HOSTING'
        },
        {
          label: 'legalNotice.websiteCreator',
          anchor: 'WEBSITE_CREATOR'
        },
        {
          label: 'legalNotice.contentCredits',
          anchor: 'CONTENT_CREDITS'
        },
        {
          label: 'legalNotice.intellectualProperty',
          anchor: 'INTELLECTUAL_PROPERTY'
        },
        {
          label: 'legalNotice.hotlinking',
          anchor: 'HOTLINKING'
        },
        {
          label: 'legalNotice.dysfunction',
          anchor: 'DYSFUNCTION'
        },
        {
          label: 'cookies.title',
          anchor: 'COOKIES'
        }
      ]
    }
  },
  components: {
    MetaManager,
    PanoramicImage,
    Affix,
    SidebarElement,
    FocusToContent,
    MadridCard
  },
  computed: {
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
.headingList {
  margin: 0;
  padding: 0;
  list-style-type: none;

  &__item {
    margin: 8px 0;
    overflow-wrap: break-word;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}

.standards {
  margin: 0 20px 0 0;
  display: inline-block;
  vertical-align: top;
  text-align: center;
}
</style>
