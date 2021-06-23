<template>
  <transition name="vueFadeEffectContent"
              mode="out-in">
    <!-- Loader -->
    <loader-bounce v-if="loading"
                   class="is-marginTop-30"/>

    <template v-else>
      <div v-if="nav"
           class="newsPagination">
        <!-- Prev -->
        <router-link v-if="prev"
                     :to="{ name: $enums.pages.NEWS, params: { lang: lang, seo: cSeo, slug: prev.slug, id: prev.id } }"
                     class="newsPagination__link"
                     @click.native="refreshNavmain">
          <!-- Nav -->
          <span class="newsPagination__nav">
            &laquo; {{ $t('news.prev') }}
          </span>

          <!-- Item news -->
          <div class="newsPagination__item">
            <!-- Image -->
            <img :src="prev.file_name ? prev.file_name : $enums.images.NEWS_PAGINATION_DEFAULT"
                 :alt="$options.filters.convertString.replaceDoubleQuotes(prev.title)"
                 class="newsPagination__image"/>
            <!-- Title -->
            <span class="newsPagination__title">{{ cropString(prev.title) }}</span>
          </div>
          <!-- / Item news -->
        </router-link>
        <span v-else></span>
        <!-- / Prev -->

        <!-- Next -->
        <router-link v-if="next"
                     :to="{ name: $enums.pages.NEWS, params: { lang: lang, seo: cSeo, slug: next.slug, id: next.id } }"
                     class="newsPagination__link"
                     @click.native="refreshNavmain">
          <!-- Nav -->
          <span class="newsPagination__nav">
            {{ $t('news.next') }} &raquo;
          </span>

          <!-- Item news -->
          <div class="newsPagination__item newsPagination__item--next">
            <!-- Image -->
            <img :src="next.file_name ? next.file_name : $enums.images.NEWS_PAGINATION_DEFAULT"
                 :alt="$options.filters.convertString.replaceDoubleQuotes(next.title)"
                 class="newsPagination__image"/>
            <!-- Title -->
            <span class="newsPagination__title">{{ cropString(next.title) }}</span>
          </div>
          <!-- / Item news -->
        </router-link>
        <!-- / Next -->
      </div>
    </template>
  </transition>
</template>

<script>
import newsServices from '@Services/newsServices'
import LoaderBounce from '@Components/helpers/loader/LoaderBounce'

export default {
  name: 'NewsPagination',
  props: {
    lang: {
      type: String,
      required: true
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      loading: false,
      nav: false,
      prev: null,
      next: null
    }
  },
  components: {
    LoaderBounce
  },
  computed: {
    /**
     * Seo url
     * @returns {string}
     */
    cSeo () {
      return process.env.SEO[this.lang]
    }
  },
  methods: {
    /**
     * Fetch data news pagination
     * @param {string} lang
     */
    fetchDataNewsPagination (lang) {
      this.loading = true
      newsServices.getNewsPagination({
        lang: lang,
        id: this.id
      })
        .then((response) => {
          const data = response.data.data
          this.nav = data.nav
          if (data.prev) this.prev = data.prev
          if (data.next) this.next = data.next
        })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
        .finally(() => {
          this.loading = false
        })
    },
    /**
     * Crop string
     * @param {string} string
     * @returns {string}
     */
    cropString (string) {
      const max = 45
      return string.length > max ? string.slice(0, max) + '...' : string
    }
  },
  mounted () {
    // Data
    this.fetchDataNewsPagination(this.lang)
  }
}
</script>

<style scoped lang="scss">
$newsPagination: '.newsPagination';

#{$newsPagination} {
  $itemWidth: 240px;
  $itemHeight: rem(60);
  $imgWidth: 100px;
  $zIndex : 1;

  margin-top: 30px;
  height: $itemHeight;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border-top: 1px dotted $color4;
  border-bottom: 1px dotted $color4;

  &__link {
    height: 100%;
    position: relative;
    text-decoration: none;

    &:focus {
      outline: none;
    }

    &:hover,
    &:focus {
      z-index: $zIndex + 1;

      #{$newsPagination}__nav {
        color: Black;
      }

      #{$newsPagination}__item {
        transform: translateX(0);
        @media #{$is1024}, #{$isHoverNone} {
          transform: none;
          display: none;
        }
      }
    }
  }

  &__nav {
    padding: 20px 10px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    z-index: $zIndex;
    background-color: White;
    color: $color5;
    transition: color .5s ease;
    @media #{$is1024} {
      padding-right: 0;
      padding-left: 0;
    }
  }

  &__item {
    width: $itemWidth;
    height: 100%;
    display: inline-flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 100%;
    transform-origin: left;
    transform: translateX(-100%);
    overflow: hidden;
    background-color: $color12;
    transition: transform .5s ease;

    &--next {
      left: auto;
      right: 100%;
      transform-origin: right;
      transform: translateX(100%);
    }
  }

  &__image {
    width: $imgWidth;
    flex-shrink: 0;
    vertical-align: middle;
  }

  &__title {
    padding: 0 10px;
    max-width: calc(100% - #{$imgWidth});
    overflow-wrap: break-word;
    color: White;
    font-size: rem(13);
  }
}
</style>
