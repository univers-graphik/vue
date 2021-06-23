export default {
  methods: {
    /**
     * Calculate percentage
     * @param {string|number} partialValue
     * @param {string|number} totalValue
     * @param {boolean} [round=true] round
     * @returns {undefined|number}
     */
    displayPercent (partialValue, totalValue, round = true) {
      if (partialValue <= 0) return

      const calcul = (100 * parseFloat(partialValue)) / parseFloat(totalValue)
      let result = round ? Math.round(calcul) : calcul.toFixed(2)

      return result > 0 ? result : null
    }
  }
}
