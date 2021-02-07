<template>
  <div :class="`sidebar__item--${data.id}`"
       class="sidebar__item">
    <ParentElementRender :show="data.link">
      <!-- Link -->
      <a :href="data.link"
         :target="data.link_blank ? '_blank' : '_self'"
         class="sidebar__link">
        <!-- Content -->
        <div v-html="data.content"
             class="textEditor sidebar__content"></div>
      </a>
    </ParentElementRender>
  </div>
</template>

<script>
import ParentElementRender from '@Components/helpers/parentElementRender/ParentElementRender'

export default {
  name: 'Item',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    ParentElementRender
  },
  created () {
    if (this.data.background_color === '#FFFFFF') return

    document.styleSheets[1].insertRule(
      `.sidebar__item.sidebar__item--${this.data.id} {
            border-color: ${this.data.background_color};
        }`, 0)
    document.styleSheets[1].insertRule(
      `.sidebar__item.sidebar__item--${this.data.id} .sidebar__content {
            background-color: ${this.data.background_color};
        }`, 0)
  }
}
</script>
