<template>
  <div :class="[{ 'flashMessage--noTitle': !title }, 'flashMessage--' + status + '', { 'flashMessage--reload': $store.state.flashMessage.reloadButton }]"
       class="flashMessage">
    <!-- Icon -->
    <i :class="'icon-' + status"
       class="flashMessage__icon"></i>

    <!-- Title -->
    <span v-if="title"
          class="flashMessage__title">{{ title }}</span>

    <!-- Content -->
    {{ message }}

    <!-- Close button -->
    <button v-if="!$store.state.flashMessage.reloadButton"
            class="flashMessage__close"
            type="button"
            @click.prevent="close(index)">&times;
    </button>
    <!-- / Close button -->

    <!-- Reload button -->
    <button v-if="$store.state.flashMessage.reloadButton && status === 'error'"
            class="button flashMessage__reload"
            type="button"
            @click.prevent="reload">
      <i class="icon-initial"></i>
    </button>
    <!-- / Reload button -->
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    status: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false
    }
  },
  methods: {
    /**
     * Reload page
     */
    reload () {
      this.$store.commit('flashMessage/removeError')
      this.$store.commit('flashMessage/removeReloadButton')
      window.location.reload(true)
    },
    /**
     * Close flash message
     * @param {number} index
     */
    close (index) {
      this.$store.commit(`flashMessage/remove${this.status.charAt(0).toUpperCase() + this.status.substring(1)}`, index)
    }
  }
}
</script>

<style scoped lang="scss">
  @keyframes progressItem-animation {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }

  .flashMessage {
    margin: 5px auto;
    display: block;
    box-shadow: 0 0 4px rgba(Black, .4);

    &:after {
      content: '';
      width: 100%;
      height: 4px;
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 2px;
      background-color: Black;
      transform-origin: left;
      animation: progressItem-animation 4s ease;
    }

    &__reload {
      $size: 40px;

      margin-top: -$size / 2;
      padding: 0 10px;
      width: $size;
      height: $size;
      display: block;
      position: absolute;
      top: 50%;
      right: 10px;
      border-radius: 2px;
      background-color: darken($colorError, 20%);
      box-shadow: 0 0 2px Black;
      color: White;

      [class*="icon-"] {
        display: inline-block;
        transform: scale(2);
        transform-origin: center;
      }
    }

    &--warning {
      &:after {
        background-color: darken($colorWarning, 20%);
      }
    }

    &--error {
      &:after {
        background-color: darken($colorError, 20%);
      }
    }

    &--success {
      &:after {
        background-color: darken($colorSuccess, 20%);
      }
    }

    &--info {
      &:after {
        background-color: darken($colorInfo, 20%);
      }
    }
  }
</style>

