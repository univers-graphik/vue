import axios from 'axios'

const request = axios.create({
  baseURL: process.env.DOMAIN + process.env.API_PATH,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default request
