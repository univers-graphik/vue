<template>
  <div class="countDown"
       ref="countDown">

    <!-- Timer -->
    <span class="countDown__timer"
          ref="timer"></span>

    <!-- Progress -->
    <svg :viewBox="`0 0 ${position * 2} ${position * 2}`"
         xmlns="http://www.w3.org/2000/svg"
         class="progress"
         preserveAspectRatio="xMinYMin meet">
      <circle :cx="position"
              :cy="position"
              :r="radius"
              :stroke-width="strokeWidth"
              ref="progressMeter"/>
      <circle :cx="position"
              :cy="position"
              :r="radius"
              :stroke-width="strokeWidth"
              class="progress__value"
              ref="progressValue"/>
    </svg>
    <!-- / Progress -->

    <!-- Hour markers -->
    <template v-if="hourMarkers">
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 58.6 53.9"
           class="hourMarkers"
           ref="hourMarkers">
        <circle cx="29.2"
                cy="6"
                r="0.8"/>
        <circle cx="41"
                cy="9.6"
                r="0.8"/>
        <circle cx="48.2"
                cy="18"
                r="0.8"/>
        <circle cx="50.2"
                cy="27"
                r="0.8"/>
        <circle cx="48.2"
                cy="36"
                r="0.8"/>
        <circle cx="41"
                cy="44.3"
                r="0.8"/>
        <circle cx="29.2"
                cy="48"
                r="0.8"/>
        <circle cx="17.2"
                cy="44.2"
                r="0.8"/>
        <circle cx="10.2"
                cy="36"
                r="0.8"/>
        <circle cx="8.1"
                cy="27"
                r="0.8"/>
        <circle cx="10.2"
                cy="18"
                r="0.8"/>
        <circle cx="17.2"
                cy="9.7"
                r="0.8"/>
      </svg>
    </template>
    <!-- / Hour markers -->
  </div>
</template>

<script>
export default {
  name: 'CountDown',
  props: {
    duration: {
      type: Number,
      required: false,
      default: 1
    },
    dateStart: {
      type: String,
      required: false
    },
    strokeWidth: {
      type: Number,
      required: false,
      default: 10
    },
    color: {
      type: String,
      required: false,
      default: 'LightGrey'
    },
    colorProgress: {
      type: String,
      required: false,
      default: 'CornflowerBlue'
    },
    background: {
      type: String,
      required: false,
      default: 'transparent'
    },
    hourMarkers: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      position: 60,
      radius: 54,
      contDownSetTimeout: null,
      countDownInProgress: false,
      mathSecond: 60,
      mathHour: 60 * 60,
      mathDay: 60 * 60 * 24
    }
  },
  computed: {
    /**
     * Font size timer versus size component
     * @returns {string}
     */
    cFontSizeTimer () {
      return (this.$refs.countDown.offsetWidth / 70).toFixed(2) + 'em'
    },
    /**
     * Date end countDown
     * @returns {object}
     */
    cDateEnd () {
      const dateEnd = new Date()
      dateEnd.setMinutes(dateEnd.getMinutes() + parseInt(this.duration.toString()))

      return dateEnd
    }
  },
  methods: {
    /**
     * Update svg progress
     * @param {number} value
     */
    progress (value) {
      this.$refs.progressValue.style.strokeDashoffset = (2 * Math.PI * this.radius) * (1 - (value / 100))
    },
    /**
     * Event progress
     * @param {object} dateEnd
     */
    countDownProgress (dateEnd) {
      let remainingSecond = Math.ceil((dateEnd - Date.now()) / 1000)

      if (remainingSecond > 0) {
        this.countDownInProgress = true

        // Timer
        const days = Math.floor(remainingSecond / this.mathDay)
        const hours = Math.floor((remainingSecond - (days * this.mathDay)) / this.mathHour)
        let minutes = Math.floor((remainingSecond - ((days * this.mathDay + hours * this.mathHour))) / this.mathSecond).toString()
        if (minutes < 10) {
          minutes = `0${minutes}`
        }
        let seconds = Math.floor(remainingSecond - ((days * this.mathDay + hours * this.mathHour + minutes * this.mathSecond))).toString()
        if (seconds < 10) {
          seconds = `0${seconds}`
        }
        this.$refs.timer.textContent = `${minutes}:${seconds}`

        // Progress
        this.progress(Math.ceil(remainingSecond * 100 / (parseInt(this.duration) * this.mathSecond)))
      } else {
        // Clear and reinit values
        remainingSecond = 0
        this.countDownInProgress = false
        window.clearTimeout(this.contDownSetTimeout)
        // this.$refs.countDown.innerHTML = ''
        this.$refs.progressValue.style.stroke = this.colorProgress
        this.$refs.timer.textContent = '00:00'

        return this.$emit('complete', true)
      }

      // Event
      if (this.countDownInProgress) {
        this.contDownSetTimeout = window.setTimeout(() => {
          this.countDownProgress(dateEnd)
        }, 1000)
      }
    }
  },
  mounted () {
    // Add colors
    this.$refs.progressValue.style.stroke = this.color
    if (this.$refs.hourMarkers) this.$refs.hourMarkers.style.fill = this.color
    this.$refs.progressMeter.style.stroke = this.colorProgress
    this.$refs.progressMeter.style.fill = this.background
    // Font size timer
    this.$refs.timer.style.fontSize = this.cFontSizeTimer

    // Launch countdown
    if (this.dateStart) {
      const dateStart = new Date(this.dateStart.toString())
      const dateComparison = window.setInterval(() => {
        if (new Date() >= dateStart) {
          this.countDownProgress(this.cDateEnd)
          window.clearTimeout(dateComparison)
        }
      }, 1000)

    } else {
      this.countDownProgress(this.cDateEnd)
    }
  },
  destroyed () {
    if (this.contDownSetTimeout) window.clearTimeout(this.contDownSetTimeout)
  }
}
</script>

<style scoped lang="scss">
  $colorProgress: CornflowerBlue;

  .countDown {
    width: 100%;
    padding-bottom: 100%;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    overflow: hidden;

    &__timer {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      text-align: center;
      color: currentColor;
    }
  }

  .progress {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-90deg) scaleY(-1);

    &__value {
      fill: none;
      stroke-dasharray: 339.292;
      stroke-dashoffset: 0;
      stroke-linecap: round;
      transition: stroke-dashoffset 1s ease;
    }
  }

  .hourMarkers {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }
</style>
