<template>
  <div class="customization">
    <!-- Meta -->
    <meta-manager :title="`${$t('pages.title.contact')} - ${$enums.config.SOCIETY_SITE}`"
                  :url="$pagesUrl[$i18n.locale].contact"/>

    <!-- Panoramic -->
    <panoramic-image :type="$enums.panoramics.COMMON_TYPE"
                     :id="$enums.panoramics.CONTACT_ID"/>

    <!-- Main container -->
    <div class="mainContainer mainContainer--spacerTB containerFloatingCol">
      <!-- Static sideBar -->
      <aside class="floatingCol--small floatingCol--spacerRight">
        <!-- Informations -->
        <div class="sidebar__item sidebar__item--full">
          <div class="sidebar__content">
            <!-- Title -->
            <h2 class="sidebar__title">{{ $t('common.ourCoordinates') }}</h2>

            <template v-if="$store.state.contactInformation.loaded">
              <!-- Address -->
              <address class="adr listType3">
                <!-- Society -->
                <span v-if="$store.state.contactInformation.society"
                      class="organization-name listType3__item">
                  <i class="icon-geoloc is-text-middleGrey"></i>{{ $store.state.contactInformation.society }}
                </span>
                <!-- Address -->
                <span class="street-address listType3__item"
                      v-html="$store.state.contactInformation.address"></span>
                <!-- Postal code / City -->
                <span v-if="$store.state.contactInformation.postalCode || $store.state.contactInformation.city"
                      class="listType3__item">
                  <span class="postal-code">{{ $store.state.contactInformation.postalCode }}</span>
                  <span class="locality">{{ $store.state.contactInformation.city }}</span>
                </span>
                <!-- Country -->
                <span v-if="$store.state.contactInformation.country"
                      class="country-name listType3__item is-uppercase">
                  {{ $store.state.contactInformation.country }}
                </span>
              </address>
              <!-- / Address -->

              <div class="is-divider is-marginTB-20"></div>

              <ul class="listType3">
                <!-- E-mail -->
                <li v-if="$store.state.contactInformation.email"
                    class="listType3__item">
                  <i class="icon-send is-text-middleGrey"></i>
                  <span :data-hint="$t('common.sendEmail')"
                        class="hint-top-middle-mobile hint-anim"
                        v-html="$options.filters.cryptMailto(cCryptEmail, 'linkType2')"></span>
                </li>
                <!-- Phone -->
                <li v-if="$store.state.contactInformation.phone"
                    class="listType3__item">
                  <i class="icon-gsm is-text-middleGrey"></i>
                  {{ $store.state.contactInformation.phone }}
                </li>
                <!-- Fixed phone -->
                <li v-if="$store.state.contactInformation.fixedPhone"
                    class="listType3__item">
                  <i class="icon-phone is-text-middleGrey"></i>
                  {{ $store.state.contactInformation.fixedPhone }}
                </li>
                <!-- Fax -->
                <li v-if="$store.state.contactInformation.fax"
                    class="listType3__item">
                  <i class="icon-fax is-text-middleGrey"></i>
                  {{ $store.state.contactInformation.fax }}
                </li>
              </ul>
            </template>

            <!-- Loader -->
            <div v-else
                 class="loaderCircular loaderCircular--center is-marginBottom-10"></div>
          </div>
        </div>
        <!-- / Informations -->

        <!-- Social network -->
        <div class="sidebar__item is-noTabletPortrait">
          <div class="sidebar__content">
            <!-- Title -->
            <h2 class="sidebar__title">{{ $t('common.followUs') }}</h2>
            <!-- Follow us -->
            <follow-us v-if="$store.state.contactInformation.loaded"/>
            <div v-else
                 class="loaderCircular loaderCircular--center"></div>
          </div>
        </div>
        <!-- / Social network -->
      </aside>
      <!-- / Static sideBar -->

      <!-- Form -->
      <main class="floatingCol--large"
            role="main">
        <contact-form/>
      </main>
      <!-- / Form -->

      <!-- SideBar -->
      <sidebar-element :target="$enums.pages.CONTACT"/>
    </div>
    <!-- / Main container -->
  </div>
</template>

<script>
import MetaManager from '@Components/meta/MetaManager'
import PanoramicImage from '@Components/panoramic/PanoramicImage'
import SidebarElement from '@Components/sidebar/SidebarElement'
import ContactForm from '@Components/form/ContactForm'
import FollowUs from '@Components/socialNetwork/FollowUs'

export default {
  name: 'Contact',
  components: {
    MetaManager,
    PanoramicImage,
    SidebarElement,
    ContactForm,
    FollowUs
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
