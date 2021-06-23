<template>
  <div class="customization">
    <!-- Page content -->
    <template v-if="type !== $enums.pages.HOMEPAGE">
      <!-- Meta -->
      <meta-manager :title="title || $enums.config.SOCIETY_SITE"
                    :url="slug || $pagesUrl[$i18n.locale].default"/>

      <!-- Panoramic -->
      <panoramic-image :type="$enums.panoramics.PAGE_TYPE"
                       :id="id"
                       :key="`${id}-panoramic`"/>
    </template>
    <!-- Homepage -->
    <template v-else>
      <!-- Meta -->
      <meta-manager :title="$t('pages.title.homePage')"/>

      <!-- Slideshow -->
      <homepage-gallery v-if="$store.state.galleryHomepage.loaded"/>
    </template>

    <!-- Main container -->
    <div class="mainContainer mainContainer--spacerTB containerFloatingCol">
      <!-- Sidebar modules -->
      <sidebar-modules v-if="!$enums.breakpoints.TABLET_PORTRAIT"
                       class="is-noTabletPortrait"/>

      <!-- Content -->
      <div class="floatingCol--large">
        <!-- Page content -->
        <main class="containerType1"
              role="main">
          <transition name="vueFadeEffectContent"
                      mode="out-in">
            <!-- Loader -->
            <loader-bounce v-if="loading"/>

            <section v-else>
              <!-- Focus element for skip link -->
              <focus-to-content/>

              <!-- Main title -->
              <h1 v-if="status === $enums.statusCode.NO_CONTENT"
                  class="titleType3 is-margin-0"
                  data-focus-title>{{ $t('common.noDataPage') }} !</h1>
              <template v-else>
                <!-- Main title -->
                <h1 class="titleType1"
                    data-focus-title>{{ title }}</h1>

                <!-- Gallery -->
                <page-gallery v-if="galleryLoading"
                              :id="cPageId"
                              :key="`${cPageId}-gallery`"
                              class="is-marginBottom-20"/>

                <!-- Content -->
                <div v-html="content"
                     class="textEditor textEditor--main"
                     ref="textEditor"></div>
              </template>
            </section>
          </transition>
        </main>
        <!-- / Page content -->

        <!-- Lead news -->
        <div v-if="$enums.config.NEWS && type === $enums.pages.HOMEPAGE && newsItems.length"
             class="containerType1 is-marginTop-20">
          <!-- Sub title -->
          <h2 class="titleType2 is-marginTop-0 is-marginBottom-10">{{ $t('common.leadNews') }}</h2>

          <!-- Loader -->
          <div v-if="newsLoading"
               class="loaderCircular loaderCircular--center"></div>

          <!-- Items -->
          <div v-else
               class="listType4">
            <paris-card v-for="(item, index) in newsItems"
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
          <!-- / Items -->
        </div>
        <!-- / Lead news -->
      </div>
      <!-- / Content -->

      <!-- SideBar -->
      <sidebar-element :target="`${$enums.pages.PAGE}-${cPageId}`"/>
    </div>
    <!-- / Main container -->
  </div>
</template>

<script>
import pageContentServices from '@Services/pageContentServices'
import newsServices from '@Services/newsServices'
import Prism from 'prismjs'
import MetaManager from '@Components/meta/MetaManager'
import PanoramicImage from '@Components/panoramic/PanoramicImage'
import HomepageGallery from '@Components/gallery/HomepageGallery'
import PageGallery from '@Components/gallery/PageGallery'
import LoaderBounce from '@Components/helpers/loader/LoaderBounce'
import SidebarModules from '@Components/sidebar/SidebarModules'
import SidebarElement from '@Components/sidebar/SidebarElement'
import ParisCard from '@Components/cards/ParisCard'
import FocusToContent from '@Components/accessibility/FocusToContent'

export default {
  name: 'Page',
  props: {
    id: {
      type: [Number, String],
      required: false
    },
    type: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      loading: false,
      newsLoading: false,
      galleryLoading: false,
      status: null,
      title: '',
      content: '',
      slug: '',
      newsItems: []
    }
  },
  components: {
    MetaManager,
    PanoramicImage,
    HomepageGallery,
    PageGallery,
    LoaderBounce,
    SidebarModules,
    SidebarElement,
    ParisCard,
    FocusToContent
  },
  computed: {
    /**
     * Page id
     * @returns {string}
     */
    cPageId () {
      return this.type !== this.$enums.pages.HOMEPAGE ? this.id : this.$enums.pages.HOMEPAGE_ID
    }
  },
  watch: {
    cCurrentLanguage (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchDataPage(this.cCurrentLanguage)
        // Lead news data
        if (this.$enums.config.NEWS && this.type === this.$enums.pages.HOMEPAGE) {
          this.fetchDataNewslead(this.cCurrentLanguage)
        }
      }
    },
    id (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchDataPage(this.cCurrentLanguage)
      }
    }
  },
  methods: {
    /**
     * Fetch data page content
     * @param {string} lang
     */
    fetchDataPage (lang) {
      this.loading = true
      pageContentServices.get({
        lang: lang,
        id: this.cPageId
      })
        .then((response) => {
          this.status = response.status
          if (response.status !== this.$enums.statusCode.OK) return

          const data = response.data.data
          this.title = data.title
          this.content = data.content
          if (data.slug) this.slug = data.slug

          // Gallery
          if (data.gallery && data.publication_gallery) this.galleryLoading = true

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
        .finally(() => {
          this.loading = false
        })
    },
    /**
     * Fetch data news lead
     * @param {string} lang
     */
    fetchDataNewslead (lang) {
      this.newsLoading = true
      newsServices.getLeadNews(lang)
        .then((response) => {
          const data = response.data.data
          if (data.items) this.newsItems = data.items
        })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
        .finally(() => {
          this.newsLoading = false
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
    // Fetch data content page
    this.fetchDataPage(this.cCurrentLanguage)

    // Data news lead
    if (this.$enums.config.NEWS && this.type === this.$enums.pages.HOMEPAGE) {
      this.fetchDataNewslead(this.cCurrentLanguage)
    }
  }
}
</script>
