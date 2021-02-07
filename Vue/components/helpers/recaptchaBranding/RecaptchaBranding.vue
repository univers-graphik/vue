<template>
  <i18n path="recaptcha.content"
        tag="p"
        :class="{ 'recaptchaBranding--light': light }"
        class="recaptchaBranding">
    <template v-slot:link1>
      <a class="recaptchaBranding__link"
         href="https://policies.google.com/privacy"
         target="_blank">{{ $t('recaptcha.privacy') }}</a>
    </template>
    <template v-slot:link2>
      <a class="recaptchaBranding__link"
         href="https://policies.google.com/terms"
         target="_blank">{{ $t('recaptcha.tos') }}</a>
    </template>
  </i18n>
</template>

<script>
export default {
  name: 'RecaptchaBranding',
  props: {
    light: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  .recaptchaBranding {
    font-size: 12px;
    text-align: left;

    &__link {
      color: $mainColor;

      &:hover {
        text-decoration: none;
      }
    }

    &--light {
      .recaptchaBranding__link {
        color: White;
      }
    }
  }
</style>
