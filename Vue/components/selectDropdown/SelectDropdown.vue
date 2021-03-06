<template>
  <div :class="{ error: errorClass, [customClass]: customClass }"
       class="selectDropdown"
       ref="selectDropdown">
    <button :class="{ isOpen: isOpen }"
            :aria-expanded="isOpen"
            class="selectDropdown__button selectDropdown__label"
            type="button"
            @click.prevent="toggleSelect">
      <template v-if="selectedOption.value">
        {{ selectedOption.label }}
      </template>
      <template v-else>
        {{ placeholder }}
      </template>
      <span class="selectDropdown__label__caret"></span>
    </button>

    <transition name="selectDropdownEffect">
      <ul v-if="isOpen"
          :style="{ maxHeight: `${cMaxHeight}rem` }"
          class="selectDropdown__list"
          role="listbox">
        <li v-for="(item, index) in items"
            :key="`${index}-item`"
            class="selectDropdown__item"
            role="option">
          <button :class="{ isSelected: selectedOption.value === item.value }"
                  class="selectDropdown__button"
                  type="button"
                  @click.prevent="updateOption(item, index)">
            <span class="selectDropdown__material__text">{{ item.label }}</span>
            <span class="selectDropdown__material"
                  ref="material"></span>
          </button>
          <!-- Close dropdown with tab navigation -->
          <span v-if="index === cLastItem"
                tabindex="0"
                @keyup.tab.once="toggleSelect"></span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SelectDropdown',
  props: {
    items: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Choisissez une option'
    },
    selectedItem: {
      type: Object,
      required: false,
      default: () => {
        return {
          value: ''
        }
      }
    },
    closeOutside: {
      type: Boolean,
      required: false,
      default: true
    },
    itemsVisible: {
      type: Number,
      required: false,
      default: 5
    },
    errorClass: {
      type: Boolean,
      required: false,
      default: false
    },
    customClass: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      isOpen: false,
      selectedOption: {
        value: ''
      }
    }
  },
  computed: {
    /**
     * Max height selectDropdown (item height + border)
     * @returns {number}
     */
    cMaxHeight () {
      return (30 / 16 + 2 / 16) * this.itemsVisible
    },
    /**
     * Last position
     * @returns {number}
     */
    cLastItem () {
      return Object.keys(this.items).length - 1
    }
  },
  methods: {
    /**
     * Toggle view selectDropdown
     */
    toggleSelect () {
      this.isOpen = !this.isOpen
    },
    /**
     * Update current option
     * @param {object} option
     * @param {number} index
     */
    updateOption (option, index) {
      this.selectedOption = option
      this.$emit('input', this.selectedOption.value)

      // Material design
      const itemCurrent = this.$refs.material[index]
      itemCurrent.classList.add('isActive')
      itemCurrent.addEventListener('transitionend', () => {
        this.isOpen = false
      }, false)
    },
    /**
     * Close when event click outside component
     * @param {object} e (event)
     */
    documentClick (e) {
      const el = this.$refs.selectDropdown
      const target = e.target
      if (el !== target && !el.contains(target) && this.isOpen) {
        this.isOpen = false
      }
    }
  },
  created () {
    // Selected default item
    if (this.selectedItem.value !== '') {
      const selectedKey = Object.keys(this.items).find(key => this.items[key]['value'] === this.selectedItem.value)
      this.selectedOption = this.selectedItem
      this.selectedOption.label = this.items[selectedKey].label
    }
  },
  mounted () {
    // Close selectDropdown
    if (this.closeOutside) document.addEventListener('click', this.documentClick, false)
  },
  destroyed () {
    document.removeEventListener('click', this.documentClick, false)
  }
}
</script>

<style scoped lang="scss">
$selectDropdown: '.selectDropdown';
$labelHeight: rem(36);
$itemHeight: rem(30);
$itemSpacing: 10px;
$itemBackgroundColor: lighten(LightGrey, 8%);
$caretWidth: rem(26);

@keyframes selectDropdown-animation {
  from {
    opacity: 0;
    transform: translate3d(0, - rem(30), 0);
  }
  60% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.selectDropdownEffect {
  &-enter-active {
    animation: selectDropdown-animation .4s;
  }

  &-leave-active {
    animation: selectDropdown-animation .4s reverse;
  }
}

#{$selectDropdown} {
  position: relative;
  cursor: pointer;

  &__button {
    padding: 0;
    max-width: 100%;
    cursor: pointer;
    overflow: hidden;
    border: none;
    background-color: transparent;
    -moz-appearance: none;
    -webkit-appearance: none;
    white-space: nowrap;
    text: {
      align: left;
      overflow: ellipsis;
    }

    &:focus {
      outline: none;
    }
  }

  &__label {
    padding: 0 $caretWidth + rem(5) 0 $itemSpacing;
    width: 100%;
    height: $labelHeight;
    position: relative;
    border: rem(1) solid LightGrey;
    background: linear-gradient(to bottom, White 0%, $itemBackgroundColor 100%);
    text-shadow: 0 1px 0 White;

    &__caret {
      width: $caretWidth;
      height: 100%;
      display: inline-block;
      position: absolute;
      right: 0;
      top: 0;
      border-left: rem(1) solid LightGrey;

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
          top: rem(7) solid currentColor;
          right: rem(5) solid transparent;
          left: rem(5) solid transparent;
        }
        transform-origin: center;
        transition: transform .5s ease;
      }
    }

    &:focus {
      box-shadow: 0 0 0 2px DimGrey;
    }

    &.isOpen {
      #{$selectDropdown}__label__caret {
        &:before {
          top: -1px;
          transform: scaleY(-1);
        }
      }
    }
  }

  &__list {
    margin: 4px 0 0;
    padding: 0;
    list-style: none;
    width: 100%;
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 10;
    overflow: {
      x: hidden;
      y: auto;
    }
    border: rem(1) solid LightGrey;
    background-color: WhiteSmoke;
    box-shadow: 0 2px 4px rgba(Black, .3);
  }

  &__item {
    display: block;
    border-top: rem(1) solid White;
    border-bottom: rem(1) solid Gainsboro;

    &:last-of-type {
      border-bottom: none;
    }

    #{$selectDropdown}__button {
      padding: 0 $itemSpacing;
      width: 100%;
      height: $itemHeight;
      position: relative;
      color: Black;
      text-shadow: 0 1px 0 White;
      font-size: rem(16);
      transition: background-color .5s ease;

      &:hover {
        background-color: $itemBackgroundColor;
        @media only screen and (hover: none) {
          background-color: transparent;
        }
      }

      &:focus {
        background-color: $itemBackgroundColor;
      }

      &.isSelected {
        color: DodgerBlue;
        background-color: $itemBackgroundColor;
      }
    }
  }

  &__material {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    transform: scaleX(0);
    transform-origin: center;
    background-color: rgba(Black, .1);
    transition: transform .3s ease;

    &__text {
      position: relative;
      z-index: 2;
    }

    &.isActive {
      transform: scaleX(1);
    }
  }
}
</style>
