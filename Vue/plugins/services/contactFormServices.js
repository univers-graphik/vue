import endpoints from '@Declarations/endpoints'
import Request from '@Class/Request'

const request = new Request({})

export default {
  /**
   * Send form data
   * @param {object} model
   * @param {string} recaptchaToken
   * @returns {Promise<T | never>}
   */
  post ({ model, recaptchaToken }) {
    const formData = new FormData()

    formData.append('recaptchaToken', recaptchaToken)
    formData.append('lang', model.lang)
    formData.append('lastName', model.lastName)
    formData.append('firstName', model.firstName)
    formData.append('email', model.email)
    formData.append('phone', model.phone)
    formData.append('society', model.society)
    formData.append('subject', model.subject)
    formData.append('message', model.message)
    formData.append('emailingRegistration', model.emailingRegistration)

    return request
      .post(endpoints.CONTACT_FORM, formData)
  }
}
