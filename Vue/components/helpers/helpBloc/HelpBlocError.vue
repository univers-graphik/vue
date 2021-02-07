<template>
  <transition name="vueFadeEffect"
              mode="out-in">
    <template v-for="(item, index) in errors">
      <span v-if="item.condition"
            :key="`${index}-item`"
            class="help-bloc help-bloc--error">
        <template v-if="item.message">
          {{ $t(item.message) }}
        </template>
        <template v-else>
          {{ $t('validate.message.required') }}
        </template>
      </span>
    </template>
  </transition>
</template>

<script>
export default {
  name: 'HelpBlocError',
  props: {
    errors: {
      type: Array,
      required: true
    }
  }
}
</script>
