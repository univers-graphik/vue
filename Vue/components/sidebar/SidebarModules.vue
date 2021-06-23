<template>
  <aside class="floatingCol--small floatingCol--spacerRight">
    <!-- Society description -->
    <div v-if="$store.state.configuration.societyDescription"
         class="sidebar__item">
      <!-- Img -->
      <img src="/medias/interface/cms-info.jpg"
           alt=""/>
      <!-- Icon -->
      <i class="icon-maintenance sidebar__iconInfo"></i>

      <div class="sidebar__content">
        <!-- Loader -->
        <div v-if="societyDescriptionLoading"
             class="loaderCircular loaderCircular--center is-marginTop-20 is-marginBottom-10"></div>

        <!-- Content -->
        <p v-else
           v-html="$store.state.configuration.societyDescription"
           class="is-marginBottom-0"></p>
      </div>
    </div>
    <!-- / Society description -->

    <!-- Galleries extract -->
    <div
      v-if="$enums.config.GALLERY && $store.state.galleriesExtract.items.length && $store.state.route.current !== $enums.pages.GALLERIES"
      class="sidebar__item">
      <div class="sidebar__content">
        <!-- Title -->
        <h2 class="sidebar__title">{{ $t('common.galleries') }}</h2>

        <!-- Loader -->
        <div v-if="galleriesLoading"
             class="loaderCircular loaderCircular--center is-marginBottom-10"></div>

        <!-- Items -->
        <galleries-extract v-else
                           :items="$store.state.galleriesExtract.items"
                           theme="sidebar"/>
      </div>
    </div>
    <!-- / Galleries extract -->

    <!-- Social Network and last news -->
    <template
      v-if="[$enums.pages.HOMEPAGE, $enums.pages.PAGE, $enums.pages.GALLERIES].includes($store.state.route.current)">
      <!-- Social network -->
      <div class="sidebar__item">
        <div class="sidebar__content">
          <!-- Title -->
          <h2 class="sidebar__title">{{ $t('common.followUs') }}</h2>

          <!-- Follow us -->
          <follow-us v-if="$store.state.contactInformation.loaded"/>

          <!-- Loader -->
          <div v-else
               class="loaderCircular loaderCircular--center is-marginBottom-10"></div>
        </div>
      </div>
      <!-- / Social network -->

      <!-- Last news -->
      <div v-if="$enums.config.NEWS && $store.state.lastNews.items.length"
           class="sidebar__item">
        <div class="sidebar__content">
          <!-- Title -->
          <h2 class="sidebar__title">{{ $t('news.lastNews') }}</h2>

          <!-- Loader -->
          <div v-if="newsLoading"
               class="loaderCircular loaderCircular--center is-marginBottom-10"></div>

          <!-- Items -->
          <template v-else
                    v-for="(item, index) in $store.state.lastNews.items">
            <div v-if="index > 0"
                 :key="`${index}-last-news-divider`"
                 class="is-divider is-marginTB-15"></div>
            <dublin-card :key="`${index}-last-news`"
                         :page="$enums.pages.NEWS"
                         :slug="item.slug"
                         :id="item.id"
                         :file-name="item.file_name"
                         :tag="item.tag"
                         :title="item.title"
                         :title-truncate="45"/>
          </template>
          <!-- / Items -->
        </div>
      </div>
      <!-- / Last news -->
    </template>
    <!-- / Social Network and last news -->
  </aside>
</template>

<script>
import GalleriesExtract from '@Components/gallery/GalleriesExtract'
import FollowUs from '@Components/socialNetwork/FollowUs'
import DublinCard from '@Components/cards/DublinCard'

export default {
  name: 'SidebarModules',
  components: {
    GalleriesExtract,
    FollowUs,
    DublinCard
  },
  data () {
    return {
      societyDescriptionLoading: false,
      galleriesLoading: false,
      newsLoading: false
    }
  },
  watch: {
    cCurrentLanguage (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchDataSocietyDescription(this.cCurrentLanguage)
        if (this.$enums.config.GALLERY) this.fetchDataGalleriesExtract(this.cCurrentLanguage)
        if (this.$enums.config.NEWS) this.fetchDataLastNews(this.cCurrentLanguage)
      }
    }
  },
  methods: {
    /**
     * Fetch data society description
     * @param {string} lang
     */
    fetchDataSocietyDescription (lang) {
      this.societyDescriptionLoading = true
      this.$store.dispatch('configuration/getSocietyDescription', lang)
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
        .finally(() => {
          this.societyDescriptionLoading = false
        })
    },
    /**
     * Fetch data galleries extract
     * @param {string} lang
     */
    fetchDataGalleriesExtract (lang) {
      this.galleriesLoading = true
      this.$store.dispatch('galleriesExtract/get', lang)
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
        .finally(() => {
          this.galleriesLoading = false
        })
    },
    /**
     * Fetch data last news
     * @param {string} lang
     */
    fetchDataLastNews (lang) {
      this.newsLoading = true
      this.$store.dispatch('lastNews/get', lang)
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
        .finally(() => {
          this.newsLoading = false
        })
    }
  },
  created () {
    // Society description
    if (!this.$store.state.configuration.societyDescription) {
      this.fetchDataSocietyDescription(this.cCurrentLanguage)
    }

    // Galleries extract
    if (this.$enums.config.GALLERY && !this.$store.state.galleriesExtract.items.length) {
      this.fetchDataGalleriesExtract(this.cCurrentLanguage)
    }

    // Last news
    if (this.$enums.config.NEWS && !this.$store.state.lastNews.items.length) {
      this.fetchDataLastNews(this.cCurrentLanguage)
    }
  }
}
</script>
