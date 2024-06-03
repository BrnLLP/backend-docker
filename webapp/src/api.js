import axios from 'axios'

const baseURL = 'http://localhost'

const routing = {
  METAL: 3001,
  PAPEL: 3002,
  PLASTICO: 3003,
  VIDRO: 3004,
  USER_AUTH: 3005,
}

const api = (service) =>
  axios.create({
    baseURL: `${baseURL}:${routing[service]}`,
  })

export default api
