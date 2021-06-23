<template>
  <div v-if="cHasWarning || cHasError || cHasSuccess || cHasInfo"
       class="containerFlashMessage flashMessage--top">

    <!-- Flash message warning -->
    <transition-group name="vueFadeEffect">
      <template v-for="(data, index) in $store.state.flashMessage.warning">
        <Item :key="`${index}-warning`"
              :index="index"
              :message="data.msg"
              :title="data.title"
              status="warning"/>
      </template>
    </transition-group>

    <!-- Flash message error -->
    <transition-group name="vueFadeEffect">
      <template v-for="(data, index) in $store.state.flashMessage.error">
        <Item :key="`${index}-error`"
              :index="index"
              :message="data.msg"
              :title="data.title"
              status="error"/>
      </template>
    </transition-group>

    <!-- Flash message success -->
    <transition-group name="vueFadeEffect">
      <template v-for="(data, index) in $store.state.flashMessage.success">
        <Item :key="`${index}-success`"
              :index="index"
              :message="data.msg"
              :title="data.title"
              status="success"/>
      </template>
    </transition-group>

    <!-- Flash message info -->
    <transition-group name="vueFadeEffect">
      <template v-for="(data, index) in $store.state.flashMessage.info">
        <Item :key="`${index}-info`"
              :index="index"
              :message="data.msg"
              :title="data.title"
              status="info"/>
      </template>
    </transition-group>
  </div>
</template>

<script>
import Item from './item/Item'

export default {
  name: 'FlashMessage',
  components: {
    Item
  },
  computed: {
    /**
     * Warning length
     * @returns {number}
     */
    cHasWarning () {
      return this.$store.state.flashMessage.warning.length
    },
    /**
     * Error length
     * @returns {number}
     */
    cHasError () {
      return this.$store.state.flashMessage.error.length
    },
    /**
     * Success length
     * @returns {number}
     */
    cHasSuccess () {
      return this.$store.state.flashMessage.success.length
    },
    /**
     * Info length
     * @returns {number}
     */
    cHasInfo () {
      return this.$store.state.flashMessage.info.length
    }
  }
}
</script>

<style scoped lang="scss">
.containerFlashMessage {
  top: $headerHeight + rem(20);
  box-shadow: none;
  @media #{$isMobile} {
    top: $headerHeightMobile + rem(20);
  }
}
</style>
