<template>
  <viewer :options="options"
          ref="viewer"
          @inited="inited">
    <a v-for="(item, index) in items"
       :key="`${index}-image`"
       class="gallery__item"
       href="#"
       @click.prevent="showItem(index)">
      <img :data-src="item.thumb_name"
           :data-src-main="item.file_name"
           :alt="alt"
           class="gallery__image"/>
      <span class="gallery__pattern"></span>
    </a>
  </viewer>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'

export default {
  name: 'ViewerGallery',
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
      $viewer: null,
      options: {
        navbar: false,
        title: false,
        movable: false,
        url: 'data-src-main'
      }
    }
  },
  components: {
    Viewer
  },
  methods: {
    /**
     * Init viewer
     * @param {object} viewer
     */
    inited (viewer) {
      this.$viewer = viewer
    },
    /**
     * Showing specific image
     * @param {number} index
     */
    showItem (index) {
      this.$viewer.view(index)
    }
  }
}
</script>

<style lang="scss">
@import '../sass/settings/_fonts-icon-variables';

$viewer: '.viewer';

#{$viewer} {
  $toolSize: rem(40);

  &-backdrop {
    background-color: rgba(Black, .8);
  }

  &-close {
    width: $toolSize;
    height: $toolSize;
    top: 10px;
    right: 20px;
    text-align: center;

    &:before {
      @include icon-font();
      content: $icon-cross;
      width: 100%;
      height: 100%;
      display: inline-block;
      position: relative;
      left: auto;
      bottom: auto;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      font-size: rem(20);
      color: White;
      line-height: $toolSize;
      transition: color .5s ease;
    }

    &:hover,
    &:focus {
      box-shadow: none;

      &:before {
        color: $color5;
      }
    }
  }

  &-footer {
    overflow: initial;
  }

  &-toolbar {
    [class^="viewer-"] {
      width: $toolSize;
      height: $toolSize;
      display: inline-block;
      background-color: rgba(Black, .5);

      &:before {
        @include icon-font();
        margin: 0 !important;
        width: $toolSize;
        height: $toolSize;
        display: inline-block;
        background: none;
        color: White;
        text-align: center;
        line-height: $toolSize;
        transition: color .5s ease;
      }

      &:hover,
      &:focus {
        &:before {
          color: $color5;
        }
      }
    }

    > ul {
      padding-left: 10px;
      padding-right: 10px;

      li {
        float: none;

        &:focus {
          box-shadow: none;
        }
      }

      #{$viewer}-large {
        width: $toolSize;
        height: $toolSize;
      }
    }

    [class^="viewer-"]:not(#{$viewer}-prev):not(#{$viewer}-next) {
      margin: 4px;

      &:before {
        font-size: rem(20);
      }
    }

    #{$viewer}-prev,
    #{$viewer}-next {
      position: fixed !important;
      top: 50%;
      transform: translateY(-50%);

      &:before {
        width: $toolSize;
        height: $toolSize;
        position: relative;
        font-size: rem(26);
      }
    }

    #{$viewer} {
      &-prev {
        left: 20px;

        &:before {
          content: $icon-prev;
        }
      }

      &-next {
        right: 20px;

        &:before {
          content: $icon-next;
        }
      }

      &-zoom-in {
        &:before {
          content: $icon-zoom;
        }
      }

      &-zoom-out {
        &:before {
          content: $icon-zoom-in;
        }
      }

      &-one-to-one {
        &:before {
          content: $icon-actual-size;
        }
      }

      &-reset {
        &:before {
          content: $icon-initial;
        }
      }

      &-play {
        @media #{$isMobile} {
          display: none;
        }

        &:before {
          content: $icon-play;
        }
      }

      &-rotate-left {
        &:before {
          content: $icon-rotate-left;
        }
      }

      &-rotate-right {
        &:before {
          content: $icon-rotate-right;
        }
      }

      &-flip-horizontal {
        @media #{$isXs} {
          display: none;
        }

        &:before {
          content: $icon-flip-horizontal;
        }
      }

      &-flip-vertical {
        @media #{$isXs} {
          display: none;
        }

        &:before {
          content: $icon-flip-vertical;
        }
      }
    }
  }
}
</style>
