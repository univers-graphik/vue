export default {
  computed: {
    /**
     * Current lang url
     * @returns {string}
     */
    cCurrentLanguage () {
      return this.$store.state.parameters.urlLang
    },
    /**
     * Seo url (router link)
     * @returns {string}
     */
    cSeo () {
      return process.env.SEO[this.cCurrentLanguage]
    }
  },
  methods: {
    /**
     * Refresh navmain component
     * @param {boolean} [giveFocus=true]
     */
    refreshNavmain (giveFocus = true) {
      if (giveFocus) this.giveFocusTo()
      setTimeout(() => {
        this.$store.commit('navmain/setKey')
      }, 500)
    },
    /**
     * Give focus to specific element for reset focus event click others elements
     * @param {object} [element=document.querySelector(`#${process.env.FIRST_ELEMENT_FOCUS}`)]
     */
    giveFocusTo (element = document.querySelector(`#${process.env.FIRST_ELEMENT_FOCUS}`)) {
      element.focus()
    },
    /**
     * Remove focus to specific element
     */
    removeFocusTo (element) {
      element.blur()
    }
  }
}
