<template>
  <div class="customization">
    <!-- Meta -->
    <meta-manager :title="data.title || $enums.config.SOCIETY_SITE"
                  :url="data.slug || $pagesUrl[$i18n.locale].default"
                  social-network
                  :social-network-description="data.social_network_description"
                  :social-network-image="data.image ? data.image : '/medias/logo/social-network-default.png'"
                  :social-network-published-time="data.publication_date"/>

    <!-- Main container -->
    <div class="mainContainer mainContainer--spacerTB containerFloatingCol">
      <!-- Sidebar modules -->
      <sidebar-modules v-if="!$enums.breakpoints.TABLET_PORTRAIT"
                       class="is-noTabletPortrait"/>

      <!-- Main content -->
      <main class="containerType1 floatingCol--large"
            role="main">
        <transition name="vueFadeEffectContent"
                    mode="out-in">
          <!-- Loader -->
          <loader-bounce v-if="loading"/>

          <article v-else
                   class="news">
            <!-- Focus element for skip link -->
            <focus-to-content/>

            <!-- Main title -->
            <h1 v-if="status === $enums.statusCode.NO_CONTENT"
                class="titleType3 is-margin-0"
                data-focus-title>{{ $t('common.noDataPage') }} !</h1>

            <!-- News -->
            <template v-else>
              <!-- Main title -->
              <h1 class="titleType1 is-marginBottom-15"
                  data-focus-title>{{ data.title }}</h1>

              <!-- Tag -->
              <p v-if="data.tag"
                 :class="cTextColor"
                 class="news__tag">{{ data.tag }}</p>

              <!-- Header info -->
              <p class="news__headerInfo">
                <!-- Author -->
                <b v-if="data.author"
                   class="news__author">{{ $tc('common.by', 2) }} {{ data.author }}</b>

                <!-- Dates -->
                <span class="news__date">
                  <!-- Publication date -->
                  <i class="icon-hour"></i>
                  {{ $t('common.published') }}
                  <time v-if="data.publication_date"
                        :datetime="data.publication_date"
                        class="is-bold">
                    {{ $d(new Date(data.publication_date), 'news') }}
                  </time>
                  <!-- / Publication date -->

                  <!-- Updated date -->
                  <template v-if="data.updated_date">
                      - {{ $t('common.updated') }}
                      <time :datetime="data.updated_date"
                            class="is-bold">
                        {{ $d(new Date(data.updated_date), 'news') }}
                      </time>
                  </template>
                  <!-- / Updated date -->
                </span>
                <!-- / Dates -->
              </p>
              <!-- / Header info -->

              <!-- Comment -->
              <button v-if="statusComment"
                      class="news__comment"
                      type="button"
                      v-scroll-to="`#${formAnchor}`">
                <i class="icon-comment"></i>
                <b>{{ $tc('news.comment', data.comment, { count: data.comment }) }}</b>
              </button>
              <!-- / Comment -->

              <!-- Media -->
              <template v-if="data.image || data.video">
                <figure
                  :aria-label="data.legend ? $options.filters.convertString.replaceDoubleQuotes(data.legend) : false"
                  class="news__media"
                  role="figure">
                  <!-- Image -->
                  <img v-if="data.image && !data.video"
                       v-lazy="{ src: data.image, error: $enums.images.ERROR_2000x500, loading: $enums.images.LOADER_BLUE }"
                       :alt="$options.filters.convertString.replaceDoubleQuotes(data.title)"/>
                  <!-- / Image -->

                  <!-- Video -->
                  <video v-if="data.video"
                         :poster="data.image"
                         preload="metadata"
                         controls
                         class="news__video">
                    <source :src="data.image ? data.video : `${data.video}#t=0.5`"
                            :type="`video/${data.video_mime_type}`"/>
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
                   class="textEditor textEditor--main is-marginTop-15"
                   ref="textEditor"></div>
              <!-- / Content -->
            </template>
          </article>
          <!-- / News -->
        </transition>

        <!-- Pagination -->
        <news-pagination v-if="loadedData"
                         :lang="cCurrentLanguage"
                         :id="id"/>
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
      </main>
      <!-- / Main content -->

      <!-- SideBar -->
      <sidebar-element :target="$enums.pages.NEWS"/>
    </div>
    <!-- / Main container -->
  </div>
</template>

<script>
import newsServices from '@Services/newsServices'
import textColor from '@Mixins/textColor'
import Prism from 'prismjs'
import MetaManager from '@Components/meta/MetaManager'
import LoaderBounce from '@Components/helpers/loader/LoaderBounce'
import SidebarModules from '@Components/sidebar/SidebarModules'
import SidebarElement from '@Components/sidebar/SidebarElement'
import NewsPagination from '@Components/pagination/NewsPagination'
import FocusToContent from '@Components/accessibility/FocusToContent'

export default {
  name: 'News',
  mixins: [textColor],
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
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
    MetaManager,
    LoaderBounce,
    SidebarModules,
    SidebarElement,
    NewsPagination,
    FocusToContent
  },
  watch: {
    cCurrentLanguage (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchDataNews(this.cCurrentLanguage)
      }
    },
    id (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchDataNews(this.cCurrentLanguage)
      }
    }
  },
  methods: {
    /**
     * Fetch data news content
     * @param {string} lang
     */
    fetchDataNews (lang) {
      this.loading = true
      this.loadedData = false
      newsServices.getNews({
        lang: lang,
        id: this.id || null
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
        .finally(() => {
          this.loading = false
        })
    }
  },
  mounted () {
    // Data news
    this.fetchDataNews(this.cCurrentLanguage)
  }
}
</script>

<style scoped lang="scss">
.news {
  &__tag {
    margin: rem(10) 0;
    font: {
      family: $robotoBold;
      size: rem(14);
    }
    text-transform: uppercase;
  }

  &__headerInfo {
    margin-top: rem(10);
    margin-bottom: rem(10);
  }

  &__author {
    margin-right: 5px;
    color: $color5;
    font-size: rem(14);
    @media #{$isXs} {
      margin-right: 0;
      margin-bottom: rem(5);
      display: block;
    }

    &:after {
      content: '|';
      margin-left: 10px;
      font-size: rem(16);
      color: $color3;
      @media #{$isXs} {
        display: none;
      }
    }
  }

  &__date {
    color: $color3;
    font-size: rem(13);

    [class*="icon-"] {
      margin-right: 5px;
      position: relative;
      top: rem(2);
      font-size: rem(16);
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
    font-size: rem(14);
    transition: color .5s ease;

    [class*="icon-"] {
      display: inline-block;
      vertical-align: middle;
      font-size: rem(22);
    }

    &:focus {
      outline: none;
    }

    &:hover,
    &:focus {
      color: $color5;
    }
  }

  &__media {
    margin: 15px 0;
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
    margin-top: rem(5);
    text-align: left;
    font: {
      family: $robotoLight;
      size: rem(14);
    }
    color: $color3;
  }
}
</style>
