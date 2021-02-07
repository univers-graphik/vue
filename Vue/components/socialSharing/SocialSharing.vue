<template>
  <div>
    <!-- Facebook https://news.vuejs.org/issues/180 -->
    <ShareNetwork network="facebook"
                  url="https://www.univers-graphik.fr/fr/creation-sites-internet/mentions-legales-cgu"
                  :title="title"
                  :description="description"
                  :quote="description">
      Share on Facebook
    </ShareNetwork>
    <!-- / Facebook -->
  </div>
</template>

<script>
export default {
  name: 'SocialSharing',
  props: {
    title: {
      type: String,
      required: true,
      default: process.env.SOCIETY_SITE
    },
    description: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      currentUrl: window.location.toString()
    }
  },
  watch: {
    '$route' () {
      this.currentUrl = window.location.toString()
    }
  }
}
</script>

<style scoped>

</style>
