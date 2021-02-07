<template>
  <div class="container404">
    <!-- Meta -->
    <Meta :title="$t('pages.title.error404')"
          no-index="noindex, nofollow"/>

    <div class="container404__background">
      <!-- Title -->
      <p class="container404__title">Oops...<br/>{{ $t('error404.title') }}</p>

      <!-- Content -->
      <p class="container404__content">{{ $t('error404.content-1') }}</p>

      <!-- Link to homepage -->
      <router-link :to="{ name: $enums.pages.HOMEPAGE, params: { lang: $store.state.parameters.urlLang } }"
                   class="buttonType1 buttonType1--large is-marginTop-30"
                   @click.native="resetNavmain">
        {{ $t('pages.navmain.homePage') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import Meta from '@Components/meta/Meta'

export default {
  name: 'Error404',
  components: {
    Meta
  }
}
</script>

<style scoped lang="scss">
  .container404 {
    padding: 0 15px;
    min-height: calc(100vh - #{$headerHeight});
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    @media #{$isMobile} {
      min-height: calc(100vh - #{$headerHeightMobile});
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background: transparent url('/medias/interface/background-404.jpg') no-repeat center / cover;
      filter: grayscale(40%);
    }

    &__background {
      padding: 50px 30px;
      z-index: 2;
      background-color: rgba(Black, .5);

      #{$ie} & {
        margin-top: 100px;
      }
    }

    &__title,
    &__content {
      color: White;
    }

    &__title {
      margin-top: 0;
      font: {
        family: $robotoLight;
        size: 40px;
      }
    }

    &__content {
      margin: 0;
      font-size: 18px;
    }
  }
</style>
