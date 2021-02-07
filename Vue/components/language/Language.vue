<template>
  <div :class="{ 'language--light': light }"
       class="language"
       ref="language">
    <button :class="{ isOpen: isVisible }"
            class="language__button"
            type="button"
            @click="isVisible = !isVisible">
      <img :src="'/medias/flag/' + cLangActive + '.png'"
           :alt="cLangActive"
           class="language__flag"/>
      <span>{{ $t('language.' + cLangActive) }}</span>
      <i class="icon-down"></i>
    </button>

    <transition name="vueLanguageEffect">
      <div v-if="isVisible"
           class="infoBox infoBox--right is-displayBlock">
        <ul class="infoBoxList">
          <li class="infoBoxList__title infoBoxList__title--type2">{{ $t('language.label') }}</li>
          <li v-for="(item, index) in $enums.lang"
              :key="`${index}-lang`"
              class="infoBoxList__item">
            <button :disabled="item === cLangActive"
                    class="infoBoxList__button"
                    type="button"
                    @click.prevent="chooseLang(item)">
              <img :src="'/medias/flag/' + item + '.png'"
                   :alt="item"
                   class="infoBoxList__imgSmaller"/>
              <span>{{ $t('language.' + item) }}</span>
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Language',
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
     * Lang active
     * @returns {string}
     */
    cLangActive () {
      return Object.values(this.$enums.lang).indexOf(this.$i18n.locale) !== -1 ? this.$i18n.locale : process.env.DEFAULT_LANGUAGE
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
     * @param {object} e (event)
     */
    documentClick (e) {
      const el = this.$refs.language
      const target = e.target
      if (el !== target && !el.contains(target) && this.isVisible) {
        this.isVisible = false
      }
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
      margin-right: 5px;
      width: 20px;
      vertical-align: middle;
    }

    &__button {
      padding: 0;
      height: 30px;
      cursor: pointer;
      border: none;
      background-color: transparent;
      -moz-appearance: none;
      -webkit-appearance: none;
      text-align: left;

      &:focus {
        outline: none;
      }

      span {
        padding-top: 5px;
        padding-bottom: 5px;
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
        top: 2px;
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

    &--light {
      .language__button {
        color: White;
        text-shadow: 0 1px 0 Black;
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
