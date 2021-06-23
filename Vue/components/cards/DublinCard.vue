<template>
  <router-link :to="{ name: page, params: { lang: cCurrentLanguage, seo: cSeo, slug: slug, id: id } }"
               class="dublinCard__item"
               @click.native="refreshNavmain">
    <!-- Image -->
    <figure class="dublinCard__containerImage">
      <img
        v-lazy="{ src: fileName ? fileName : $enums.images.NEWS_DEFAULT, error: $enums.images.ERROR_400x400, loading: $enums.images.LOADER_XS }"
        :alt="cAlt"/>
    </figure>
    <!-- / Image -->

    <!-- Content -->
    <div class="dublinCard__content">
      <!-- Tag -->
      <p v-if="tag"
         class="dublinCard__tag">{{ tag }}</p>

      <!-- Title -->
      <p class="dublinCard__title">
        <template v-if="titleTruncate">
          {{ title | truncate(titleTruncate) }}
        </template>
        <template v-else>
          {{ title }}
        </template>
      </p>
      <!-- / Title -->
    </div>
    <!-- / Content -->
  </router-link>
  <!-- / Link -->
</template>

<script>
export default {
  name: 'DublinCard',
  props: {
    page: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    fileName: {
      type: String,
      required: false
    },
    tag: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: true
    },
    titleTruncate: {
      type: Number,
      required: false
    }
  },
  computed: {
    /**
     * Alt attribute image
     * @returns {string}
     */
    cAlt () {
      return this.$options.filters.convertString.replaceDoubleQuotes(this.title)
    }
  }
}
</script>

<style scoped lang="scss">
$dublinCard: '.dublinCard';

#{$dublinCard} {
  $imgSize: 80px;
  $imgSpacing: 15px;

  &__item {
    display: flex;
    background-color: White;
    color: currentColor;
    text-decoration: none;

    &:hover,
    &:focus {
     #{$dublinCard}__title {
        color: $color5;
      }
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px White, 0 0 3px 4px rgba(Black, .5);
    }
  }

  &__containerImage {
    margin: 0 $imgSpacing 0 0;
    width: $imgSize;
    height: $imgSize;
    flex-shrink: 0;
    background-color: Black;
    text-align: center;

    img {
      vertical-align: middle;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__content {
    max-width: calc(100% - #{$imgSize + $imgSpacing});
    overflow-wrap: break-word;
  }

  &__tag {
    margin-top: 0;
    margin-bottom: rem(5);
    font: {
      size: rem(13);
      family: $robotoBold;
    }
    text-transform: uppercase;
    color: $color5;
  }

  &__title {
    margin: 0;
    overflow-wrap: break-word;
    font: {
      family: $robotoLight;
      weight: normal;
      size: rem(17.3);
    }
    transition: color .5s ease;
  }
}
</style>
