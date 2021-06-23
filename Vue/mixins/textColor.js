export default {
  computed: {
    /**
     * Random color class
     * @returns {string}
     */
    cTextColor () {
      const colors = [
        'is-text-blue',
        'is-text-green',
        'is-text-red',
        'is-text-orange',
        'is-text-yellow',
        'is-text-purple',
        'is-text-pink',
        'is-text-darkBlue'
      ]

      return colors[Math.floor(Math.random() * ((colors.length - 1) - 0 + 1)) + 0]
    }
  }
}
