<template>
  <div>
    <!-- Overlay -->
    <div class="search__overlay"
         ref="overlay"
         @click.prevent="closeSearch"></div>
    <!-- / Overlay -->

    <div class="search__container">
      <!-- Search engine -->
      <div class="searchField">
        <input class="searchField__checkbox"
               :id="idCheckbox"
               type="checkbox"
               ref="searchEvent"/>
        <label :for="idCheckbox"
               class="searchField__label"
               @click.prevent="closeSearch(true)"></label>
        <div class="searchField__pattern">
          <i class="icon-search"></i>
        </div>
        <label class="searchField__hideLabel"
               :for="idSearch">{{ $t('common.search') }}</label>
        <input v-model="search"
               :placeholder="$t('common.search')"
               :id="idSearch"
               class="searchField__input"
               type="search"
               ref="searchInput"
               @keydown.down="onArrowDown"
               @keydown.up="onArrowUp"
               @keyup.enter.prevent="onEnter"
               @input="search = $event.target.value"/>
        <span class="searchField__close"></span>
      </div>
      <!-- / Search engine -->

      <!-- Suggestion list -->
      <transition name="vueFadeEffect">
        <div v-if="search.length >= minLength"
             class="search__result">
          <transition :duration="300"
                      name="vueFadeEffect"
                      mode="out-in">
            <!-- Loader -->
            <div v-if="loading"
                 class="loaderCircular loaderCircular--center is-marginTB-5 loaderCircular--white"></div>
            <template v-else>
              <!-- Result -->
              <ul v-if="items.length"
                  class="search__list"
                  ref="searchList">
                <li v-for="(item, index) in items"
                    :key="`${index}-suggest`"
                    class="search__item">
                  <!-- Link -->
                  <router-link :to="{ name: $enums.pages[item.type], params: params(item) }"
                               :class="{ [isActive]: index === arrowCounter }"
                               class="search__link"
                               @click.native="resetNavmain(); closeSearch();">
                    <span v-html="highlight(item.label)"></span>
                  </router-link>
                  <!-- / Link -->
                </li>
              </ul>
              <!-- / Result -->

              <!-- No result -->
              <span v-if="status === $enums.statusCode.NO_CONTENT"
                    class="search__noResult">{{ $t('common.noResults') }}</span>
            </template>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import searchServices from '@Services/searchServices'

export default {
  name: 'Search',
  data () {
    return {
      idCheckbox: null,
      idSearch: null,
      loading: false,
      status: null,
      search: '',
      items: [],
      minLength: 3,
      maxSuggestion: 10,
      arrowCounter: -1,
      isActive: 'isActive'
    }
  },
  computed: {
    /**
     * Current lang url
     * @returns {string}
     */
    cLangActive () {
      return this.$store.state.parameters.urlLang
    }
  },
  watch: {
    search (newVal) {
      // Test min length for search request
      if (newVal.length < this.minLength) {
        this.clear(false)
        return
      }

      this.loading = true
      this.arrowCounter = -1
      searchServices.get({
        lang: this.cLangActive,
        params: {
          term: newVal
        }
      })
        .then((response) => {
          this.status = response.status
          // No result
          if (response.status === this.$enums.statusCode.NO_CONTENT) {
            if (this.items.length) this.items = []
            return
          }

          let data = response.data.data.items
          // Limit number results
          if (data.length > this.maxSuggestion) data = data.slice(0, this.maxSuggestion)

          this.items = data
        })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
        .finally(() => this.loading = false)
    }
  },
  methods: {
    /**
     * Close search engine
     * @param {object} [delay=null]
     */
    closeSearch (delay = null) {
      if (delay === true) {
        this.$refs.searchEvent.click()
        setTimeout(() => {
          document.documentElement.removeAttribute('style')
          this.$emit('isvisible')
        }, 1000)
      } else {
        document.documentElement.removeAttribute('style')
        this.$emit('isvisible')
      }

      this.clear()
    },
    /**
     * Clear for reinit
     * @param {boolean} [model=true]
     */
    clear (model = true) {
      if (this.search.length && model) this.search = ''
      if (this.items.length) this.items = []
      this.status = null
      this.arrowCounter = -1
    },
    /**
     * Highlight result
     * @param {string} string
     * @returns {string}
     */
    highlight (string) {
      const text = this.search.split(/[\s-_/\\|\.]/gm).filter(t => !!t) || ['']

      return string.replace(new RegExp('(.*?)(' + text.join('|') + ')(.*?)', 'gi'), '$1<b class="is-text-blue">$2</b>$3')
    },
    /**
     * Config params router link
     * @param {object} item
     * @returns {{lang: string, slug: string}}
     */
    params (item) {
      const params = {
        lang: this.cLangActive,
        slug: item.slug
      }
      if (item.url_id) params.id = item.url_id

      return params
    },
    /**
     * Navigate to result
     */
    onArrowDown () {
      if (this.arrowCounter < this.items.length - 1) this.arrowCounter++
    },
    /**
     * Navigate to result
     */
    onArrowUp () {
      if (this.arrowCounter > 0) this.arrowCounter--
    },
    /**
     * Validate arrow selection
     */
    onEnter () {
      if (this.items.length) {
        this.$refs.searchList.querySelector(`.${this.isActive}`).click()
      }
    }
  },
  mounted () {
    // Bind label and id
    this.idCheckbox = `idCheckbox-${this._uid}`
    this.idSearch = `idSearch-${this._uid}`
    // Focus field
    this.$refs.searchInput.focus()

    // Listener touchstart overlay
    if (this.$refs.overlay) this.$refs.overlay.addEventListener('touchstart', this.closeSearch, false)
  },
  destroyed () {
    if (this.$refs.overlay) this.$refs.overlay.removeEventListener('touchstart', this.closeSearch, false)
  }
}
</script>

<style scoped lang="scss">
  .search {
    &__overlay {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 1;
      background-color: rgba(Black, .6);
      cursor: pointer;
    }

    &__container {
      position: absolute;
      top: $headerHeight + 60;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      @media #{$isMobile} {
        top: $headerHeightMobile + 15;
      }
    }

    &__result {
      margin-top: 5px;
      width: 90%;
      max-height: calc(100vh - #{$headerHeight + 60 + 5 + 50 + 10}); // header height + margin top + height search + spacing bottom
      overflow: {
        x: hidden;
        y: auto
      }
      position: absolute;
      transform: translateX(5%);
      background-color: White;
      box-shadow: 0 0 3px Black;
    }

    &__list {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    &__item {
      display: block;
    }

    &__link {
      padding: 10px;
      display: block;
      color: currentColor;
      text-decoration: none;
      transition: background-color .5s ease;

      &.isActive,
      &:hover {
        background-color: $color1;
      }
    }

    &__noResult {
      padding: 10px;
      display: block;
    }
  }

  .loaderCircular {
    margin-top: 8px;
    margin-bottom: 8px;
  }
</style>
