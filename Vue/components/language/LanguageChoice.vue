<template>
  <div :class="{ 'is-text-white': light }"
       class="language"
       ref="language">
    <button :class="{ isOpen: isVisible }"
            :aria-expanded="isVisible"
            class="language__button"
            type="button"
            ref="languageButton"
            @click="toggleInfoBox">
      <img :src="`/medias/flag/${cLanguage}.png`"
           :alt="cLanguage"
           class="language__flag"/>
      <span class="language__button__label">{{ $t('language.' + cLanguage) }}</span>
      <i class="icon-down"></i>
    </button>

    <transition name="vueLanguageEffect">
      <div v-if="isVisible"
           class="infoBox infoBox--right is-displayBlock">
        <ul class="infoBoxList"
            role="listbox"
            tabindex="-1">
          <li class="infoBoxList__title infoBoxList__title--type2">{{ $t('language.label') }}</li>
          <li v-for="(item, index) in $enums.lang"
              :key="`${index}-lang`"
              :aria-selected="item === cLanguage"
              class="infoBoxList__item"
              role="option">
            <button :disabled="item === cLanguage"
                    class="infoBoxList__button"
                    type="button"
                    @click.prevent="chooseLang(item)">
              <img :src="`/medias/flag/${item}.png`"
                   :alt="item"
                   class="infoBoxList__img"/>
              <span class="infoBoxList__text">{{ $t('language.' + item) }}</span>
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LanguageChoice',
  props: {
    light: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      isVisible: false
    }
  },
  computed: {
    /**
     * Current language
     * @returns {string}
     */
    cLanguage () {
      return Object.values(this.$enums.lang).includes(this.$i18n.locale) ? this.$i18n.locale : process.env.DEFAULT_LANGUAGE
    }
  },
  methods: {
    /**
     * Choice of language and storage choice
     * @param {string} val
     */
    chooseLang (val) {
      this.$i18n.locale = val
      localStorage.setItem('i18n', val)
      this.$store.commit('parameters/setUrlLang', val.substring(0, 2))
      this.isVisible = !this.isVisible
    },
    /**
     * Close when event click outside component
     * @param {object} e
     */
    documentClick (e) {
      const el = this.$refs.language
      const target = e.target
      if (el !== target && !el.contains(target) && this.isVisible) {
        this.isVisible = false
      }
    },
    /**
     * Display view info box
     */
    toggleInfoBox () {
      this.isVisible = !this.isVisible
      // Display focus
      this.$nextTick(() => {
        if (!this.isVisible) this.removeFocusTo(this.$refs.languageButton)
      })
    }
  },
  mounted () {
    document.addEventListener('click', this.documentClick, false)
  },
  destroyed () {
    document.removeEventListener('click', this.documentClick, false)
  }
}
</script>

<style scoped lang="scss">
// ZoomIn
.vueLanguageEffect {
  &-enter-active {
    animation: zoomIn-animation .4s;
  }

  &-leave-active {
    animation: zoomIn-animation .4s reverse;
  }
}

.language {
  display: inline-block;
  position: relative;

  &__flag {
    margin-right: rem(5);
    width: rem(20);
    vertical-align: middle;
  }

  &__button {
    padding: 0;
    height: rem(30);
    cursor: pointer;
    border: none;
    background-color: transparent;
    -moz-appearance: none;
    -webkit-appearance: none;
    text-align: left;
    font-size: rem(14);
    color: currentColor;

    &:focus {
      outline: none;
      color: $color5;
    }

    &__label {
      padding-top: rem(5);
      padding-bottom: rem(5);
      width: 90px;
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      @media #{$isMobile} {
        display: none;
      }
    }

    [class*="icon-"] {
      display: inline-block;
      vertical-align: middle;
      position: relative;
      top: rem(2);
      transition: transform .3s ease;
      @media #{$isMobile} {
        display: none;
      }
    }

    &.isOpen {
      [class*="icon-"] {
        transform: scaleY(-1);
      }
    }
  }

  .infoBox {
    @media #{$isMobile} {
      margin-top: 0;
    }

    .infoBoxList__title {
      @media #{$isMobile} {
        display: none;
      }
    }

    &--right {
      &:before,
      &:after {
        @media #{$isMobile} {
          display: none;
        }
      }
    }
  }
}

.infoBoxList__button {
  &:disabled {
    cursor: default;
    color: $color5;
    text-shadow: none;

    &:before {
      background-color: White;
    }
  }
}
</style>
