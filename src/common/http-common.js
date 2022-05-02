import axios from 'axios'

export default axios.create({
  baseURL: 'https://be.shingwy.repl.co/api/v1',
  headers: {
    'Content-type': 'application/json'
  }
})