<template>
  <ul class="navmain__list">
    <li v-for="item in collection"
        :key="`${item.id}-navmain`"
        class="navmain__item">

      <!-- Caret slideToggle -->
      <span v-if="hasChildren(item)"
            :class="{ isOpen: getActive(`${$enums.config.SUB_NAV}${item.id}`) }"
            class="navmain__caret"
            @click="toggle(`${$enums.config.SUB_NAV}${item.id}`)"></span>
      <!-- / Caret slideToggle -->

      <!-- Link -->
      <router-link
        :to="{ name: $enums.pages[item.routerName], params: params(item) }"
        :class="'depth-' + depth"
        class="navmain__link">
        {{ item.label }}
      </router-link>
      <!-- / Link -->

      <!-- Sub level (recursive) -->
      <slide-up-down v-if="hasChildren(item)"
                     :active="getActive(`${$enums.config.SUB_NAV}${item.id}`)"
                     :duration="300"
                     :data-sub="`${$enums.config.SUB_NAV}${item.id}`">
        <NavmainList :collection="item.children"
                     :sub-nav="subNav"
                     :depth="cIndent"/>
      </slide-up-down>
      <!-- / Sub level (recursive) -->
    </li>
  </ul>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'

export default {
  name: 'NavmainList',
  props: {
    collection: {
      type: Array,
      required: true
    },
    subNav: {
      type: Object,
      required: true
    },
    depth: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      depthMax: 5
    }
  },
  components: {
    SlideUpDown
  },
  computed: {
    /**
     * Indent item
     * @returns {number}
     */
    cIndent () {
      return this.depth < this.depthMax ? this.depth + 1 : this.depthMax
    },
    /**
     * Current page
     * @returns {number}
     */
    cCurrentPage () {
      return this.$route.params.page ? this.$route.params.page : 1
    }
  },
  methods: {
    /**
     * Multi level children
     * @param {object} item
     * @returns {boolean}
     */
    hasChildren (item) {
      return Array.isArray(item.children) && item.children.length
    },
    /**
     * Dynamic boolean
     * @param {string} id
     * @returns {boolean}
     */
    getActive (id) {
      return this.subNav[id]
    },
    /**
     * Toggle sub list
     * @param {string} id
     */
    toggle (id) {
      this.subNav[id] = !this.subNav[id]
    },
    /**
     * Config params router link
     * @param {object} item
     * @returns {{lang: string, slug: string}}
     */
    params (item) {
      const params = {
        lang: this.$store.state.parameters.urlLang,
        slug: item.slug
      }
      if (item.url_id) params.id = item.url_id
      if (item.pagination) params.page = this.cCurrentPage

      return params
    }
  }
}
</script>

<style scoped lang="scss">
  .navmain {
    $itemHeight: 42px;
    $caretWidth: 44px;
    $pipeWidth: 3px;
    $colorBackground: $color4;
    $colorBackgroundHover: lighten($colorBackground, 7%);
    $colorBackgroundChild: lighten($colorBackground, 4%);
    $colorHover: $color5;
    $linkIndent: 10px;

    &__list {
      @include ulBullet();

      // Sub level
      .navmain__list {
        background-color: $colorBackgroundChild;

        .navmain__caret {
          background-color: $colorBackgroundChild;

          &:hover {
            background-color: $colorBackgroundHover;
          }
        }
      }
    }

    &__item {
      display: block;
      position: relative;
    }

    &__link {
      padding: 0 $linkIndent;
      height: $itemHeight;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      overflow-wrap: break-word;
      border-top: 1px solid lighten($colorBackground, 8%);
      border-bottom: 1px solid Black;
      color: White;
      text: {
        decoration: none;
        shadow: 0 -1px 0 rgba(Black, .3);
      }
      transition: background-color .5s ease, color .5s ease;

      &:before {
        content: '';
        width: $pipeWidth;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        background-color: transparent;
        transition: background-color .5s ease;
      }

      &:hover {
        background-color: $colorBackgroundHover;
        color: $colorHover;

        &:before {
          background-color: $colorHover;
        }
      }

      &.isCurrent {
        &:before {
          background-color: $colorHover;
        }

        &:hover {
          color: $colorHover;
        }
      }
    }

    &__caret {
      width: $caretWidth;
      height: $itemHeight - 2;
      display: inline-block;
      position: absolute;
      right: 0;
      top: 1px;
      z-index: 1;
      cursor: pointer;
      border-left: 1px solid Black;
      background-color: $colorBackground;
      transition: background-color .5s ease, color .5s ease;

      &:before {
        content: '';
        margin: auto;
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: {
          top: 7px solid currentColor;
          right: 5px solid transparent;
          left: 5px solid transparent;
        }
        transform-origin: center;
        transition: transform .5s ease;
      }

      &:hover {
        background-color: $colorBackgroundHover;
        color: $colorHover;
      }

      &.isOpen {
        &:before {
          top: -1px;
          transform: scaleY(-1);
        }
      }

      + .navmain__link {
        padding-right: $caretWidth + 5;
      }
    }

    // Depth (5 levels max)
    @for $i from 1 through 5 {
      .depth-#{$i} {
        padding-left: $linkIndent * $i;
      }
    }
  }
</style>
