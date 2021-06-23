<template>
  <div :class="{ 'slideshow--fullWidth': $store.state.galleryHomepage.config.fullWidth }"
       class="slideshow">
    <!-- Autoplay -->
    <button v-if="$store.state.galleryHomepage.config.autoplay"
            @click="autoPlay"
            class="vueperslides__autoplay"
            type="button">
      <i :class="[autoPlaying ? 'icon-pause' : 'icon-play']"></i>
    </button>
    <!-- / Autoplay -->

    <vueper-slides v-bind="cSettings"
                   class="no-shadow vueperslides--slideshow"
                   :pause-on-hover="pauseOnHover"
                   ref="slideshow">
      <!-- Images -->
      <vueper-slide v-for="(item, index) in $store.state.galleryHomepage.items"
                    :key="`${index}-slideshow`"
                    :image="`${cPath}${item.file_name}`">
        <template v-slot:loader>
          <div class="loaderCircular loaderCircular--white"></div>
        </template>
      </vueper-slide>
      <!-- / Images -->

      <!-- Bullets -->
      <template v-slot:bullet="{ slideIndex }">
        <!-- Preview -->
        <img :src="`${cPath}thumbs-square/${$store.state.galleryHomepage.items[slideIndex].thumb_name}`"
             class="vueperslides__preview"
             alt="thumbnail"/>
      </template>
      <!-- / Bullets -->
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: 'HomepageGallery',
  data () {
    return {
      autoPlaying: true,
      pauseOnHover: true
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
      return '/medias/gallery-homepage/'
    },
    /**
     * Settings slideshow
     * @returns {object}
     */
    cSettings () {
      return {
        autoplay: this.$store.state.galleryHomepage.config.autoplay,
        bullets: this.$store.state.galleryHomepage.config.bullets,
        bulletsOutside: true,
        draggingDistance: 70,
        duration: 6000,
        fade: this.$store.state.galleryHomepage.config.fade,
        fractions: this.$store.state.galleryHomepage.config.fractions,
        lazy: true,
        lazyLoadOnDrag: true,
        preventYScroll: true,
        slideRatio: this.$store.state.galleryHomepage.config.slideRatio,
        '3d': this.$store.state.galleryHomepage.config.cube3d,
        breakpoints: {
          [this.$enums.config.MOBILE_BREAKPOINT]: {
            bullets: false,
            fractions: false
          }
        }
      }
    }
  },
  methods: {
    /**
     * Play / Pause
     */
    autoPlay () {
      this.$refs.slideshow[`${this.autoPlaying ? 'pause' : 'resume'}Autoplay`]()
      this.autoPlaying = !this.autoPlaying
      this.pauseOnHover = !this.pauseOnHover
    }
  }
}
</script>

<style scoped lang="scss">
.slideshow {
  $spacing: 20px;

  margin: 0 auto $spacing;
  max-width: $sizeDefault * 1px;
  position: relative;
  top: $spacing;
  border-radius: 2px;
  border: $panoramicSpacing solid White;
  background-color: White;
  box-shadow: 0 0 4px rgba(Black, .2);
  @media only screen and (max-width: $sizeDefault * 1px) {
    margin-bottom: 0;
    max-width: 100%;
    top: 0;
    border-radius: 0;
    border: none;
    background-color: transparent;
    box-shadow: none;
  }

  &--fullWidth {
    margin-bottom: 0;
    max-width: 100%;
    top: 0;
    border-radius: 0;
    border: none;
    background-color: transparent;
    box-shadow: none;
  }
}
</style>
