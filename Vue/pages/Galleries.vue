<template>
  <div class="customization">
    <!-- Meta -->
    <Meta :title="`${$t('pages.title.galleries')} - ${$enums.config.SOCIETY_SITE}`"
          :url="$pagesUrl[$i18n.locale].galleries"/>

    <!-- Panoramic -->
    <Panoramic :type="$enums.panoramics.COMMON_TYPE"
               :id="$enums.panoramics.GALLERY_ID"/>

    <!-- Main container -->
    <div class="mainContainer mainContainer--spacerTB containerFloatingCol">
      <!-- Informations -->
      <StaticSidebar/>

      <!-- Main content -->
      <div class="containerType1 floatingCol--large">
        <!-- Main title -->
        <h1 class="titleType1">{{ $t('pages.title.galleries') }}</h1>

        <transition name="vueFadeEffectContent"
                    mode="out-in">
          <!-- Loader -->
          <Loader v-if="loading"/>

          <div v-else
               :id="anchor">
            <template v-if="items.length">
              <!-- Galleries -->
              <div v-for="(item, index) in items"
                   :key="`${index}-gallery`"
                   class="galleryList">
                <!-- Cube 3D -->
                <Cube3D v-if="item.thumbs && !$enums.breakpoints.MOBILE"
                        :images="item.thumbs"
                        :opacity=".9"
                        :preserve3D="cPreserve3D"
                        :multiple="true"
                        class="galleryList__cube is-noMobile"/>
                <!-- / Cube 3D -->

                <!-- Link -->
                <router-link
                  v-lazy:background-image="{ src: item.file_name, error: '/medias/interface/image-error-galleries.gif', loading: '/medias/interface/image-loader-xs.svg' }"
                  :to="{ name: $enums.pages.GALLERY, params: { lang: $store.state.parameters.urlLang, slug: item.slug, id: item.id } }"
                  class="galleryList__link"
                  @click.native="resetNavmain">

                  <!-- Label -->
                  <p class="galleryList__label">{{ item.label }}</p>
                </router-link>
                <!-- / Link -->
              </div>
              <!-- / Galleries -->

              <!-- Pagination -->
              <sliding-pagination v-if="totalPages > 1"
                                  :current="currentPage"
                                  :total="totalPages"
                                  :nonSlidingSize=7
                                  :ariaGotoPageLabel="$t('pagination.goTo', { page: '%page% ', total: '%total%' })"
                                  :ariaPreviousPageLabel="$t('pagination.prev')"
                                  :ariaNextPageLabel="$t('pagination.next')"
                                  :ariaCurrentPageLabel="$t('pagination.current', { page: '%page% ', total: '%total%' })"
                                  class="is-marginTop-20"
                                  @page-change="pageChangeHandler">
                <template v-slot:previous-page>
                  <span class="c-sliding-pagination__nav">&laquo;</span>
                </template>
                <template v-slot:gap-left>
                  <span class="c-sliding-pagination__gap">...</span>
                </template>
                <template v-slot:gap-right>
                  <span class="c-sliding-pagination__gap">...</span>
                </template>
                <template v-slot:next-page>
                  <span class="c-sliding-pagination__nav">&raquo;</span>
                </template>
              </sliding-pagination>
              <!-- / Pagination -->
            </template>
            <!-- No result -->
            <p v-else
               class="titleType3 is-margin-0">{{ $t('common.noDataPage') }} !</p>
          </div>
        </transition>
      </div>
      <!-- / Main content -->

      <!-- SideBar -->
      <Sidebar :target="$enums.pages.GALLERIES"/>
    </div>
    <!-- / Main container -->
  </div>
</template>

<script>
import Meta from '@Components/meta/Meta'
import Panoramic from '@Components/panoramic/Panoramic'
import Loader from '@Components/helpers/loader/Loader'
import StaticSidebar from '@Components/sidebar/StaticSidebar'
import Sidebar from '@Components/sidebar/Sidebar'
import SlidingPagination from 'vue-sliding-pagination'
import Modernizr from 'modernizr'
import Cube3D from '@Components/cube3D/Cube3D'

export default {
  name: 'Galleries',
  data () {
    return {
      loading: false,
      count: 0,
      currentPage: this.$route.params.page ? parseInt(this.$route.params.page, 10) : 1,
      totalPages: 0,
      items: [],
      anchor: 'anchor'
    }
  },
  components: {
    Meta,
    Panoramic,
    Loader,
    StaticSidebar,
    Sidebar,
    SlidingPagination,
    Cube3D
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
     * Preserve-3d css supported
     * @returns {boolean}
     */
    cPreserve3D () {
      return Modernizr.preserve3d
    }
  },
  watch: {
    cLangActive (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadData(this.$store.state.parameters.urlLang)
      }
    }
  },
  methods: {
    /**
     * Load data
     * @param {string} lang
     */
    loadData (lang) {
      this.loading = true
      this.$store.dispatch('gallery/getGalleries', {
        lang: lang,
        page: this.currentPage
      })
        .then((response) => {
          const data = response.data.data
          this.count = data.count
          this.totalPages = data.totalPages
          if (data.items) this.items = data.items
        })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
          // Redirect to 404
          this.$router.push({ name: this.$enums.pages.ERROR_404 })
        })
        .finally(() => this.loading = false)
    },
    /**
     * Pagination
     * @param {number} selectedPage
     */
    pageChangeHandler (selectedPage) {
      if ([this.currentPage, 0, this.totalPages + 1].indexOf(selectedPage) !== -1) return

      this.currentPage = selectedPage

      // Hydrate data
      this.loadData(this.cLangActive)

      // Scroll to
      this.$scrollTo(`#${this.anchor}`, 500, {
        offset: -(this.$store.state.parameters.headerHeight + 60)
      })

      // Update URL
      setTimeout(() => {
        this.$router.replace({
          params: {
            page: selectedPage
          }
        })
      }, 100)
    }
  },
  mounted () {
    // Hydrate data
    this.loadData(this.cLangActive)
  }
}
</script>

<style scoped lang="scss">
  .galleryList {
    $spacingV: 20px;
    $itemHeight: 240px;
    $itemHeightXs: 120px;

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
      box-shadow: 0 0 2px rgba(Black, .8), 0 1px 1px rgba(White, .3) inset;
      text-decoration: none;
      color: White;
      @media #{$isXs} {
        height: $itemHeightXs;
      }

      &[lazy=loading] {
        background-size: inherit;
      }

      &:hover {
        .galleryList__label {
          padding-top: 20%;
          padding-bottom: 20%;
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
    }

    &__label {
      margin: 0;
      padding: $spacingV 10px;
      width: 100%;
      display: block;
      background-color: rgba(Black, .6);
      transition: padding .6s ease-in-out;
      font: {
        size: 20px;
        family: $robotoLight;
      }
      @media #{$isXs} {
        padding-top: $spacingV / 2;
        padding-bottom: $spacingV / 2;
        font-size: 16px;
      }
    }

    &__cube {
      position: absolute;
      top: 60px;
      right: 30px;

      ~ .galleryList__link {
        .galleryList__label {
          padding-right: 150px;
          @media #{$isMobile} {
            padding-right: 10px;
          }
        }
      }
    }
  }
</style>
