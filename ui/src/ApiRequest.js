import axios from 'axios'

const TOKEN = localStorage.getItem('Authorization')
export const publicRequest = axios.create({
  baseURL: 'http://shopapi-env-1.eba-cfmmn5r8.us-east-1.elasticbeanstalk.com',
})
export const userRquest = axios.create({
  baseURL: 'http://shopapi-env-1.eba-cfmmn5r8.us-east-1.elasticbeanstalk.com',
  headers: { Authorization: `Bearer ${TOKEN}` },
})

export default publicRequest
