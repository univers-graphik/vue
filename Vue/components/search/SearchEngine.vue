<template>
  <div>
    <!-- Overlay -->
    <div class="search__overlay"
         ref="overlay"
         @click.prevent="closeSearch"></div>
    <!-- / Overlay -->

    <div class="search__container">
      <!-- Search engine -->
      <form class="searchField"
            role="search">
        <input class="searchField__checkbox"
               :id="checkBoxId"
               type="checkbox"
               ref="searchEvent"/>
        <label :for="checkBoxId"
               class="searchField__label"
               @click.prevent="closeSearch(1000)"></label>
        <div class="searchField__pattern">
          <i class="icon-search"></i>
        </div>
        <label class="visually-hidden"
               :for="searchId">{{ $t('common.search') }}</label>
        <input v-model="search"
               :placeholder="$t('common.enterYourSearch')"
               :id="searchId"
               :aria-owns="ownedSearchList"
               class="searchField__input"
               type="search"
               autocomplete="off"
               ref="searchInput"
               @keydown.down="onArrowDown"
               @keydown.up="onArrowUp"
               @keypress.enter.prevent="onEnter"
               @input="search = $event.target.value"/>
        <span class="searchField__close"></span>
      </form>
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
                  :id="ownedSearchList"
                  class="search__list"
                  ref="searchList"
                  role="listbox">
                <li v-for="(item, index) in items"
                    :key="`${index}-suggest`"
                    class="search__item"
                    role="option">
                  <!-- Link -->
                  <router-link :to="{ name: $enums.pages[item.type], params: params(item) }"
                               :class="{ [isActive]: index === arrowCounter }"
                               class="search__link"
                               @click.native="refreshNavmain(); closeSearch();">
                    {{ item.label }}
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
import Mark from 'mark.js/dist/mark.es6.min'

export default {
  name: 'SearchEngine',
  props: {
    minLength: {
      type: Number,
      required: false,
      default: 3
    },
    maxSuggestion: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data () {
    return {
      checkBoxId: null,
      searchId: null,
      loading: false,
      status: null,
      search: '',
      items: [],
      arrowCounter: -1,
      isActive: 'isActive',
      ownedSearchList: 'ownedSearchList'
    }
  },
  computed: {
    /**
     * Status search engine
     * @returns {boolean}
     */
    cOpenSearch () {
      return this.$store.state.search.openSearch
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
        lang: this.cCurrentLanguage,
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

          // Highlight result
          setTimeout(() => {
            // Mark instance
            const instance = new Mark(this.$refs.searchList)
            instance.unmark()
            instance.mark(newVal, {
              'element': 'b',
              'className': 'is-text-blue'
            })
          }, 400)
        })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  methods: {
    /**
     * Close search engine
     * @param {number} [delay=0]
     */
    closeSearch (delay = 0) {
      if (delay) {
        this.$refs.searchEvent.click()
        setTimeout(() => {
          this.$store.commit('search/setOpenSearch', false)
        }, delay)
      } else {
        this.$store.commit('search/setOpenSearch', false)
      }

      this.clear()
    },
    /**
     * Close search by escape
     * @param {object} event
     */
    closeSearchByEscape (event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.closeSearch(1000)
      }
      event.preventDefault()
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
     * Config params router link
     * @param {object} item
     * @returns {{lang: ((function(): string)|default.watch.cCurrentLanguage), seo: string, slug: *}}
     */
    params (item) {
      const params = {
        lang: this.cCurrentLanguage,
        seo: process.env.SEO[this.cCurrentLanguage],
        slug: item.slug
      }
      if (item.url_id) params.id = item.url_id

      return params
    },
    /**
     * Navigate with arrow down
     */
    onArrowDown () {
      if (this.arrowCounter < this.items.length - 1) this.arrowCounter++
    },
    /**
     * Navigate with arrow up
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
    // Open search engine
    if (this.cOpenSearch) {
      setTimeout(() => {
        this.$refs.searchEvent.click()
      }, 200)
    }
    // Bind label and id
    this.checkBoxId = `checkBoxId-${this._uid}`
    this.searchId = `searchId-${this._uid}`
    // Give focus to search field
    this.giveFocusTo(this.$refs.searchInput)

    // Listener touchstart overlay
    if (this.$refs.overlay) {
      this.$refs.overlay.addEventListener('touchstart', this.closeSearch, false)
    }
    // Listener escape
    window.addEventListener('keyup', this.closeSearchByEscape, false)
  },
  destroyed () {
    if (this.$refs.overlay) {
      this.$refs.overlay.removeEventListener('touchstart', this.closeSearch, false)
    }
    window.removeEventListener('keyup', this.closeSearchByEscape, false)
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
    top: $headerHeight + rem(60);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    @media #{$isMobile} {
      top: $headerHeightMobile + rem(15);
    }
  }

  &__result {
    $marginTop: rem(5);

    margin-top: $marginTop;
    width: 90%;
    // header height + spacing top + search height  + margin top result + spacing bottom
    max-height: calc(100vh - #{$headerHeight + rem(60) + $searchSize + $marginTop + rem(10)});
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

    &:focus {
      outline: none;
    }

    &.isActive,
    &:hover,
    &:focus {
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
