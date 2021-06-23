<template>
  <div class="madridCard">
    <!-- Title -->
    <h2 :id="id"
        class="madridCard__title">{{ title }}</h2>

    <!-- Content -->
    <slot name="content"></slot>

    <!-- Divider -->
    <div class="is-divider is-divider--full"></div>
  </div>
</template>

<script>
export default {
  name: 'MadridCard',
  props: {
    id: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.madridCard {
  &__title {
    margin-top: 0;
    margin-bottom: rem(15);
    font: {
      size: rem(22);
      weight: normal;
    }
    color: $color5;
    @media #{$isMobile} {
      font-size: rem(20);
    }
  }

  .is-divider {
    margin-top: rem(20);
    margin-bottom: rem(20);
  }

  &:last-of-type {
    .is-divider {
      display: none;
    }
  }
}
</style>
