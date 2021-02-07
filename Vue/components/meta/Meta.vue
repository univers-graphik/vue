<script>
export default {
  name: 'Meta',
  props: {
    title: {
      type: String,
      required: false,
      default: process.env.SOCIETY_SITE
    },
    url: {
      type: String,
      required: false,
      default: 'page'
    },
    noIndex: {
      type: String,
      required: false,
      default: 'all'
    },
    socialNetwork: {
      type: Boolean,
      required: false,
      default: false
    },
    ogType: {
      type: String,
      required: false,
      default: 'article'
    },
    socialNetworkDescription: {
      type: String,
      required: false,
      default: ''
    },
    socialNetworkImage: {
      type: String,
      required: false,
      default: ''
    },
    socialNetworkPublishedTime: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      currentUrl: window.location.toString()
    }
  },
  metaInfo () {
    return {
      title: this.title,
      htmlAttrs: {
        lang: this.cLangActive
      },
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.$options.filters.convertString.replaceDoubleQuotes(this.$store.state.meta.metaDescription)
        },
        {
          name: 'robots',
          content: this.noIndex
        },
        ...(this.socialNetwork && [
          {
            property: 'og:url',
            content: this.currentUrl
          },
          {
            property: 'og:type',
            content: this.ogType
          },
          {
            property: 'og:title',
            content: this.$options.filters.convertString.replaceDoubleQuotes(this.title)
          },
          {
            property: 'og:description',
            content: this.socialNetworkDescription
          },
          {
            property: 'og:image',
            content: window.location.hostname + this.socialNetworkImage
          },
          {
            property: 'og:locale',
            content: this.$i18n.locale.replace('-', '_')
          },
          {
            property: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            property: 'article:published_time',
            content: this.socialNetworkPublishedTime
          }
        ] || [])
      ]
    }
  },
  computed: {
    /**
     * Lang active
     * @returns {string}
     */
    cLangActive () {
      return this.$store.state.parameters.urlLang
    }
  },
  watch: {
    cLangActive (newVal, oldVal) {
      if (newVal !== oldVal) {
        // Update url
        if (this.$route.params.lang) {
          setTimeout(() => {
            this.$router.replace({
              params: {
                lang: this.$store.state.parameters.urlLang,
                slug: this.url
              }
            })
              .then(() => {
                this.currentUrl = window.location.toString()
              })
          }, 600)
        }
      }
    }
  },
  render (createElement) {
  }
}
</script>
