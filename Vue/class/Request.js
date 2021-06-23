import axios from 'axios'

export default class Request {
  /**
   * @summary Axios request
   *
   * @param {string} [options.baseUrl=process.env.DOMAIN + process.env.API_PATH]
   * @param {boolean} [options.authenticate=false]
   * @param {string} [options.token='']
   * @param {number} [options.maxAttempt=2]
   */
  constructor (options) {
    const defaults = {
      baseUrl: process.env.DOMAIN + process.env.API_PATH,
      authenticate: false,
      token: '',
      maxAttempt: 2
    }
    const settings = { ...defaults, ...options }

    this.baseUrl = settings.baseUrl
    this.token = settings.token
    this.authenticate = settings.authenticate
    this.maxAttempt = settings.maxAttempt

    // Init axios
    const request = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Request without authentication
    if (!this.authenticate) return request

    /**
     * Access token
     */
    request.interceptors.request.use(
      config => {
        // Set Bearer token
        config.headers.Authorization = `Bearer ${this.token}`

        return config
      },
      error => Promise.reject(error)
    )

    return request
  }
}
