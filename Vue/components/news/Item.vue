<template>
  <router-link
    :to="{ name: $enums.pages.NEWS, params: { lang: $store.state.parameters.urlLang, slug: item.slug, id: item.id } }"
    class="newsList__item"
    @click.native="resetNavmain">
    <!-- Image -->
    <div class="newsList__image">
      <img
        v-lazy="{ src: item.file_name ? item.file_name : '/medias/interface/news-default-400-400.jpg', error: '/medias/interface/image-error.gif', loading: '/medias/interface/image-loader.svg' }"
        :alt="cAlt"/>
    </div>

    <!-- Video -->
    <i v-if="item.video"
       class="icon-video newsList__video"></i>

    <!-- Tag -->
    <p v-if="item.tag"
       :class="cTextColor"
       class="newsList__tag">{{ item.tag }}</p>

    <!-- Title -->
    <h2 class="newsList__title">{{ item.title }}</h2>

    <!-- Info -->
    <p class="newsList__info">
      <!-- Date post -->
      <span class="newsList__info__item is-marginRight-10">
        <i class="icon-hour"></i>
        <b>{{ $d(new Date(item.publication_date), 'newsList') }}</b>
      </span>
      <!-- / Date post -->

      <!-- Comment -->
      <span v-if="item.comment"
            class="newsList__info__item">
        <i class="icon-comment"></i>
        <b>{{ item.comment }}</b>
      </span>
      <!-- / Comment -->
    </p>
    <!-- / Info -->
  </router-link>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    /**
     * Alt attribute image
     * @returns {string}
     */
    cAlt () {
      return this.$options.filters.convertString.replaceDoubleQuotes(this.item.title)
    },
    /**
     * Random color class
     * @returns {string}
     */
    cTextColor () {
      const colors = ['is-text-blue', 'is-text-green', 'is-text-red', 'is-text-orange', 'is-text-purple']

      return colors[Math.floor(Math.random() * Math.floor(4))]
    }
  }
}
</script>

<style scoped lang="scss">
  .newsList {
    $spacing: 10px;

    &__item {
      margin: 0 $spacing $spacing 0;
      padding: 10px;
      width: calc(33% - 6px);
      display: inline-flex;
      flex-direction: column;
      position: relative;
      border: 1px solid $color1;
      background-color: White;
      text-decoration: none;
      color: currentColor;
      transition: border-color .5s ease, box-shadow .5s ease;
      @media #{$is1024} {
        width: calc(50% - 5px);
      }
      @media #{$isXs} {
        margin-right: 0;
        width: 100%;
      }

      #{$ie} & {
        display: block;
      }

      &:nth-child(3n+3) {
        margin-right: 0;
        @media #{$is1024} {
          margin-right: $spacing;
        }
        @media #{$isXs} {
          margin-right: 0;
        }
      }

      &:nth-child(even) {
        @media #{$is1024} {
          margin-right: 0;
        }
      }

      &:hover {
        border-color: $color2;
        box-shadow: 0 0 4px rgba(Black, .4);
        @media #{$isHoverNone} {
          border-color: $color1;
          box-shadow: none;
        }
      }
    }

    &__image {
      background-color: Black;
      text-align: center;

      img {
        vertical-align: middle;
      }
    }

    &__video {
      $size: 30px;

      width: $size;
      height: $size;
      display: inline-block;
      position: absolute;
      top: $spacing + 10;
      right: $spacing + 10;
      background-color: Black;
      border-radius: 100%;
      color: White;
      text-align: center;
      font-size: 18px;
      line-height: $size;
    }

    &__tag {
      margin-top: 10px;
      margin-bottom: 0;
      font: {
        family: $robotoBold;
        size: 11px;
      }
      text-transform: uppercase;
    }

    &__title {
      margin-top: 7px;
      flex-grow: 1;
      font: {
        family: $robotoLight;
        size: 18px;
        weight: normal;
      }
    }

    &__info {
      margin: 0;
      color: $color3;

      &__item {
        display: inline-block;
      }

      [class*="icon-"] {
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
      }

      .icon-comment {
        transform: scale(1.2);
      }

      b {
        display: inline-block;
        vertical-align: middle;
        font-size: 11px;
      }
    }
  }
</style>
