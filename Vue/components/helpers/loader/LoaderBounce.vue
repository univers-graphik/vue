<template>
  <div class="loaderBounce is-marginAuto">
    <div class="loaderBounce__item loaderBounce__item1"></div>
    <div class="loaderBounce__item loaderBounce__item2"></div>
    <div class="loaderBounce__item loaderBounce__item3"></div>
  </div>
</template>

<script>
export default {
  name: 'LoaderBounce'
}
</script>

<style scoped lang="scss">
.loaderBounce {
  &__item {
    background-color: $color5;
  }
}
</style>
