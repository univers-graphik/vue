<template>
  <transition name="vueFadeEffectContent"
              mode="out-in">
    <!-- Loader -->
    <Loader v-if="loading"
            class="is-marginTop-20"/>

    <template v-else>
      <!-- Content -->
      <aside v-if="loaded"
             class="floatingCol--small floatingCol--spacerLeft">
        <Item v-for="(item, index) in items"
              :key="`${index}-item`"
              :data="item"/>
      </aside>
      <!-- / Content -->
    </template>
  </transition>
</template>

<script>
import sidebarServices from '@Services/sidebarServices'
import Loader from '@Components/helpers/loader/Loader'
import Item from './item/Item'

export default {
  name: 'Sidebar',
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
    Loader,
    Item
  },
  computed: {
    /**
     * Current lang url
     * @returns {string}
     */
    cLangActive () {
      return this.$store.state.parameters.urlLang
    }
  },
  watch: {
    cLangActive (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadData(this.cLangActive)
      }
    }
  },
  methods: {
    /**
     * Load data items sidebar
     * @param {string} lang
     */
    loadData (lang) {
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
        .finally(() => this.loading = false)
    }
  },
  mounted () {
    // Data sidebar
    this.loadData(this.cLangActive)
  }
}
</script>
