import axios from 'axios'

const TOKEN = localStorage.getItem('Authorization')
export const publicRequest = axios.create({
  baseURL: 'http://localhost:5000',
})
export const userRquest = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { Authorization: `Bearer ${TOKEN}` },
})

export default publicRequest
