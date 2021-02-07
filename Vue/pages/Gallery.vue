<template>
  <div class="customization gallery">
    <!-- Meta -->
    <Meta :title="title || $enums.config.SOCIETY_SITE"
          :url="$pagesUrl[$i18n.locale].default"/>

    <!-- Gallery loaded -->
    <template v-if="loaded">
      <!-- Title gallery -->
      <h1 class="gallery__title">{{ title }}</h1>

      <!-- Main container -->
      <div v-lazy-container="{ selector: 'img', error: imageError, loading: imageLoader }"
           class="mainContainer mainContainer--spacerTB is-alignCenter">
        <!-- Gallery theme -->
        <GalleryLightGallery
          v-if="[$enums.galleryTheme.LIGHT_GALLERY, $enums.galleryTheme.LIGHT_GALLERY_SIMPLE].indexOf(theme) != -1"
          :items="items"
          :alt="cAlt"
          :theme="theme"/>

        <GalleryViewer v-if="theme === $enums.galleryTheme.VIEWER"
                       :items="items"
                       :alt="cAlt"/>

        <GalleryMediaBox v-if="theme === $enums.galleryTheme.MEDIA_BOX"
                         :items="items"
                         :alt="cAlt"/>

        <GalleryNodePhotos v-if="theme === $enums.galleryTheme.NODE_PHOTOS"
                           :items="items"
                           :alt="cAlt"/>
        <!-- / Gallery theme -->
      </div>
      <!-- / Main container -->
    </template>
    <!-- / Gallery loaded -->
  </div>
</template>

<script>
import Meta from '@Components/meta/Meta'
import GalleryLightGallery from '@Components/gallery/GalleryLightGallery'
import GalleryViewer from '@Components/gallery/GalleryViewer'
import GalleryMediaBox from '@Components/gallery/GalleryMediaBox'
import GalleryNodePhotos from '@Components/gallery/GalleryNodePhotos'

export default {
  name: 'Gallery',
  data () {
    return {
      loaded: false,
      title: '',
      theme: '',
      items: [],
      imageError: '/medias/interface/image-error.gif',
      imageLoader: '/medias/interface/image-loader.svg'
    }
  },
  components: {
    Meta,
    GalleryLightGallery,
    GalleryViewer,
    GalleryMediaBox,
    GalleryNodePhotos
  },
  computed: {
    /**
     * Alt attribute image
     * @returns {string}
     */
    cAlt () {
      return this.$options.filters.convertString.replaceDoubleQuotes(this.title)
    }
  },
  created () {
    // Load data
    this.$store.dispatch('gallery/getGallery', {
      lang: this.$store.state.parameters.urlLang,
      id: this.$route.params.id
    })
      .then((response) => {
        const data = response.data.data
        this.title = data.title
        this.theme = data.theme
        this.items = data.items
      })
      .catch((error) => {
        if (process.env.DEBUG) console.log(error.response)
        // Redirect to 404
        this.$router.push({ name: this.$enums.pages.ERROR_404 })
      })
      .finally(() => this.loaded = true)
  }
}
</script>
