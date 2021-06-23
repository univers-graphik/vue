<template>
  <main class="container404"
        role="main">
    <!-- Meta -->
    <meta-manager :title="$t('pages.title.error404')"
                  no-index="noindex, nofollow"/>

    <div class="container404__background">
      <!-- Focus element for skip link -->
      <focus-to-content/>

      <!-- Title -->
      <p class="container404__title"
         data-focus-title>Oops...<br/>{{ $t('error404.title') }}</p>

      <!-- Content -->
      <p class="container404__content">{{ $t('error404.content-1') }}</p>

      <!-- Link to homepage -->
      <router-link :to="{ name: $enums.pages.HOMEPAGE, params: { lang: $store.state.parameters.urlLang } }"
                   class="buttonType1 buttonType1--large is-marginTop-30"
                   @click.native="refreshNavmain">
        {{ $t('pages.navmain.homePage') }}
      </router-link>
    </div>
  </main>
</template>

<script>
import MetaManager from '@Components/meta/MetaManager'
import FocusToContent from '@Components/accessibility/FocusToContent'

export default {
  name: 'Error404',
  components: {
    MetaManager,
    FocusToContent
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
    padding: 30px;
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
      size: rem(40);
    }
  }

  &__content {
    margin: 0;
    font-size: rem(18);
  }
}
</style>
