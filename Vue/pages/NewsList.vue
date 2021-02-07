<template>
  <div class="customization">
    <!-- Meta -->
    <Meta :title="`${$t('pages.title.newsList')} - ${$enums.config.SOCIETY_SITE}`"
          :url="$pagesUrl[$i18n.locale].newsList"/>

    <!-- Panoramic -->
    <Panoramic :type="$enums.panoramics.COMMON_TYPE"
               :id="$enums.panoramics.NEWS_ID"/>

    <!-- Main container -->
    <div class="mainContainer mainContainer--spacerTB containerFloatingCol">
      <!-- Informations -->
      <StaticSidebar/>

      <!-- Main content -->
      <div class="containerType1 floatingCol--large">
        <!-- Main title -->
        <h1 class="titleType1">{{ $t('pages.title.newsList') }}</h1>

        <transition name="vueFadeEffectContent"
                    mode="out-in">
          <!-- Loader -->
          <Loader v-if="loading"/>

          <div v-else
               :id="anchor">
            <template v-if="items.length">
              <!-- News -->
              <div class="newsList">
                <Item v-for="(item, index) in items"
                      :key="`${index}-news`"
                      :item="item"/>
              </div>
              <!-- / News -->

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
      <Sidebar :target="$enums.pages.NEWS"/>
    </div>
    <!-- / Main container -->
  </div>
</template>

<script>
import newsServices from '@Services/newsServices'
import Meta from '@Components/meta/Meta'
import Panoramic from '@Components/panoramic/Panoramic'
import Loader from '@Components/helpers/loader/Loader'
import StaticSidebar from '@Components/sidebar/StaticSidebar'
import Sidebar from '@Components/sidebar/Sidebar'
import SlidingPagination from 'vue-sliding-pagination'
import Item from '@Components/news/Item'

export default {
  name: 'NewsList',
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
    Item
  },
  computed: {
    /**
     * Current lang url
     * @returns {string}
     */
    cLangActive () {
      return this.$store.state.parameters.urlLang
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
      newsServices.getNewsList({
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
  .newsList {
    display: flex;
    flex-wrap: wrap;
  }
</style>
