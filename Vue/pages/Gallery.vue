<template>
  <div class="customization gallery">
    <!-- Meta -->
    <meta-manager :title="title || $enums.config.SOCIETY_SITE"
                  :url="$pagesUrl[$i18n.locale].default"/>

    <!-- Gallery loaded -->
    <template v-if="loaded">
      <!-- Main container -->
      <main v-lazy-container="{ selector: 'img', error: $enums.images.ERROR_200x200, loading: $enums.images.LOADER }"
            class="mainContainer mainContainer--spacerTB is-alignCenter"
            role="main">
        <!-- Focus element for skip link -->
        <focus-to-content/>

        <!-- Title gallery -->
        <h1 class="gallery__title"
            data-focus-title>{{ title }}</h1>

        <!-- Gallery theme -->
        <light-gallery
          v-if="[$enums.galleryTheme.LIGHT_GALLERY, $enums.galleryTheme.LIGHT_GALLERY_SIMPLE].includes(theme)"
          :items="items"
          :alt="cAlt"
          :theme="theme"/>

        <viewer-gallery v-else-if="theme === $enums.galleryTheme.VIEWER"
                        :items="items"
                        :alt="cAlt"/>

        <media-box-gallery v-else-if="theme === $enums.galleryTheme.MEDIA_BOX"
                           :items="items"
                           :alt="cAlt"/>

        <node-photos-gallery v-else-if="theme === $enums.galleryTheme.NODE_PHOTOS"
                             :items="items"
                             :alt="cAlt"/>
        <!-- / Gallery theme -->
      </main>
      <!-- / Main container -->
    </template>
    <!-- / Gallery loaded -->
  </div>
</template>

<script>
import galleryServices from '@Services/galleryServices'
import MetaManager from '@Components/meta/MetaManager'
import LightGallery from '@Components/gallery/LightGallery'
import ViewerGallery from '@Components/gallery/ViewerGallery'
import MediaBoxGallery from '@Components/gallery/MediaBoxGallery'
import NodePhotosGallery from '@Components/gallery/NodePhotosGallery'
import FocusToContent from '@Components/accessibility/FocusToContent'

export default {
  name: 'Gallery',
  props: {
    id: {
      type: [Number, String],
      required: false
    }
  },
  data () {
    return {
      loaded: false,
      title: '',
      theme: '',
      items: []
    }
  },
  components: {
    MetaManager,
    LightGallery,
    ViewerGallery,
    MediaBoxGallery,
    NodePhotosGallery,
    FocusToContent
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
    galleryServices.getGallery({
      lang: this.cCurrentLanguage,
      id: this.id
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
      .finally(() => {
        this.loaded = true
      })
  }
}
</script>
