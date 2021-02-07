<template>
  <div v-if="preserve3D"
       :style="{ width: cSize, height: cSize, 'animation-delay': !multiple ? delay : cRandomDelay }"
       class="cube3D">
    <img v-for="(item, index) in images"
         :key="`${index}-image`"
         :src="item"
         :style="{ transform: generateInlineStyle(index), opacity: opacity }"
         class="cube3D__image"
         alt="image"/>
  </div>
</template>

<script>
export default {
  name: 'Cube3D',
  props: {
    images: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 100
    },
    preserve3D: {
      type: Boolean,
      required: false,
      default: true
    },
    opacity: {
      type: Number,
      required: false,
      default: 1
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      delay: '0s'
    }
  },
  computed: {
    /**
     * Size cube
     * @returns {string}
     */
    cSize () {
      return `${this.size}px`
    },
    /**
     * Translate Z value
     * @returns {string}
     */
    cTranslateZ () {
      return `${Math.ceil(this.size / 2)}px`
    },
    /**
     * Random delay for starting animation
     * @returns {string}
     */
    cRandomDelay () {
      const delay = ['-1s', '-3s', '-5s', '-7s']
      return delay[Math.floor(Math.random() * delay.length)]
    }
  },
  methods: {
    /**
     * Generate css inline
     * @param {number} index
     * @returns {string}
     */
    generateInlineStyle (index) {
      switch (index) {
        case 0:
          return `translateZ(${this.cTranslateZ})`
          break
        case 1:
          return `rotateY(90deg) translateZ(${this.cTranslateZ})`
          break
        case 2:
          return `rotateY(180deg) translateZ(${this.cTranslateZ})`
          break
        case 3:
          return `rotateY(-90deg) translateZ(${this.cTranslateZ})`
          break
        case 4:
          return `rotateX(-90deg) translateZ(${this.cTranslateZ})`
          break
        case 5:
          return `rotateX(90deg) translateZ(${this.cTranslateZ})`
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @keyframes cube3D-animation {
    from {
      transform: rotateX(0deg) rotateY(0deg);
    }
    to {
      transform: rotateX(360deg) rotateY(360deg);
    }
  }

  .cube3D {
    position: relative;
    transform-style: preserve-3d;
    animation: cube3D-animation 6s infinite linear;

    &__image {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      box-shadow: 0 0 3px rgba(Black, .8);
    }
  }
</style>
