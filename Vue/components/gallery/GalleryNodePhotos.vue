<template>
  <div>
    <div v-for="(item, index) in items"
         :key="`${index}-image`"
         class="gallery__item"
         @click="showItem(index)">
      <img :data-src="item.thumb_name"
           :alt="alt"
           class="gallery__image"/>
      <span class="gallery__pattern"></span>
    </div>
  </div>
</template>

<script>
import Photos from 'node-photos'

export default {
  name: 'GalleryNodePhotos',
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
      listImage: [],
      photos: {}
    }
  },
  methods: {
    /**
     * Showing item
     * @param {number} index
     */
    showItem (index) {
      this.photos.show(index)
    }
  },
  mounted () {
    this.items.forEach(item => {
      this.listImage.push(item.file_name)
    })

    // Init
    this.photos = new Photos({
      list: this.listImage
    })
  }
}
</script>

<style lang="scss">
  @import '../sass/lib/_fonts-icon-variables';

  .photos {
    &_operate {
      .photos_icon {
        &--reset,
        &--origin {
          font-size: 0 !important;

          &:before {
            @include iconFont();
            display: inline-block;
            position: relative;
            top: 8px;
            font-size: 20px !important;
          }
        }

        &--reset {
          &:before {
            content: $icon-initial;
          }
        }

        &--origin {
          &:before {
            content: $icon-zoom;
          }
        }
      }
    }
  }
</style>
