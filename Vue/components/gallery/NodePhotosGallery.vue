<template>
  <div>
    <a v-for="(item, index) in items"
       :key="`${index}-image`"
       class="gallery__item"
       href="#"
       @click.prevent="showItem(index)">
      <img :data-src="item.thumb_name"
           :alt="alt"
           class="gallery__image"/>
      <span class="gallery__pattern"></span>
    </a>
  </div>
</template>

<script>
import Photos from 'node-photos'

export default {
  name: 'NodePhotosGallery',
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
@import '../sass/settings/fonts-icon-variables';

.photos {
  &_operate {
    [class^="photos_icon"] {
      font-size: rem(18) !important;
    }

    .photos_icon {
      &--reset,
      &--origin {
        font-size: 0 !important;

        &:before {
          @include icon-font();
          display: inline-block;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          font-size: rem(20) !important;
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

  &_switch {
    [class^="photos_icon"] {
      font-size: rem(20) !important;
    }
  }

  &_switch_serial {
    font-size: rem(14) !important;
  }

  &_icon--close {
    font-size: rem(18) !important;
  }
}
</style>
