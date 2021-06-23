<template>
  <transition name="vueFadeEffect">
    <div v-if="isVisible"
         class="flashMessage flashMessage--error">
      <!-- Icon -->
      <i class="icon-error flashMessage__icon"></i>

      <!-- Messages -->
      <span class="flashMessage__title">{{ $t('common.warning') }} !</span>
      {{ $t('browser.messageIE-1', { versionIE: version }) }}<br/>
      {{ $t('browser.messageIE-2') }}<br/>

      <!-- Browsers list -->
      <p class="is-marginTop-5 is-marginBottom-0">
        <a class="flashMessage__link"
           href="https://www.microsoft.com/fr-fr/edge"
           target="_blank">Microsoft Edge</a>,
        <a class="flashMessage__link"
           href="https://www.mozilla.org/fr/firefox/new/"
           target="_blank">Firefox</a>,
        <a class="flashMessage__link"
           href="https://www.google.com/chrome/"
           target="_blank">Chrome</a>,
        <a class="flashMessage__link"
           href="https://www.apple.com/fr/safari/"
           target="_blank">Safari</a>
      </p>
      <!-- / Browsers list -->

      <!-- Close -->
      <button class="flashMessage__close"
              type="button"
              @click="isVisible = !isVisible">&times;
      </button>
      <!-- / Close -->
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BannerIE',
  props: {
    version: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isVisible: true
    }
  }
}
</script>

<style scoped lang="scss">
  .flashMessage {
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    z-index: $zIndex + 20;
    border-radius: 0;

    &__link {
      color: white;

      &:hover {
        text-decoration: none;
      }
    }
  }
</style>
