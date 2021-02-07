<template>
  <div class="customization">
    <!-- Page content -->
    <template v-if="type !== $enums.pages.HOMEPAGE">
      <!-- Meta -->
      <Meta :title="title || $enums.config.SOCIETY_SITE"
            :url="slug || $pagesUrl[$i18n.locale].default"/>

      <!-- Panoramic -->
      <Panoramic :type="$enums.panoramics.PAGE_TYPE"
                 :id="$route.params.id"
                 :key="`${$route.params.id}-panoramic`"/>
    </template>
    <!-- Homepage -->
    <template v-else>
      <!-- Meta -->
      <Meta :title="$t('pages.title.homePage')"/>

      <!-- Slideshow -->
      <GalleryHomepage v-if="$store.state.galleryHomepage.loaded"/>
    </template>

    <!-- Main container -->
    <div class="mainContainer mainContainer--spacerTB containerFloatingCol">
      <!-- Informations -->
      <StaticSidebar/>

      <!-- Content -->
      <div class="containerType1 floatingCol--large">
        <transition name="vueFadeEffectContent"
                    mode="out-in">
          <!-- Loader -->
          <Loader v-if="loading"/>

          <!-- Content page -->
          <section v-else>
            <h1 v-if="status === $enums.statusCode.NO_CONTENT"
                class="titleType3 is-margin-0">{{ $t('common.noDataPage') }} !</h1>

            <template v-else>
              <!-- Main title -->
              <h1 class="titleType1">{{ title }}</h1>

              <!-- Gallery -->
              <GalleryPage v-if="loaderGallery"
                           :id="cIdPage"
                           :key="`${cIdPage}-gallery`"
                           class="is-marginBottom-20"/>

              <!-- Content -->
              <div v-html="content"
                   class="textEditor textEditor--main"
                   ref="textEditor"></div>
            </template>
          </section>
          <!-- / Content page -->
        </transition>

        <!-- News star -->
        <template v-if="type === $enums.pages.HOMEPAGE && $enums.config.NEWS && itemsNews.length">
          <h2 class="titleType2 is-marginTop-20 is-marginBottom-10">{{ $t('common.newsStar') }}</h2>
          <div class="newsList">
            <ItemNews v-for="(item, index) in itemsNews"
                      :key="`${index}-news`"
                      :item="item"/>
          </div>
        </template>
        <!-- / News star -->
      </div>
      <!-- / Content -->

      <!-- SideBar -->
      <Sidebar :target="`${$enums.pages.PAGE}-${cIdPage}`"/>
    </div>
    <!-- / Main container -->
  </div>
</template>

<script>
import pageContentServices from '@Services/pageContentServices'
import newsServices from '@Services/newsServices'
import Prism from 'prismjs'
import Meta from '@Components/meta/Meta'
import Panoramic from '@Components/panoramic/Panoramic'
import GalleryHomepage from '@Components/gallery/GalleryHomepage'
import GalleryPage from '@Components/gallery/GalleryPage'
import Loader from '@Components/helpers/loader/Loader'
import StaticSidebar from '@Components/sidebar/StaticSidebar'
import Sidebar from '@Components/sidebar/Sidebar'
import ItemNews from '@Components/news/Item'

export default {
  name: 'Page',
  props: {
    type: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      loading: false,
      status: null,
      title: '',
      content: '',
      slug: '',
      loaderGallery: false,
      itemsNews: []
    }
  },
  components: {
    Meta,
    Panoramic,
    GalleryHomepage,
    GalleryPage,
    Loader,
    StaticSidebar,
    Sidebar,
    ItemNews
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
     * Id page
     * @returns {string}
     */
    cIdPage () {
      return this.type !== this.$enums.pages.HOMEPAGE ? this.$route.params.id : this.$enums.pages.HOMEPAGE_ID
    }
  },
  watch: {
    cLangActive (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadData(this.cLangActive)
        // Data news star
        if (this.type === this.$enums.pages.HOMEPAGE && this.$enums.config.NEWS) {
          this.loadDataNewsStar(this.cLangActive)
        }
      }
    },
    '$route.params.id' (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadData(this.cLangActive)
      }
    }
  },
  methods: {
    /**
     * Load data page content
     * @param {string} lang
     */
    loadData (lang) {
      this.loading = true

      pageContentServices.get({
        lang: lang,
        id: this.cIdPage
      })
        .then((response) => {
          this.status = response.status
          if (response.status !== this.$enums.statusCode.OK) return

          const data = response.data.data
          this.title = data.title
          this.content = data.content
          if (data.slug) this.slug = data.slug

          // Gallery
          if (data.gallery && data.publication_gallery) this.loaderGallery = true

          setTimeout(() => {
            // Add class pre tag
            const textEditor = this.$refs.textEditor
            if (textEditor) {
              const matches = textEditor.querySelectorAll('pre')
              for (let i = 0; i < matches.length; i++) {
                (item => {
                  if (item) item.classList.add('line-numbers')
                })(matches[i])
              }

              // Use prism
              Prism.highlightAll()
            }
          }, 400)
        })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
          // Redirect to 404
          this.$router.push({ name: this.$enums.pages.ERROR_404 })
        })
        .finally(() => this.loading = false)
    },
    /**
     * Load data news star
     * @param {string} lang
     */
    loadDataNewsStar (lang) {
      newsServices.getNewsStar(lang)
        .then((response) => {
          const data = response.data.data
          if (data.items) this.itemsNews = data.items
        })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
    }
  },
  created () {
    // Data slideshow homepage
    if (this.type === this.$enums.pages.HOMEPAGE) {
      this.$store.dispatch('galleryHomepage/get')
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
    }

  },
  mounted () {
    // Data content page
    this.loadData(this.cLangActive)

    // Data news star
    if (this.type === this.$enums.pages.HOMEPAGE && this.$enums.config.NEWS) {
      this.loadDataNewsStar(this.cLangActive)
    }
  }
}
</script>

<style scoped lang="scss">
.newsList {
  display: flex;
  flex-wrap: wrap;
}
</style>
