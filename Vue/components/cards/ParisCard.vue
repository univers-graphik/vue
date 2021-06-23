<template>
  <router-link :to="{ name: page, params: { lang: cCurrentLanguage, seo: cSeo, slug: slug, id: id } }"
               :class="`parisCard--${cardType}`"
               class="parisCard__item"
               @click.native="refreshNavmain">
    <!-- Image -->
    <div class="parisCard__image">
      <img
        v-lazy="{ src: additionalData.file_name ? additionalData.file_name : cDefaultImage, error: cImageError, loading: $enums.images.LOADER }"
        :alt="cAlt"/>
      <!-- Tooltip -->
      <span class="parisCard__tooltip">{{ cTooltip }}</span>
    </div>
    <!-- / Image -->

    <!-- Video icon -->
    <i v-if="additionalData.video"
       class="icon-video parisCard__video"></i>

    <!-- Discount -->
    <span v-if="additionalData.discount && cDiscount"
          class="parisCard__discount">
      -{{ cDiscount }}<span>%</span>
    </span>

    <!-- Status -->
    <span v-if="additionalData.status"
          :class="`parisCard__status--${additionalData.status}`"
          class="parisCard__status">{{ $t(`product.status.st-${additionalData.status}`) }}</span>

    <!-- Tag -->
    <p v-if="additionalData.tag"
       :class="cTextColor"
       class="parisCard__tag">{{ additionalData.tag }}</p>

    <!-- Title -->
    <h2 class="parisCard__title">{{ title }}</h2>

    <!-- News info -->
    <p v-if="additionalData.publication_date || additionalData.comment"
       class="parisCard__info">
      <!-- Date post -->
      <span v-if="additionalData.publication_date"
            class="parisCard__info__item is-marginRight-10">
        <i class="icon-hour"></i>
        <b>{{ $d(new Date(additionalData.publication_date), 'news') }}</b>
      </span>
      <!-- / Date post -->

      <!-- Comment -->
      <span v-if="additionalData.comment"
            class="parisCard__info__item">
        <i class="icon-comment"></i>
        <b>{{ additionalData.comment }}</b>
      </span>
      <!-- / Comment -->
    </p>
    <!-- / News info -->

    <!-- Price product -->
    <p v-if="additionalData.price"
       class="parisCard__productPrice">
      <!-- Price without reduction -->
      <del v-if="additionalData.discount"
           class="parisCard__discountPrice">
        {{ $n(parseFloat(additionalData.price), 'currency') }}
      </del>

      <!-- Price -->
      <i18n-n v-if="$store.state.parameters.browserName !== this.$enums.browserName.IE"
              :value="cPrice"
              :tag="cTagPrice"
              format="currency"
              class="parisCard__price">
        <template v-slot:integer="slotProps">
          <b>{{ slotProps.integer }}</b>
        </template>
        <template v-slot:currency="slotProps">
          <span>{{ slotProps.currency }}</span>
        </template>
      </i18n-n>
      <component v-else
                 :is="cTagPrice"
                 class="parisCard__price">
        <b>{{ $n(cPrice, 'currency') }}</b>
      </component>
      <!-- / Price -->
    </p>
    <!-- / Price product -->
  </router-link>
</template>

<script>
import textColor from '@Mixins/textColor'
import displayPercent from '@Mixins/displayPercent'

const cardTypeDefault = 'news'

export default {
  name: 'ParisCard',
  mixins: [textColor, displayPercent],
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
    title: {
      type: String,
      required: true
    },
    additionalData: {
      type: Object,
      required: false,
      default: () => {
        return {
          value: '' // file_name, video, tag, publication_date, comment | discount, price, status
        }
      }
    },
    cardType: {
      type: String,
      required: false,
      default: cardTypeDefault // news | product
    },
    tooltip: {
      type: String,
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
    },
    /**
     * Default image
     * @returns {string}
     */
    cDefaultImage () {
      return this.cardType === cardTypeDefault ? this.$enums.images.NEWS_DEFAULT : this.$enums.images.PRODUCT_DEFAULT
    },
    /**
     * Image error
     * @returns {string}
     */
    cImageError () {
      return this.cardType === cardTypeDefault ? this.$enums.images.ERROR_400x400 : this.$enums.images.ERROR_400x500
    },
    /**
     * Tooltip text
     * @returns {string}
     */
    cTooltip () {
      return this.tooltip || this.$t('common.readMore')
    },
    /**
     * Calculate final price
     * @returns {number}
     */
    cPrice () {
      const finalPrice = this.additionalData.discount ? (this.additionalData.price - this.additionalData.discount).toFixed(2) : this.additionalData.price

      return parseFloat(finalPrice)
    },
    /**
     * Tag HTML price
     * @returns {string}
     */
    cTagPrice () {
      return this.additionalData.discount ? 'ins' : 'span'
    },
    /**
     * Calculate discount
     * @returns {number|undefined}
     */
    cDiscount () {
      return this.displayPercent(this.additionalData.discount, this.additionalData.price)
    }
  }
}
</script>

<style scoped lang="scss">
$parisCard: '.parisCard';

#{$parisCard} {
  $spacing: 10px;
  $parisCardColor: $color7;
  $parisCardColorDarken: darken($parisCardColor, 5%);

  &__item {
    padding: $spacing;
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid $color1;
    background-color: White;
    color: currentColor;
    text-decoration: none;
    transition: border-color .5s ease, box-shadow .5s ease;

    &:hover,
    &:focus {
      border-color: $color2;
      box-shadow: 0 0 4px rgba(Black, .4);
      @media #{$isHoverNone} {
        border-color: $color1;
        box-shadow: none;

        #{$parisCard}__tooltip {
          display: none;
        }
      }

      #{$parisCard}__tooltip {
        bottom: 0;
      }
    }

    &:focus {
      outline: none;
    }
  }

  &__image {
    position: relative;
    overflow: hidden;
    background-color: Black;
    text-align: center;

    img {
      vertical-align: middle;
    }
  }

  &__tooltip {
    padding: 7px 10px;
    max-width: 100%;
    display: inline-block;
    position: absolute;
    bottom: -80px;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    background-color: $parisCardColorDarken;
    white-space: nowrap;
    color: White;
    font: {
      family: $robotoBold;
      size: rem(14);
    }
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: bottom .5s ease;
  }

  &__video {
    $size: rem(30);

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
    font-size: rem(18);
    line-height: $size;
  }

  &__discount {
    $size: rem(60);

    width: $size;
    height: $size;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: $spacing - 5;
    left: $spacing - 5;
    border-radius: 100%;
    border: 2px solid White;
    box-shadow: 1px 2px 3px rgba(Black, .4);
    @include gradient(
      $startColor: $parisCardColor,
      $endColor: $parisCardColorDarken
    );
    color: White;
    font: {
      size: rem(28);
      family: $bebasNeue;
    }
    @media #{$isXs} {
      width: $size + rem(10);
      height: $size + rem(10);
      font-size: rem(32);
    }

    span {
      position: relative;
      top: 2px;
      font-size: rem(22);
    }
  }

  &__status {
    margin-top: rem(10);
    padding: 5px 10px;
    display: block;
    background-color: $color5;
    @include hyphen();
    color: White;
    font: {
      family: $robotoLight;
      size: rem(13);
    }
    text: {
      align: center;
      transform: uppercase;
    }

    &--2 {
      background-color: $color6;
    }

    &--3 {
      background-color: $color3;
    }
  }

  &__tag {
    margin-top: rem(10);
    margin-bottom: 0;
    font: {
      family: $robotoBold;
      size: rem(13);
    }
    text-transform: uppercase;
    @include hyphen();

    #{$parisCard}--product & {
      color: $color5;
    }
  }

  &__title {
    margin-top: rem(7);
    overflow-wrap: break-word;
    font: {
      family: $robotoLight;
      size: rem(18);
      weight: normal;
    }
  }

  &__info {
    margin-top: auto;
    margin-bottom: 0;
    color: $color3;

    &__item {
      display: inline-block;
    }

    [class*="icon-"] {
      display: inline-block;
      vertical-align: middle;
      font-size: rem(16);
      @media #{$isXs} {
        font-size: rem(19);
      }
    }

    .icon-comment {
      transform: scale(1.2);
    }

    b {
      display: inline-block;
      vertical-align: middle;
      font-size: rem(11);
      @media #{$isXs} {
        font-size: rem(13);
      }
    }
  }

  &__productPrice {
    margin-top: auto;
    margin-bottom: 0;
  }

  &__discountPrice {
    margin-right: 10px;
    color: $color5;
    font-size: rem(14);
    @media #{$isXs} {
      font-size: rem(16);
    }
  }

  &__price {
    color: $parisCardColorDarken;
    text-decoration: none;
    font-size: rem(11);
    @media #{$isXs} {
      font-size: rem(16);
    }

    b {
      font-size: rem(20);
      @media #{$isXs} {
        font-size: rem(28);
      }

      #{$ie} & {
        font-size: rem(16);
      }
    }

    span {
      font-size: rem(14);
    }
  }
}
</style>
