<template>
  <transition name="vueFadeEffectContent"
              mode="out-in">
    <!-- Loader -->
    <loader-bounce v-if="loading"
                   class="is-marginTop-20"/>

    <template v-else>
      <!-- Content -->
      <aside v-if="loaded"
             class="floatingCol--small floatingCol--spacerLeft">
        <item-sidebar v-for="(item, index) in items"
                      :key="`${index}-item`"
                      :data="item"/>
      </aside>
      <!-- / Content -->
    </template>
  </transition>
</template>

<script>
import sidebarServices from '@Services/sidebarServices'
import LoaderBounce from '@Components/helpers/loader/LoaderBounce'
import ItemSidebar from './item/ItemSidebar'

export default {
  name: 'SidebarElement',
  props: {
    target: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      loaded: false,
      items: []
    }
  },
  components: {
    LoaderBounce,
    ItemSidebar
  },
  watch: {
    cCurrentLanguage (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchDataSidebar(this.cCurrentLanguage)
      }
    }
  },
  methods: {
    /**
     * Fetch data items sidebar
     * @param {string} lang
     */
    fetchDataSidebar (lang) {
      this.loading = true
      this.loaded = false
      sidebarServices.get({
        lang: lang,
        target: this.target
      })
        .then((response) => {
          if (response.status !== this.$enums.statusCode.OK) return

          this.items = response.data.data.items
          this.loaded = true
        })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  mounted () {
    // Data sidebar
    this.fetchDataSidebar(this.cCurrentLanguage)
  }
}
</script>
