<template>
  <ul class="navmain__list">
    <li v-for="item in collection"
        :key="`${item.id}-navmain`"
        class="navmain__item">

      <!-- Link -->
      <router-link
        :to="{ name: $enums.pages[item.routerName], params: params(item) }"
        :class="'depth-' + depth"
        :data-children="hasChildren(item)"
        class="navmain__link"
        @click.native="giveFocusTo()">
        {{ item.label }}
      </router-link>
      <!-- / Link -->

      <!-- Caret slideToggle -->
      <button v-if="hasChildren(item)"
              :class="{ isOpen: getActive(`${$enums.config.SUB_NAV}${item.id}`) }"
              :aria-expanded="getActive(`${$enums.config.SUB_NAV}${item.id}`)"
              class="button navmain__caret"
              type="button"
              @click="toggle(`${$enums.config.SUB_NAV}${item.id}`)"></button>
      <!-- / Caret slideToggle -->

      <!-- Sub level (recursive) -->
      <slide-up-down v-if="hasChildren(item)"
                     :active="getActive(`${$enums.config.SUB_NAV}${item.id}`)"
                     :duration="300"
                     :data-sub="`${$enums.config.SUB_NAV}${item.id}`"
                     class="navmain__children">
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
      this.$set(this.subNav, id, !this.subNav[id])
    },
    /**
     * Config params router link
     * @param {object} item
     * @returns {{lang: ((function(): string)|default.watch.cCurrentLanguage), seo: *, slug: *}}
     */
    params (item) {
      const params = {
        lang: this.cCurrentLanguage,
        seo: process.env.SEO[this.cCurrentLanguage],
        slug: item.slug
      }
      if (item.url_id) params.id = item.url_id
      if (item.pagination) {
        params.page = this.$enums.pages[item.routerName] === this.$store.state.route.current
          ? this.cCurrentPage
          : 1
      }

      return params
    }
  }
}
</script>

<style scoped lang="scss">
.navmain {
  $itemHeight: rem(48);
  $caretWidth: 44px;
  $pipeWidth: 3px;
  $colorBackground: $color4;
  $colorBackgroundHover: lighten($colorBackground, 7%);
  $colorBackgroundChild: lighten($colorBackground, 4%);
  $colorHover: $color5;
  $linkIndent: 10px;
  $borderTop: rem(1) solid lighten($colorBackground, 8%);
  $borderBottom: rem(1) solid Black;

  &__list {
    @include ul-bullet();

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
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }

  &__link {
    padding: 10px $linkIndent;
    width: 100%;
    min-height: $itemHeight;
    display: flex;
    align-items: center;
    position: relative;
    border-top: $borderTop;
    border-bottom: $borderBottom;
    color: White;
    text: {
      decoration: none;
      shadow: 0 -1px 0 rgba(Black, .3);
    }
    font-size: rem(16);
    word-break: break-word;
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

    &:hover,
    &:focus {
      background-color: $colorBackgroundHover;
      color: $colorHover;

      &:before {
        background-color: $colorHover;
      }
    }

    &:focus {
      outline: none;
    }

    &.isCurrent {
      pointer-events: none;

      &:before {
        background-color: $colorHover;
      }

      &:hover {
        color: $colorHover;
      }
    }

    &[data-children] {
      width: calc(100% - #{$caretWidth});
    }
  }

  &__caret {
    width: $caretWidth;
    display: inline-block;
    flex-shrink: 0;
    position: relative;
    cursor: pointer;
    border-left: rem(1) solid Black;
    border-top: $borderTop;
    border-bottom: $borderBottom;
    background-color: $colorBackground;
    color: White;
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

    &:hover,
    &:focus {
      background-color: $colorBackgroundHover;
      color: $colorHover;
    }

    &.isOpen {
      &:before {
        top: -1px;
        transform: scaleY(-1);
      }
    }
  }

  &__children {
    width: 100%;
  }

  // Depth (5 levels max)
  @for $i from 1 through 5 {
    .depth-#{$i} {
      padding-left: $linkIndent * $i;
    }
  }
}
</style>
