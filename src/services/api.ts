import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://syspet-backend-alfa.herokuapp.com/',
})