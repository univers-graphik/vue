<template>
  <form :id="$enums.anchor.CONTACT_FORM"
        class="containerType1 containerType1--blue"
        method="post"
        @submit.prevent="send">

    <!-- Focus element for skip link -->
    <focus-to-content/>

    <!-- Main title -->
    <h1 class="titleType1"
        data-focus-title>{{ $t('pages.title.contact') }}</h1>

    <!-- Subtitle -->
    <p class="titleType4 is-marginTop-20 is-marginBottom-5">{{ $t('common.yourCoordinates') }}</p>

    <!-- Required info -->
    <p class="is-margin-0 textType1">* {{ $t('common.requiredFields') }}</p>

    <!-- Lastname -->
    <label :class="status($v.model.lastName)"
           :for="`lastName-${cUid}`"
           class="inputType1">
      <input v-model="model.lastName"
             :id="`lastName-${cUid}`"
             class="inputType1__input"
             type="text"
             autocomplete="family-name"
             ref="lastName"/>
      <span class="inputType1__pattern">{{ $tc('common.lastName', 2) }} *</span>
    </label>
    <help-bloc-error :errors="[{ condition: $v.$error && !$v.model.lastName.required }]"/>
    <!-- / Lastname -->

    <!-- Firstname -->
    <label :class="status($v.model.firstName)"
           :for="`firstName-${cUid}`"
           class="inputType1">
      <input v-model="model.firstName"
             :id="`firstName-${cUid}`"
             class="inputType1__input"
             type="text"
             autocomplete="given-name"
             ref="firstName"/>
      <span class="inputType1__pattern">{{ $tc('common.firstName', 2) }} *</span>
    </label>
    <help-bloc-error :errors="[{ condition: $v.$error && !$v.model.firstName.required }]"/>
    <!-- / Firstname -->

    <!-- Email -->
    <label :class="status($v.model.email)"
           :for="`email-${cUid}`"
           class="inputType1">
      <input v-model="model.email"
             :id="`email-${cUid}`"
             class="inputType1__input"
             type="email"
             autocomplete="email"
             ref="email"/>
      <span class="inputType1__pattern">{{ $tc('common.email', 2) }} *</span>
    </label>
    <help-bloc-error :errors="[
                        { condition: $v.$error && !$v.model.email.required },
                        { condition: $v.$error && !$v.model.email.email, message: 'validate.message.email' }
                        ]"/>
    <!-- / Email -->

    <!-- Phone -->
    <label :for="`phone-${cUid}`"
           class="inputType1">
      <input v-model="model.phone"
             :id="`phone-${cUid}`"
             class="inputType1__input"
             type="text"
             autocomplete="tel-national"/>
      <span class="inputType1__pattern">{{ $tc('common.phone', 2) }}</span>
    </label>
    <!-- / Phone -->

    <!-- Society -->
    <label :for="`society-${cUid}`"
           class="inputType1">
      <input v-model="model.society"
             :id="`society-${cUid}`"
             class="inputType1__input"
             type="text"
             autocomplete="organization"/>
      <span class="inputType1__pattern">{{ $tc('common.society', 2) }}</span>
    </label>
    <!-- / Society -->

    <!-- Subtitle -->
    <p class="titleType4 is-marginTop-30">{{ $t('common.yourMessage') }}</p>

    <!-- Subject -->
    <select-dropdown v-model="model.subject"
                     :items="cSubject"
                     :placeholder="`${$tc('common.subject', 2)} *`"
                     :error-class="$v.model.subject.$error"
                     custom-class="customSelectContact"
                     ref="subject"/>
    <help-bloc-error :errors="[{ condition: $v.$error && !$v.model.subject.required }]"/>
    <!-- / Subject -->

    <!-- Message -->
    <div :class="status($v.model.message)"
         class="textareaType1">
      <textarea v-model="model.message"
                :id="`message-${cUid}`"
                class="textareaType1__textarea"
                ref="message"></textarea>
      <label :for="`message-${cUid}`"
             class="textareaType1__label">{{ $tc('common.message', 2) }} *</label>
    </div>
    <help-bloc-error :errors="[{ condition: $v.$error && !$v.model.message.required }]"/>
    <!-- / Message -->

    <!-- Inscription emailing -->
    <label :data-text="$t('common.emailingRegistration')"
           :for="`emailingRegistration-${cUid}`"
           class="checkboxType1">
      <input v-model="model.emailingRegistration"
             :id="`emailingRegistration-${cUid}`"
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
              class="buttonType1 buttonType1--large buttonType1--yellow is-uppercase"
              ref="submit">
        {{ $tc('common.sendMessage', 2) }}
      </button>
    </div>
    <!-- / Submit -->

    <!-- Recaptcha info -->
    <recaptcha-branding :light="true"
                        class="is-marginTop-30"/>
  </form>
</template>

<script>
import contactFormServices from '@Services/contactFormServices'
import SelectDropdown from '@Components/selectDropdown/SelectDropdown'
import { email, required } from 'vuelidate/lib/validators'
import HelpBlocError from '@Components/helpers/helpBloc/HelpBlocError'
import { load } from 'recaptcha-v3'
import RecaptchaBranding from '@Components/helpers/recaptchaBranding/RecaptchaBranding'
import FocusToContent from '@Components/accessibility/FocusToContent'

export default {
  name: 'ContactForm',
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
    SelectDropdown,
    HelpBlocError,
    RecaptchaBranding,
    FocusToContent
  },
  computed: {
    /**
     * Count validate errors
     * @returns {number}
     */
    cCountValidateError () {
      let errors = 0
      for (const property in this.$v.model) {
        if (Object.keys(this.$v.model.$params).includes(property) && this.$v.model.hasOwnProperty(property)) {
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
     * Uid generator
     * @returns {number}
     */
    cUid () {
      return this._uid
    }
  },
  watch: {
    cCurrentLanguage (newVal, oldVal) {
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
     * @returns {{error: ((function(): *)|Ref<Boolean>|Boolean)}}
     */
    status (validation) {
      return {
        error: validation.$error
      }
    },
    /**
     * API service to send form data
     * @param {string} [token=0] token
     */
    contactFormServices (token = '0') {
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
          })
        })
        .catch((error) => {
          if (process.env.DEBUG) console.log(error.response)
          // Flash message error
          this.$store.dispatch('flashMessage/error', {
            title: this.$t('flashMessage.error.title-1'),
            msg: this.$t('flashMessage.error.content-2')
          })
        })
        .finally(() => {
          this.loading = false
          // Clear fields
          this.clearForm()
          // Remove focus submit
          this.$refs.submit.blur()
        })
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

      // Use recaptcha in production mode
      if (process.env.NODE_ENV === 'production') {
        const recaptcha = await load(process.env.RECAPTCHA_PUBLIC_KEY, {
          useRecaptchaNet: true
        })
        await recaptcha.execute('contact').then((token) => {
          this.contactFormServices(token)
        })
          .catch((error) => {
            if (process.env.DEBUG) console.log(error)
          })
      } else {
        await this.contactFormServices()
      }
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
  margin-top: rem(20);
}

.help-bloc {
  &--error {
    color: White;
  }
}

.containerSubmit {
  margin-top: rem(30);
  position: relative;
  text-align: right;

  [class*="loaderCircular"] {
    margin-top: -10px;
    margin-left: -30px;
    position: absolute;
    top: 50%;
    @media #{$isMobile} {
      margin-left: -10px;
      left: 50%;
    }
  }

  [class*="buttonType"] {
    @media #{$isMobile} {
      width: 100%;
    }
  }
}
</style>
