<template>
  <div :id="elem">
    <a v-for="(item, index) in items"
       :key="`${index}-image`"
       :href="item.file_name"
       data-mediabox="gallery"
       class="gallery__item">
      <img :data-src="item.thumb_name"
           :alt="alt"
           class="gallery__image"/>
      <span class="gallery__pattern"></span>
    </a>
  </div>
</template>

<script>
import 'wa-mediabox/dist/wa-mediabox.min.css'
import 'wa-mediabox/dist/wa-mediabox.min'

export default {
  name: 'GalleryMediaBox',
  props: {
    items: {
      type: Array,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      elem: 'mediaBox'
    }
  },
  mounted () {
    // Init
    WAMediaBox.bindAll(document.querySelector(`#${this.elem}`))
    // Locale
    WAMediaBox.lang = {
      prev: this.$t('gallery.prev'),
      next: this.$t('gallery.next'),
      close: this.$t('gallery.close')
    }
  }
}
</script>

<style lang="scss">
  .wa-mediabox {
    &-overlay {
      z-index: 2000;
      background: rgba(Black, .7);
    }

    &-frame {
      background-color: Black;

      &.can-open-in-new {
        .wa-mediabox-open {
          display: none;
        }
      }

      .wa-mediabox-close {
        padding: 0;
        width: 50px;
        height: 50px;
        position: fixed;
        top: 0;
        right: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;

        svg {
          width: 30px;
          height: 30px;
          fill: White;
        }

        &:hover {
          background: transparent;
          box-shadow: none;
        }
      }
    }

    &-next,
    &-prev {
      $size: 50px;

      margin-top: -20px;
      width: $size;
      height: $size;
      position: fixed;
      border-radius: 100%;
      background-color: rgba(DimGrey, .5);

      svg {
        width: $size - 10;
        height: $size - 10;
        fill: White;
      }
    }

    &-prev {
      left: 10px;
    }

    &-next {
      right: 10px;
    }

    &-preloader {
      .wa-mediabox-preloader-spinner {
        border-color: White;
      }
    }
  }
</style>
