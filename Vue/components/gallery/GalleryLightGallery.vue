<template>
  <div :id="elem">
    <a v-for="(item, index) in items"
       :key="`${index}-image`"
       :href="item.file_name"
       :data-thumb-image="item.thumb_name"
       class="gallery__item">
      <img :data-src="item.thumb_name"
           :alt="alt"
           class="gallery__image"/>
      <span class="gallery__pattern"></span>
    </a>
  </div>
</template>

<script>
import 'lightgallery.js/dist/css/lightgallery.min.css'
import 'lightgallery.js/dist/css/lg-transitions.min.css'
import 'lightgallery.js/dist/js/lightgallery.min'
import 'lg-autoplay.js/dist/lg-autoplay.min'
import 'lg-fullscreen.js/dist/lg-fullscreen.min'
import 'lg-zoom.js/dist/lg-zoom.min'
import 'lg-thumbnail.js/dist/lg-thumbnail.min'

export default {
  name: 'GalleryLightGallery',
  props: {
    items: {
      type: Array,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      elem: 'lightGallery'
    }
  },
  mounted () {
    // Settings configuration
    const settings = {
      addClass: 'appGallery',
      hideBarsDelay: 4000,
      download: false,
      fullScreen: false,
      zoom: true,
      thumbnail: false
    }
    switch (this.theme) {
      case this.$enums.galleryTheme.LIGHT_GALLERY:
        Object.assign(settings, {
          mode: 'lg-slide-circular',
          fullScreen: true,
          thumbnail: true,
          showThumbByDefault: false,
          thumbWidth: 60,
          thumbContHeight: 80,
          exThumbImage: 'data-thumb-image'
        })
        break

      case this.$enums.galleryTheme.LIGHT_GALLERY_SIMPLE:
        Object.assign(settings, {
          mode: 'lg-scale-up'
        })
        break
    }
    // Init
    lightGallery(document.querySelector(`#${this.elem}`), settings)
  }
}
</script>

<style lang="scss">
  .appGallery {
    .lg-toolbar {
      background-color: transparent;

      .lg-icon {
        color: White;
        text-shadow: 0 1px 1px Black;

        &:hover {
          color: Lightgrey;
        }
      }
    }

    #lg-counter {
      color: White;
      text-shadow: 0 1px 1px Black;
      font-size: 14px;
    }
  }
</style>
