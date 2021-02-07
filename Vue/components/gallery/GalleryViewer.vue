<template>
  <viewer :options="options"
          ref="viewer"
          @inited="inited">
    <div v-for="(item, index) in items"
         :key="`${index}-image`"
         class="gallery__item"
         @click="showItem(index)">
      <img :data-src="item.thumb_name"
           :data-src-main="item.file_name"
           :alt="alt"
           class="gallery__image"/>
      <span class="gallery__pattern"></span>
    </div>
  </viewer>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'

export default {
  name: 'GalleryViewer',
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
  @import '../sass/lib/_fonts-icon-variables';

  .viewer {
    $sizeTool: 40px;

    &-backdrop {
      background-color: rgba(Black, .8);
    }

    &-close {
      width: $sizeTool;
      height: $sizeTool;
      top: 10px;
      right: 20px;

      &:before {
        @include iconFont();
        content: $icon-cross;
        bottom: 10px;
        left: 10px;
        background: none;
        font-size: 20px;
        color: White;
      }
    }

    &-footer {
      overflow: initial;
    }

    &-toolbar {
      [class^="viewer-"] {
        width: $sizeTool;
        height: $sizeTool;
        display: inline-block;
        background-color: rgba(Black, .5);

        &:before {
          @include iconFont();
          margin: 0 !important;
          width: $sizeTool;
          height: $sizeTool;
          display: inline-block;
          background: none;
          color: White;
          text-align: center;
          line-height: $sizeTool;
        }
      }

      > ul {
        padding-left: 10px;
        padding-right: 10px;

        li {
          float: none;
        }

        .viewer-large {
          width: $sizeTool;
          height: $sizeTool;
        }
      }

      [class^="viewer-"]:not(.viewer-prev):not(.viewer-next) {
        margin: 4px;

        &:before {
          font-size: 20px;
        }
      }

      .viewer-prev,
      .viewer-next {
        margin: -$sizeTool 0 0;
        position: fixed;
        top: 50%;

        &:before {
          width: $sizeTool;
          height: $sizeTool;
          position: relative;
          font-size: 26px;
        }
      }

      .viewer {
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
