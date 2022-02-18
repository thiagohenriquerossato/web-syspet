import axios from 'axios'
import {baseURL} from './baseURL'
export const api = axios.create({
  baseURL,
})