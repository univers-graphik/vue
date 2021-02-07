<template>
  <figure v-if="loaded"
          :class="{ 'panoramic--fullWidth': fullWidth }"
          class="panoramic">
    <ParentElementRender :show="link">
      <a :href="link"
         :target="linkBlank ? '_blank' : '_self'">
        <img
          v-lazy="{ src: `/medias/panoramic/${this.fileName}`, error: '/medias/interface/image-error-panoramic.gif', loading: '/medias/interface/image-loader-blue.svg' }"
          :alt="alt"
          class="panoramic__image"/>
      </a>
    </ParentElementRender>
  </figure>
</template>

<script>
import panoramicServices from '@Services/panoramicServices'
import ParentElementRender from '@Components/helpers/parentElementRender/ParentElementRender'

export default {
  name: 'Panoramic',
  props: {
    type: {
      type: String,
      required: true,
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      loaded: false,
      fileName: '',
      alt: '',
      fullWidth: null,
      link: null,
      linkBlank: null
    }
  },
  components: {
    ParentElementRender
  },
  created () {
    panoramicServices.get({
      id: this.id,
      params: {
        type: this.type
      }
    })
      .then((response) => {
        if (response.status !== this.$enums.statusCode.OK) return

        // Hydrate data
        const data = response.data.data
        this.fileName = data.file_name
        this.alt = data.name
        this.fullWidth = data.full_width
        if (data.link) this.link = data.link
        if (data.link_blank) this.linkBlank = data.link_blank

        this.loaded = true
      })
      .catch((error) => {
        if (process.env.DEBUG) console.log(error.response)
      })
  }
}
</script>

<style scoped lang="scss">
  .panoramic {
    margin: 0;
    padding: 20px 0 0;
    @media only screen and (max-width: $sizeDefault * 1px) {
      padding-top: 0;
    }

    &__image {
      margin: 0 auto;
      max-width: $sizeDefault * 1px;
      display: block;
      border-radius: 2px;
      border: 20px solid White;
      box-shadow: 0 0 4px rgba(Black, .2);
      @media only screen and (max-width: $sizeDefault * 1px) {
        max-width: 100%;
        border-radius: 0;
        border: none;
        box-shadow: none;
      }
    }

    &--fullWidth {
      padding-top: 0;

      .panoramic__image {
        max-width: 100%;
        border-radius: 0;
        border: none;
        box-shadow: none;
      }
    }
  }
</style>
