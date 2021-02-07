<template>
  <div class="customization">
    <!-- Meta -->
    <Meta :title="`${$t('pages.title.contact')} - ${$enums.config.SOCIETY_SITE}`"
          :url="$pagesUrl[$i18n.locale].contact"/>

    <!-- Panoramic -->
    <Panoramic :type="$enums.panoramics.COMMON_TYPE"
               :id="$enums.panoramics.CONTACT_ID"/>

    <!-- Main container -->
    <div class="mainContainer mainContainer--spacerTB containerFloatingCol">
      <!-- INFORMATIONS -->
      <aside class="floatingCol--small floatingCol--spacerRight">
        <div class="sidebar__item sidebar__item--full">
          <div class="sidebar__content">
            <!-- Title -->
            <h2 class="sidebar__title">{{ $t('common.ourCoordinates') }}</h2>

            <template v-if="$store.state.contactInformation.loaded">
              <!-- Address -->
              <ul class="listType3 adr">
                <!-- Society -->
                <li v-if="$store.state.contactInformation.society"
                    class="listType3__item organization-name">
                  <i class="icon-geoloc is-text-middleGrey"></i>{{ $store.state.contactInformation.society }}
                </li>
                <!-- Address -->
                <li class="listType3__item street-address"
                    v-html="$store.state.contactInformation.address"></li>
                <!-- Postal code / City -->
                <li v-if="$store.state.contactInformation.postalCode || $store.state.contactInformation.city"
                    class="listType3__item">
                  <span class="postal-code">{{ $store.state.contactInformation.postalCode }}</span>
                  <span class="locality">{{ $store.state.contactInformation.city }}</span>
                </li>
                <!-- Country -->
                <li v-if="$store.state.contactInformation.country"
                    class="listType3__item country-name is-uppercase">
                  {{ $store.state.contactInformation.country }}
                </li>
              </ul>
              <!-- / Address -->

              <div class="is-separator is-marginTB-20"></div>

              <ul class="listType3">
                <!-- E-mail -->
                <li v-if="$store.state.contactInformation.email"
                    class="listType3__item">
                  <i class="icon-send is-text-middleGrey"></i>
                  <span :data-hint="$t('common.sendEmail')"
                        class="hint-top-middle-mobile hint-anim"
                        v-html="$options.filters.cryptMailto(cCryptEmail, 'linkType2')"></span>
                </li>
                <!-- Phone -->
                <li v-if="$store.state.contactInformation.phone"
                    class="listType3__item">
                  <i class="icon-gsm is-text-middleGrey"></i>
                  {{ $store.state.contactInformation.phone }}
                </li>
                <!-- Fixed phone -->
                <li v-if="$store.state.contactInformation.fixedPhone"
                    class="listType3__item">
                  <i class="icon-phone is-text-middleGrey"></i>
                  {{ $store.state.contactInformation.fixedPhone }}
                </li>
                <!-- Fax -->
                <li v-if="$store.state.contactInformation.fax"
                    class="listType3__item">
                  <i class="icon-fax is-text-middleGrey"></i>
                  {{ $store.state.contactInformation.fax }}
                </li>
              </ul>
            </template>

            <!-- Loader -->
            <div v-else
                 class="loaderCircular loaderCircular--center"></div>
          </div>
        </div>
      </aside>
      <!-- / INFORMATIONS -->

      <!-- FORM -->
      <form :id="$enums.anchor.FORM_CONTACT"
            class="containerType1 containerType1--blue floatingCol--large"
            method="post"
            @submit.prevent="send">

        <!-- Main title -->
        <h1 class="titleType1">{{ $t('pages.title.contact') }}</h1>

        <!-- Subtitle -->
        <p class="titleType4 is-marginTop-20">{{ $t('common.yourCoordinates') }}</p>

        <!-- Lastname -->
        <label :class="status($v.model.lastName)"
               class="inputType1">
          <input v-model="model.lastName"
                 class="inputType1__input"
                 type="text"/>
          <span class="inputType1__pattern">{{ $tc('common.lastName', 2) }} *</span>
        </label>
        <HelpBlocError :errors="[{ condition: $v.$error && !$v.model.lastName.required }]"/>
        <!-- / Lastname -->

        <!-- Firstname -->
        <label :class="status($v.model.firstName)"
               class="inputType1">
          <input v-model="model.firstName"
                 class="inputType1__input"
                 type="text"/>
          <span class="inputType1__pattern">{{ $tc('common.firstName', 2) }} *</span>
        </label>
        <HelpBlocError :errors="[{ condition: $v.$error && !$v.model.firstName.required }]"/>
        <!-- / Firstname -->

        <!-- Email -->
        <label :class="status($v.model.email)"
               class="inputType1">
          <input v-model="model.email"
                 class="inputType1__input"
                 type="email"/>
          <span class="inputType1__pattern">{{ $tc('common.email', 2) }} *</span>
        </label>
        <HelpBlocError :errors="[
                        { condition: $v.$error && !$v.model.email.required },
                        { condition: $v.$error && !$v.model.email.email, message: 'validate.message.email' }
                        ]"/>
        <!-- / Email -->

        <!-- Phone -->
        <label class="inputType1">
          <input v-model="model.phone"
                 class="inputType1__input"
                 type="text"/>
          <span class="inputType1__pattern">{{ $tc('common.phone', 2) }}</span>
        </label>
        <!-- / Phone -->

        <!-- Society -->
        <label class="inputType1">
          <input v-model="model.society"
                 class="inputType1__input"
                 type="text"/>
          <span class="inputType1__pattern">{{ $tc('common.society', 2) }}</span>
        </label>
        <!-- / Society -->

        <!-- Subtitle -->
        <p class="titleType4 is-marginTop-30">{{ $t('common.yourMessage') }}</p>

        <!-- Subject -->
        <SelectDropdown v-model="model.subject"
                        :items="cSubject"
                        :placeholder="`${$tc('common.subject', 2)} *`"
                        :error-class="$v.model.subject.$error"
                        custom-class="customSelectContact"/>
        <HelpBlocError :errors="[{ condition: $v.$error && !$v.model.subject.required }]"/>
        <!-- / Subject -->

        <!-- Message -->
        <div :class="status($v.model.message)"
             class="textareaType1">
                    <textarea v-model="model.message"
                              class="textareaType1__textarea"
                              id="message"></textarea>
          <label class="textareaType1__label"
                 for="message">{{ $tc('common.message', 2) }} *</label>
        </div>
        <HelpBlocError :errors="[{ condition: $v.$error && !$v.model.message.required }]"/>
        <!-- / Message -->

        <!-- Inscription emailing -->
        <label :data-text="$t('common.emailingRegistration')"
               class="checkboxType1">
          <input v-model="model.emailingRegistration"
                 class="checkboxType1__input"
                 type="checkbox"/>
          <span class="checkboxType1__pattern"></span>
        </label>
        <!-- / Inscription emailing -->

        <!-- Common error message -->
        <transition name="vueFadeEffect">
          <div v-if="$v.$error"
               class="flashMessage flashMessage--noTitle flashMessage--error is-displayBlock is-marginTop-20">
            <i class="icon-error flashMessage__icon"></i>
            {{ $tc('validate.message.generalError', cCountValidateError, { count: cCountValidateError }) }}
          </div>
        </transition>
        <!--/ Common error message -->

        <!-- Submit -->
        <div class="containerSubmit">
          <!-- Loader -->
          <div v-if="loading"
               class="loaderCircular loaderCircular--white"></div>

          <!-- Button -->
          <button :disabled="loading"
                  type="submit"
                  class="buttonType1 buttonType1--large buttonType1--yellow is-uppercase">
            {{ $t('common.send') }}
          </button>

          <!-- Info -->
          <p class="containerSubmit__info">* {{ $t('common.requiredFields') }}</p>
          <RecaptchaBranding :light="true"
                             class="is-marginTop-30"/>
        </div>
        <!-- / Submit -->
      </form>
      <!-- / FORM -->

      <!-- SideBar -->
      <Sidebar :target="$enums.pages.CONTACT"/>
    </div>
    <!-- / Main container -->
  </div>
</template>

<script>
import contactFormServices from '@Services/contactFormServices'
import Meta from '@Components/meta/Meta'
import Panoramic from '@Components/panoramic/Panoramic'
import Sidebar from '@Components/sidebar/Sidebar'
import SelectDropdown from '@Components/selectDropdown/SelectDropdown'
import { email, required } from 'vuelidate/lib/validators'
import HelpBlocError from '@Components/helpers/helpBloc/HelpBlocError'
import { load } from 'recaptcha-v3'
import RecaptchaBranding from '@Components/helpers/recaptchaBranding/RecaptchaBranding'

export default {
  name: 'Contact',
  data () {
    return {
      loading: false,
      model: {
        lang: '',
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        society: '',
        subject: '',
        message: '',
        emailingRegistration: false
      }
    }
  },
  validations: {
    model: {
      lastName: {
        required
      },
      firstName: {
        required
      },
      email: {
        required,
        email
      },
      subject: {
        required
      },
      message: {
        required
      }
    }
  },
  components: {
    Meta,
    Panoramic,
    Sidebar,
    SelectDropdown,
    HelpBlocError,
    RecaptchaBranding
  },
  computed: {
    /**
     * Crypt with btoa
     * @returns {string}
     */
    cCryptEmail () {
      return btoa(this.$store.state.contactInformation.email)
    },
    /**
     * Count validate errors
     * @returns {number}
     */
    cCountValidateError () {
      let errors = 0
      for (const property in this.$v.model) {
        if (Object.keys(this.$v.model.$params).indexOf(property) !== -1 && this.$v.model.hasOwnProperty(property)) {
          if (this.$v.model[property]['$error']) errors += 1
        }
      }

      return errors
    },
    /**
     * List subject contact
     * @returns {array}
     */
    cSubject () {
      return [
        { label: this.$t('contact.subject-1'), value: this.$t('contact.subject-1') },
        { label: this.$t('contact.subject-2'), value: this.$t('contact.subject-2') },
        { label: this.$t('contact.subject-3'), value: this.$t('contact.subject-3') },
        { label: this.$t('contact.subject-4'), value: this.$t('contact.subject-4') }
      ]
    },
    /**
     * Lang active
     * @returns {string}
     */
    cLangActive () {
      return this.$store.state.parameters.urlLang
    }
  },
  watch: {
    cLangActive (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.model.subject = ''
        this.clearSelectDropdown()
      }
    }
  },
  methods: {
    /**
     * Status field validate
     * @param {object} validation
     * @returns {object}
     */
    status (validation) {
      return {
        error: validation.$error
      }
    },
    /**
     * Send data
     */
    async send () {
      // Validate form
      this.$v.model.$touch()
      // If its still pending or an error is returned do not submit
      if (this.$v.model.$pending || this.$v.model.$error) return

      // Showing loader
      this.loading = true

      // Recaptcha
      const recaptcha = await load(process.env.RECAPTCHA_PUBLIC_KEY, {
        useRecaptchaNet: true
      })

      await recaptcha.execute('contact').then((token) => {
        this.model.lang = this.$i18n.locale
        contactFormServices.post({
          model: this.model,
          recaptchaToken: token
        })
          .then(() => {
            // Flash message success
            this.$store.dispatch('flashMessage/success', {
                title: this.$t('flashMessage.success.title-1'),
                msg: this.$t('flashMessage.success.content-1')
              }
            )
          })
          .catch((error) => {
            if (process.env.DEBUG) console.log(error.response)
            // Flash message error
            this.$store.dispatch('flashMessage/error', {
                title: this.$t('flashMessage.error.title-1'),
                msg: this.$t('flashMessage.error.content-2')
              }
            )
          })
          .finally(() => {
            this.loading = false
            // Clean field
            this.clearForm()
          })
      })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error)
        })
    },
    /**
     * Clear SelectDropdown
     */
    clearSelectDropdown () {
      this.$children.forEach((item) => {
        // Clear selected value of selectDropdown
        if (item.$options._componentTag === 'SelectDropdown') item.selectedOption.value = ''
      })
    },
    /**
     * Clear all fields form
     */
    clearForm () {
      this.$v.model.$reset()
      Object.keys(this.model).forEach((key) => {
        this.model[key] = ''
      })
      this.clearSelectDropdown()
    }
  }
}
</script>

<style scoped lang="scss">
.inputType1,
.textareaType1,
.checkboxType1 {
  margin-top: 20px;
}

.help-bloc {
  &--error {
    color: White;
  }
}

.containerSubmit {
  margin-top: 30px;
  text-align: right;

  [class*="loaderCircular"] {
    margin-right: 15px;
    vertical-align: middle;
  }

  &__info {
    font-size: 12px;
  }
}
</style>
