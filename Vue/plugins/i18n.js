import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enumsLang from '@Declarations/lang'
import messages from './locales/common/fr-FR'

Vue.use(VueI18n)

// Pattern language string
const navigator = window.navigator
const navigatorLanguages = navigator.languages || navigator.language || navigator.browserLanguage
const languages = Array.isArray(navigatorLanguages) ? navigatorLanguages[0] : navigatorLanguages
let local = localStorage.getItem('i18n') || languages || process.env.DEFAULT_LANGUAGE
// Change pattern if navigatorLanguages is just a string of 2 letters (good pattern fr-FR)
local = local.length === 2 ? `${local}-${local.toUpperCase()}` : local

export const i18n = new VueI18n({
  locale: local,
  fallbackLocale: process.env.DEFAULT_LANGUAGE,
  silentTranslationWarn: true,
  messages,
  dateTimeFormats: {
    [enumsLang.FR_FR]: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric'
      },
      newsList: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    [enumsLang.EN_US]: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric'
      },
      newsList: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  },
  numberFormats: {
    [enumsLang.FR_FR]: {
      currency: {
        style: 'currency',
        currency: 'EUR'
      }
    },
    [enumsLang.EN_US]: {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    }
  }
})

// Default language that is preloaded
const loadedLanguages = [process.env.DEFAULT_LANGUAGE]

/**
 * Set current language
 * @param {string} lang
 * @returns {string}
 */
function setI18nLanguage (lang) {
  i18n.locale = lang
  return lang
}

/**
 * Async loading language
 * @param {string} lang
 */
export function loadLanguageAsync (lang) {
  // If the language was already loaded
  if (loadedLanguages.includes(lang)) return Promise.resolve(setI18nLanguage(lang))

  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "lang-[request]" */ './locales/common/' + lang).then(
    messages => {
      i18n.setLocaleMessage(lang, messages.default[lang])
      loadedLanguages.push(lang)

      return setI18nLanguage(lang)
    }
  )
}
