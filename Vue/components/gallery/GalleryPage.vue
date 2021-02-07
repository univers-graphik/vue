<template>
  <div v-if="$store.state.galleryPage.loaded">
    <!-- Carousel -->
    <vueper-slides v-bind="cSettings"
                   class="no-shadow vueperslides--carousel"
                   ref="carousel"
                   @slide="$refs.thumbs && $refs.thumbs.goToSlide($event.currentSlide.index, { emit: false })">
      <vueper-slide v-for="(item, index) in $store.state.galleryPage.items"
                    :key="`${index}-carousel`"
                    :image="`${cPath}${item.file_name}`">
        <template v-slot:loader>
          <div class="loaderCircular loaderCircular--white"></div>
        </template>
      </vueper-slide>
    </vueper-slides>
    <!-- / Carousel -->

    <!-- Thumbnails -->
    <vueper-slides v-if="cLength > visibleThumbs"
                   v-bind="cSettingsThumbs"
                   class="no-shadow vueperslides--thumbs"
                   ref="thumbs"
                   @slide="$refs.carousel && $refs.carousel.goToSlide($event.currentSlide.index, { emit: false })">
      <vueper-slide v-for="(item, index) in $store.state.galleryPage.items"
                    :key="`${index}-thumbs`"
                    :image="`${cPath}thumbs/${item.thumb_name}`"
                    @click.native="$refs.thumbs && $refs.thumbs.goToSlide(index)"/>
    </vueper-slides>
    <!-- / Thumbnails -->
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  name: 'GalleryPage',
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      visibleThumbs: 7
    }
  },
  components: {
    VueperSlides,
    VueperSlide
  },
  computed: {
    /**
     * Path to images
     * @returns {string}
     */
    cPath () {
      return this.$store.state.galleryPage.path
    },
    /**
     * Count items
     * @returns {number}
     */
    cLength () {
      return this.$store.state.galleryPage.items.length
    },
    /**
     * Settings carousel image
     * @returns {object}
     */
    cSettings () {
      return {
        bullets: true,
        draggingDistance: 70,
        fade: this.$store.state.galleryPage.config.fade,
        lazy: true,
        lazyLoadOnDrag: true,
        preventYScroll: true,
        slideRatio: this.$store.state.galleryPage.config.slideRatio,
        '3d': this.$store.state.galleryPage.config.cube3d,
        breakpoints: {
          [this.$enums.config.MOBILE_BREAKPOINT]: {
            arrows: false,
            bullets: false
          }
        }
      }
    },
    /**
     * Settings carousel thumbs
     * @returns {object}
     */
    cSettingsThumbs () {
      return {
        arrows: false,
        bullets: false,
        draggingDistance: 50,
        gap: 2,
        preventYScroll: true,
        slideRatio: 1 / 12,
        visibleSlides: this.visibleThumbs,
        breakpoints: {
          1024: {
            slideRatio: 1 / 8,
            visibleSlides: this.visibleThumbs - 2
          },
          480: {
            slideRatio: 1 / 7,
            visibleSlides: this.visibleThumbs - 2
          }
        }
      }
    }
  },
  created () {
    // Load data gallery
    const storage = sessionStorage
    const nameStorage = 'galleryPage'
    if (!storage.getItem(nameStorage) || storage.getItem(nameStorage) !== this.id.toString()) {
      this.$store.dispatch('galleryPage/get', this.id)
        .then((response) => {
          if (response.status !== this.$enums.statusCode.OK) return
        })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
      storage.setItem(nameStorage, this.id)
    }
  }
}
</script>
