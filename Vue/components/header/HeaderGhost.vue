<template>
  <div class="headerGhost"></div>
</template>

<script>
export default {
  name: 'HeaderGhost'
}
</script>

<style scoped lang="scss">
  .headerGhost {
    height: $headerHeight;
    @media #{$isMobile} {
      height: $headerHeightMobile;
    }
  }
</style>
