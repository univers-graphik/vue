<template>
  <div class="customization">
    <!-- Meta -->
    <Meta :title="data.title || $enums.config.SOCIETY_SITE"
          :url="data.slug || $pagesUrl[$i18n.locale].default"
          social-network
          :social-network-description="data.social_network_description"
          :social-network-image="data.image ? data.image : '/medias/logo/social-network-default.png'"
          :social-network-published-time="data.publication_date"/>

    <!-- Main container -->
    <div class="mainContainer mainContainer--spacerTB containerFloatingCol">
      <!-- Informations -->
      <StaticSidebar/>

      <!-- Content -->
      <div class="containerType1 floatingCol--large">
        <transition name="vueFadeEffectContent"
                    mode="out-in">
          <!-- Loader -->
          <Loader v-if="loading"/>

          <template v-else>
            <h1 v-if="status === $enums.statusCode.NO_CONTENT"
                class="titleType3 is-margin-0">{{ $t('common.noDataPage') }} !</h1>

            <!-- News -->
            <article v-else
                     class="news">
              <!-- Main title -->
              <h1 class="titleType1 is-marginBottom-0">{{ data.title }}</h1>

              <!-- Header info -->
              <p class="news__headerInfo">
                <!-- Author -->
                <b v-if="data.author"
                   class="news__author">{{ $tc('common.by', 2) }} {{ data.author }}</b>

                <!-- Date post -->
                <span v-if="data.publication_date"
                      class="news__postDate">
                  <i class="icon-hour"></i>
                  <b>
                    {{ $t('common.published') }}
                    <time :datetime="data.publication_date">
                      {{ $d(new Date(data.publication_date), 'newsList') }}
                    </time>
                  </b>
                </span>
                <!-- / Date post -->

                <!-- Comment -->
                <button v-if="statusComment"
                        class="news__comment"
                        type="button"
                        v-scroll-to="`#${formAnchor}`">
                  <i class="icon-comment"></i>
                  <b>{{ $tc('news.comment', data.comment, { count: data.comment }) }}</b>
                </button>
                <!-- / Comment -->
              </p>
              <!-- / Header info -->

              <!-- Media -->
              <template v-if="data.image || data.video">
                <figure class="news__media">
                  <!-- Image -->
                  <img v-if="data.image && !data.video"
                       v-lazy="{ src: data.image, error: '/medias/interface/image-error-panoramic.gif', loading: '/medias/interface/image-loader-blue.svg' }"
                       :alt="$options.filters.convertString.replaceDoubleQuotes(data.title)"/>
                  <!-- / Image -->

                  <!-- Video -->
                  <video v-if="data.video"
                         :poster="data.image"
                         preload="metadata"
                         controls
                         class="news__video">
                    <source :src="data.image ? data.video : data.video + '#t=0.5'"
                            :type="'video/' + data.video_mime_type"/>
                  </video>
                  <!-- / Video -->

                  <!-- Legend -->
                  <figcaption v-if="data.legend"
                              class="news__legend">{{ data.legend }}
                  </figcaption>
                </figure>
              </template>
              <!-- / Media -->

              <!-- Content -->
              <div v-html="data.content"
                   class="textEditor textEditor--main"
                   ref="textEditor"></div>

              <!-- Share on social network -->
              <SocialSharing :title="data.title"
                             :description="data.social_network_description"
                             class="is-marginTop-20"/>
            </article>
            <!-- / News -->
          </template>
        </transition>

        <!-- Pagination -->
        <Pagination v-if="loadedData"
                    :lang="cLangActive"/>
        <!-- / Pagination -->

        <!-- Comments -->
        <template v-if="statusComment">
          <!-- Title -->
          <p :id="formAnchor"
             class="titleType1 is-marginTop-30">
            <template v-if="data.comment">
              {{ $tc('news.comment', data.comment, { count: data.comment }) }}
            </template>
            <template v-else>
              {{ $t('news.titleForm') }}
            </template>
          </p>
          <!-- / Title -->

          <p class="is-margin-0">En cours de développement</p>
        </template>
        <!-- / Comments -->
      </div>
      <!-- / Content -->

      <!-- SideBar -->
      <Sidebar :target="$enums.pages.NEWS"/>
    </div>
    <!-- / Main container -->
  </div>
</template>

<script>
import newsServices from '@Services/newsServices'
import Prism from 'prismjs'
import Meta from '@Components/meta/Meta'
import Loader from '@Components/helpers/loader/Loader'
import StaticSidebar from '@Components/sidebar/StaticSidebar'
import Sidebar from '@Components/sidebar/Sidebar'
import Pagination from '@Components/news/Pagination'
import SocialSharing from '@Components/socialSharing/SocialSharing'

export default {
  name: 'News',
  data () {
    return {
      loading: false,
      loadedData: false,
      status: null,
      data: {},
      statusComment: null,
      formAnchor: 'formAnchor'
    }
  },
  components: {
    SocialSharing,
    Meta,
    Loader,
    StaticSidebar,
    Sidebar,
    Pagination
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
    },
    '$route.params.id' (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadData(this.cLangActive)
      }
    }
  },
  methods: {
    /**
     * Load data news content
     * @param {string} lang
     */
    loadData (lang) {
      this.loading = true
      this.loadedData = false

      newsServices.getNews({
        lang: lang,
        id: this.$route.params.id || null
      })
        .then((response) => {
          this.status = response.status
          if (response.status !== this.$enums.statusCode.OK) return

          const data = response.data.data
          this.data = data
          this.statusComment = data.comment !== null
          this.loadedData = true

          setTimeout(() => {
            // Add class pre tag
            const textEditor = this.$refs.textEditor
            if (textEditor) {
              const matches = textEditor.querySelectorAll('pre')
              for (let i = 0; i < matches.length; i++) {
                (item => {
                  if (item) item.classList.add('line-numbers')
                })(matches[i])
              }

              // Use prism
              Prism.highlightAll()
            }
          }, 400)
        })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
          // Redirect to 404
          this.$router.push({ name: this.$enums.pages.ERROR_404 })
        })
        .finally(() => this.loading = false)
    }
  },
  mounted () {
    // Data news
    this.loadData(this.cLangActive)
  }
}
</script>

<style scoped lang="scss">
.news {
  &__headerInfo {
    margin: 15px 0;
    color: $color3;

    b {
      display: inline-block;
      vertical-align: middle;
      font-size: 13px;
    }
  }

  &__author {
    margin-right: 15px;
    color: $color5;
  }

  &__postDate {
    margin-right: 15px;
    display: inline-block;
    vertical-align: middle;
    @media #{$isMobile} {
      margin: 5px 0;
      width: 100%;
    }

    [class*="icon-"] {
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
    }
  }

  &__comment {
    padding: 0;
    cursor: pointer;
    border: none;
    background-color: transparent;
    -moz-appearance: none;
    -webkit-appearance: none;
    color: $color3;
    transition: color .5s ease;

    &:focus {
      outline: none;
    }

    [class*="icon-"] {
      display: inline-block;
      vertical-align: middle;
      font-size: 22px;
    }

    &:hover {
      color: $color5;
    }
  }

  &__media {
    margin: 0 0 15px;
    text-align: center;
  }

  &__video {
    max-width: 100%;
    height: auto;
    display: inline-block;
    border: none;
    background-color: Black;

    &[poster] {
      object-fit: cover;
    }
  }

  &__legend {
    margin-top: 5px;
    text-align: left;
    font: {
      family: $robotoLight;
      size: 13px;
    }
    color: $color3;
  }
}
</style>
