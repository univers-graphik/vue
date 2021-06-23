<template>
  <div class="customization">
    <!-- Meta -->
    <meta-manager :title="`${$t('pages.title.newsList')} - ${$enums.config.SOCIETY_SITE}`"
                  :url="$pagesUrl[$i18n.locale].newsList"/>

    <!-- Panoramic -->
    <panoramic-image :type="$enums.panoramics.COMMON_TYPE"
                     :id="$enums.panoramics.NEWS_ID"/>

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
            class="titleType1 is-marginBottom-10"
            data-focus-title>{{ $t('pages.title.newsList') }}</h1>

        <transition name="vueFadeEffectContent"
                    mode="out-in">
          <!-- Loader -->
          <loader-bounce v-if="loading"/>

          <div v-else>
            <template v-if="items.length">
              <!-- News -->
              <div class="listType4">
                <paris-card v-for="(item, index) in items"
                            :key="`${index}-news`"
                            :page="$enums.pages.NEWS"
                            :slug="item.slug"
                            :id="item.id"
                            :title="item.title"
                            :additional-data="{
                              file_name: item.file_name,
                              video: item.video,
                              tag: item.tag,
                              publication_date: item.publication_date,
                              comment: item.comment
                            }"
                            class="listType4__item"/>
              </div>
              <!-- / News -->

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
      <sidebar-element :target="$enums.pages.NEWS"/>
    </div>
    <!-- / Main container -->
  </div>
</template>

<script>
import newsServices from '@Services/newsServices'
import MetaManager from '@Components/meta/MetaManager'
import PanoramicImage from '@Components/panoramic/PanoramicImage'
import LoaderBounce from '@Components/helpers/loader/LoaderBounce'
import SidebarModules from '@Components/sidebar/SidebarModules'
import SidebarElement from '@Components/sidebar/SidebarElement'
import Pagination from '@Components/pagination/Pagination'
import ParisCard from '@Components/cards/ParisCard'
import FocusToContent from '@Components/accessibility/FocusToContent'

export default {
  name: 'NewsList',
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
    ParisCard,
    FocusToContent
  },
  watch: {
    cCurrentLanguage (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchDataNewsList(this.$store.state.parameters.urlLang)
      }
    }
  },
  methods: {
    /**
     * Fetch data
     * @param {string} lang
     */
    fetchDataNewsList (lang) {
      this.loading = true
      newsServices.getNewsList({
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
      this.fetchDataNewsList(this.cCurrentLanguage)
      // Scroll to
      this.$scrollTo(`#${this.anchor}`)
    }
  },
  mounted () {
    // Hydrate data
    this.fetchDataNewsList(this.cCurrentLanguage)
  }
}
</script>
