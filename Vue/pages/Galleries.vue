<template>
  <div class="customization">
    <!-- Meta -->
    <meta-manager :title="`${$t('pages.title.galleries')} - ${$enums.config.SOCIETY_SITE}`"
                  :url="$pagesUrl[$i18n.locale].galleries"/>

    <!-- Panoramic -->
    <panoramic-image :type="$enums.panoramics.COMMON_TYPE"
                     :id="$enums.panoramics.GALLERY_ID"/>

    <!-- Main container -->
    <div class="mainContainer mainContainer--spacerTB containerFloatingCol">
      <!-- Sidebar modules -->
      <sidebar-modules v-if="!$enums.breakpoints.TABLET_PORTRAIT"
                       class="is-noTabletPortrait"/>

      <!-- Main content -->
      <main class="containerType1 floatingCol--large"
            role="main">
        <!-- Focus element for skip link -->
        <focus-to-content/>

        <!-- Main title -->
        <h1 :id="anchor"
            class="titleType1"
            data-focus-title="">{{ $t('pages.title.galleries') }}</h1>

        <transition name="vueFadeEffectContent"
                    mode="out-in">
          <!-- Loader -->
          <loader-bounce v-if="loading"/>

          <div v-else>
            <template v-if="items.length">
              <!-- Galleries -->
              <div v-for="(item, index) in items"
                   :key="`${index}-gallery`"
                   class="galleryList">
                <!-- Cube 3D -->
                <cube3-d v-if="item.thumbs && !$enums.breakpoints.MOBILE"
                         :images="item.thumbs"
                         :opacity=".9"
                         :preserve3D="cPreserve3D"
                         :multiple="true"
                         class="galleryList__cube is-noMobile"/>
                <!-- / Cube 3D -->

                <!-- Link -->
                <router-link
                  v-lazy:background-image="{ src: item.file_name, error: $enums.images.ERROR_600x240, loading: $enums.images.LOADER_XS }"
                  :to="{ name: $enums.pages.GALLERY, params: { lang: cCurrentLanguage, seo: cSeo, slug: item.slug, id: item.id } }"
                  class="galleryList__link"
                  @click.native="refreshNavmain">

                  <!-- Label -->
                  <p class="galleryList__label">{{ item.label }}</p>
                </router-link>
                <!-- / Link -->
              </div>
              <!-- / Galleries -->

              <!-- Pagination -->
              <pagination v-if="totalPages > 1"
                          :current-page="currentPage"
                          :total-pages="totalPages"
                          class="is-marginTop-20"
                          @selected-page="pageChangeHandler"/>
              <!-- / Pagination -->
            </template>
            <!-- No result -->
            <p v-else
               class="titleType3 is-margin-0">{{ $t('common.noDataPage') }} !</p>
          </div>
        </transition>
      </main>
      <!-- / Main content -->

      <!-- SideBar -->
      <sidebar-element :target="$enums.pages.GALLERIES"/>
    </div>
    <!-- / Main container -->
  </div>
</template>

<script>
import galleryServices from '@Services/galleryServices'
import MetaManager from '@Components/meta/MetaManager'
import PanoramicImage from '@Components/panoramic/PanoramicImage'
import LoaderBounce from '@Components/helpers/loader/LoaderBounce'
import SidebarModules from '@Components/sidebar/SidebarModules'
import SidebarElement from '@Components/sidebar/SidebarElement'
import Pagination from '@Components/pagination/Pagination'
import Modernizr from 'modernizr'
import Cube3D from '@Components/cube3D/Cube3D'
import FocusToContent from '@Components/accessibility/FocusToContent'

export default {
  name: 'Galleries',
  data () {
    return {
      loading: false,
      currentPage: this.$route.params.page ? parseInt(this.$route.params.page, 10) : 1,
      totalPages: 0,
      items: [],
      anchor: 'anchor'
    }
  },
  components: {
    MetaManager,
    PanoramicImage,
    LoaderBounce,
    SidebarModules,
    SidebarElement,
    Pagination,
    Cube3D,
    FocusToContent
  },
  computed: {
    /**
     * Preserve-3d css supported
     * @returns {boolean}
     */
    cPreserve3D () {
      return Modernizr.preserve3d
    }
  },
  watch: {
    cCurrentLanguage (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchDataGalleries(this.cCurrentLanguage)
      }
    }
  },
  methods: {
    /**
     * Fetch data
     * @param {string} lang
     */
    fetchDataGalleries (lang) {
      this.loading = true
      galleryServices.getGalleriesList({
        lang: lang,
        page: this.currentPage
      })
        .then((response) => {
          const data = response.data.data
          this.totalPages = data.totalPages
          if (data.items) this.items = data.items
        })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
          // Redirect to 404
          this.$router.push({ name: this.$enums.pages.ERROR_404 })
        })
        .finally(() => {
          this.loading = false
        })
    },
    /**
     * Pagination
     * @param {number} selectedPage
     */
    pageChangeHandler (selectedPage) {
      this.currentPage = selectedPage
      // Hydrate data
      this.fetchDataGalleries(this.cCurrentLanguage)
      // Scroll to
      this.$scrollTo(`#${this.anchor}`)
    }
  },
  mounted () {
    // Hydrate data
    this.fetchDataGalleries(this.cCurrentLanguage)
  }
}
</script>

<style scoped lang="scss">
$galleryList: '.galleryList';

#{$galleryList} {
  $spacingV: 20px;
  $itemHeight: rem(240);
  $itemHeightXs: rem(120);
  $insetBoxShadow: 0 1px 1px rgba(White, .3) inset;

  position: relative;

  &__link {
    margin-top: 20px;
    width: 100%;
    height: $itemHeight;
    display: flex;
    align-items: center;
    overflow: hidden;
    border: 1px solid Black;
    background: {
      color: Black;
      size: cover;
      position: center;
      repeat: no-repeat;
    }
    box-shadow: 0 0 2px rgba(Black, .8), $insetBoxShadow;
    text-decoration: none;
    color: White;
    @media #{$isXs} {
      height: $itemHeightXs;
    }

    &[lazy=loading] {
      background-size: inherit;
    }

    &:hover {
      #{$galleryList}__label {
        padding-top: $itemHeight / 2;
        padding-bottom: $itemHeight / 2;
        @media #{$isHoverNone} {
          padding-top: $spacingV;
          padding-bottom: $spacingV;
          @media #{$isXs} {
            padding-top: $spacingV / 2;
            padding-bottom: $spacingV / 2;
          }
        }
      }
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 4px 2px rgba(Black, .7), $insetBoxShadow;
    }
  }

  &__label {
    margin: 0;
    padding: $spacingV 10px;
    width: 100%;
    display: block;
    background-color: rgba(Black, .6);
    transition: padding .7s ease-in-out;
    font: {
      size: rem(20);
      family: $robotoLight;
    }
    @media #{$isXs} {
      padding-top: $spacingV / 2;
      padding-bottom: $spacingV / 2;
      font-size: rem(16);
    }
  }

  &__cube {
    margin-top: -50px;
    position: absolute;
    top: 50%;
    right: 30px;

    ~ #{$galleryList}__link {
      #{$galleryList}__label {
        padding-right: 150px;
        @media #{$isMobile} {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
