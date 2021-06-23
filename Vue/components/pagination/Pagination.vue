<template>
  <sliding-pagination :current="currentPage"
                      :total="totalPages"
                      :non-sliding-size=7
                      :aria-goto-page-label="$t('pagination.goTo', { page: '%page% ', total: '%total%' })"
                      :aria-previous-page-label="$t('pagination.prev')"
                      :aria-next-page-label="$t('pagination.next')"
                      :aria-current-page-label="$t('pagination.current', { page: '%page% ', total: '%total%' })"
                      @page-change="pageChangeHandler">
    <template v-slot:previous-page>
      <span class="c-sliding-pagination__nav">&laquo;</span>
    </template>
    <template v-slot:gap-left>
      <span class="c-sliding-pagination__gap">...</span>
    </template>
    <template v-slot:gap-right>
      <span class="c-sliding-pagination__gap">...</span>
    </template>
    <template v-slot:next-page>
      <span class="c-sliding-pagination__nav">&raquo;</span>
    </template>
  </sliding-pagination>
</template>

<script>
import SlidingPagination from 'vue-sliding-pagination'

export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true,
      default: 0
    }
  },
  components: {
    SlidingPagination
  },
  methods: {
    /**
     * Pagination
     * @param {number} selectedPage
     */
    pageChangeHandler (selectedPage) {
      if ([this.currentPage, 0, this.totalPages + 1].includes(selectedPage)) return

      this.$emit('selected-page', selectedPage)

      // Update URL
      setTimeout(() => {
        this.$router.replace({
          params: {
            page: selectedPage.toString()
          }
        })
      }, 100)
    }
  },
  mounted () {
    // Remove tag a to disabled elements
    const disabledElements = this.$el.querySelectorAll('a[disabled]')
    disabledElements.forEach((item) => {
      const span = document.createElement('span')
      span.classList.add('c-sliding-pagination__page')
      span.setAttribute('disabled', 'disabled')
      span.innerHTML = item.innerHTML
      item.parentNode.replaceChild(span, item)
    })
  }
}
</script>
