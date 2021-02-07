<template>
  <transition name="vueFadeEffectContent"
              mode="out-in">
    <!-- Loader -->
    <Loader v-if="loading"
            class="is-marginTop-30"/>

    <template v-else>
      <div v-if="nav"
           class="newsPagination">
        <!-- Prev -->
        <router-link v-if="prev"
                     :to="{ name: $enums.pages.NEWS, params: { lang: lang, slug: prev.slug, id: prev.id } }"
                     class="newsPagination__link"
                     @click.native="resetNavmain">
          <!-- Nav -->
          <span class="newsPagination__nav">
            &laquo; {{ $t('news.prev') }}
          </span>

          <!-- Item news -->
          <div class="newsPagination__item">
            <!-- Image -->
            <img :src="prev.file_name ? prev.file_name : '/medias/interface/news-default-100-60.jpg'"
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
                     :to="{ name: $enums.pages.NEWS, params: { lang: lang, slug: next.slug, id: next.id } }"
                     class="newsPagination__link"
                     @click.native="resetNavmain">
          <!-- Nav -->
          <span class="newsPagination__nav">
            {{ $t('news.next') }} &raquo;
          </span>

          <!-- Item news -->
          <div class="newsPagination__item newsPagination__item--next">
            <!-- Image -->
            <img :src="next.file_name ? next.file_name : '/medias/interface/news-default-100-60.jpg'"
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
import Loader from '@Components/helpers/loader/Loader'

export default {
  name: 'Pagination',
  props: {
    lang: {
      type: String,
      required: true,
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
    Loader
  },
  methods: {
    /**
     * Load data news pagination
     * @param {string} lang
     */
    loadData (lang) {
      this.loading = true

      newsServices.getNewsPagination({
        lang: lang,
        id: this.$route.params.id || null
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
        .finally(() => this.loading = false)
    },
    /**
     * Crop string
     * @param {string} string
     * @returns {string}
     */
    cropString (string) {
      const max = 55
      return string.length > max ? string.slice(0, max) + '...' : string
    }
  },
  mounted () {
    // Data
    this.loadData(this.lang)
  }
}
</script>

<style scoped lang="scss">
  .newsPagination {
    $itemWidth: 240px;
    $itemHeight: 60px;

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

      &:hover {
        .newsPagination__item {
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
      height: 100%;
      display: inline-block;
      position: relative;
      z-index: 1;
      background-color: White;
      color: $color5;
      @media #{$is1024} {
        padding-right: 0;
        padding-left: 0;
      }
    }

    &__item {
      width: $itemWidth;
      height: $itemHeight - 1;
      position: absolute;
      top: 0;
      left: 100%;
      display: inline-flex;
      align-items: center;
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
      height: 100%;
      vertical-align: middle;
    }

    &__title {
      padding: 0 10px;
      max-width: calc(100% - 100px);
      overflow-wrap: break-word;
      color: White;
      font-size: 12px;
    }
  }
</style>
