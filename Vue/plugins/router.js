import Vue from 'vue'
import VueRouter from 'vue-router'
import enums from '@Plugins/enums'
import store from '@Plugins/store'
import { i18n, loadLanguageAsync } from '@Plugins/i18n'

Vue.use(VueRouter)

const langArray = process.env.LANG.split('|')
const langCompleteArray = process.env.LANG_COMPLETE.split('|')

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: enums.config.IS_CURRENT,
  routes: [
    {
      path: '',
      beforeEnter (to, from, next) {
        next(`/${i18n.locale.substring(0, 2)}/`)
      }
    },
    {
      path: `/${enums.pages.ERROR_404}`,
      name: enums.pages.ERROR_404,
      component: () => import(/* webpackChunkName: "error-404" */ '@Pages/Error404'),
      beforeEnter (to, from, next) {
        store.commit('route/setCurrent', enums.pages.ERROR_404)
        next()
      }
    },
    {
      path: `/:lang(${process.env.LANG})`,
      component: {
        template: '<router-view/>'
      },
      children: [
        {
          path: '',
          name: enums.pages.HOMEPAGE,
          component: () => import(/* webpackChunkName: "page" */ '@Pages/Page'),
          props: { type: 'homepage' },
          beforeEnter (to, from, next) {
            store.commit('route/setCurrent', enums.pages.HOMEPAGE)
            next()
          }
        },
        {
          path: `:seo(${enums.regex.LETTER_VALIDATOR})?/page-:slug(${enums.regex.URL_VALIDATOR})/:id(${enums.regex.INTEGER_VALIDATOR})`,
          name: enums.pages.PAGE,
          props: true,
          component: () => import(/* webpackChunkName: "page" */ '@Pages/Page'),
          beforeEnter (to, from, next) {
            store.commit('route/setCurrent', enums.pages.PAGE)
            next()
          }
        },
        {
          path: `:seo(${enums.regex.LETTER_VALIDATOR})?/contact-:slug(${enums.regex.LETTER_VALIDATOR})`,
          name: enums.pages.CONTACT,
          component: () => import(/* webpackChunkName: "contact" */ '@Pages/Contact'),
          beforeEnter (to, from, next) {
            store.commit('route/setCurrent', enums.pages.CONTACT)
            next()
          }
        },
        {
          path: `:seo(${enums.regex.LETTER_VALIDATOR})?/:slug(${enums.regex.LETTER_VALIDATOR})-cgu`,
          name: enums.pages.LEGAL_NOTICE,
          component: () => import(/* webpackChunkName: "legal-notice" */ '@Pages/LegalNotice'),
          beforeEnter (to, from, next) {
            store.commit('route/setCurrent', enums.pages.LEGAL_NOTICE)
            next()
          }
        },
        {
          path: `:seo(${enums.regex.LETTER_VALIDATOR})?/:slug(${enums.regex.LETTER_VALIDATOR})-liste/page=:page(${enums.regex.INTEGER_VALIDATOR})`,
          name: enums.pages.NEWS_LIST,
          component: () => import(/* webpackChunkName: "news-list" */ '@Pages/NewsList'),
          beforeEnter (to, from, next) {
            if (process.env.NEWS) {
              store.commit('route/setCurrent', enums.pages.NEWS_LIST)
              next()
            } else {
              next(enums.pages.ERROR_404)
            }
          }
        },
        {
          path: `:seo(${enums.regex.LETTER_VALIDATOR})?/article-:slug(${enums.regex.URL_VALIDATOR})/:id(${enums.regex.INTEGER_VALIDATOR})`,
          name: enums.pages.NEWS,
          props: true,
          component: () => import(/* webpackChunkName: "news" */ '@Pages/News'),
          beforeEnter (to, from, next) {
            if (process.env.NEWS) {
              store.commit('route/setCurrent', enums.pages.NEWS)
              next()
            } else {
              next(enums.pages.ERROR_404)
            }
          }
        },
        {
          path: `:seo(${enums.regex.LETTER_VALIDATOR})?/:slug(${enums.regex.LETTER_VALIDATOR})-images/page=:page(${enums.regex.INTEGER_VALIDATOR})`,
          name: enums.pages.GALLERIES,
          component: () => import(/* webpackChunkName: "galleries" */ '@Pages/Galleries'),
          beforeEnter (to, from, next) {
            if (process.env.GALLERY) {
              store.commit('route/setCurrent', enums.pages.GALLERIES)
              next()
            } else {
              next(enums.pages.ERROR_404)
            }
          }
        },
        {
          path: `:seo(${enums.regex.LETTER_VALIDATOR})?/galerie-:slug(${enums.regex.URL_VALIDATOR})/:id(${enums.regex.INTEGER_VALIDATOR})`,
          name: enums.pages.GALLERY,
          props: true,
          component: () => import(/* webpackChunkName: "gallery" */ '@Pages/Gallery'),
          beforeEnter (to, from, next) {
            if (process.env.GALLERY) {
              store.commit('route/setCurrent', enums.pages.GALLERY)
              next()
            } else {
              next(enums.pages.ERROR_404)
            }
          }
        }
      ]
    },
    {
      path: '*',
      redirect: {
        name: enums.pages.ERROR_404
      }
    }
  ],
  scrollBehavior (to, from) {
    // Anchor
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 120 } // cause header as a fixed position
      }
    }

    // No scroll on the same page (change lang)
    if (to.name === from.name) {
      // Same component with different id
      if (to.params.id && (to.params.id !== from.params.id)) {
        return { x: 0, y: 0 }
      }

      return
    }

    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // Close navmain when new page loaded
  if (store.state.parameters.openNavmain) {
    store.commit('parameters/setOpenNavmain', false)
  }

  // Verify param lang in url
  const language = to.params.lang
  if (language && language !== i18n.locale.substring(0, 2)) {
    // Test if valid language
    if (langArray.includes(language)) {
      // Update
      const newLanguage = langCompleteArray[langArray.indexOf(language)]
      i18n.locale = newLanguage
      localStorage.setItem('i18n', newLanguage)
      store.commit('parameters/setUrlLang', language)
    }
  }

  // If the language is not translated, the default language is used
  if (Object.values(enums.lang).indexOf(i18n.locale) === -1) i18n.locale = process.env.DEFAULT_LANGUAGE
  // Load language
  loadLanguageAsync(i18n.locale).then(() => next())
})

export default router
