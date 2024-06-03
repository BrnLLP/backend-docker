import api from '../api'

export default {
  install(Vue) {
    const create = async ({ path = '', data, service } = {}) => {
      const response = await api(service).post(`${path}`, data)
      return response
    }

    const load = async ({ path = '', id = null, service } = {}) => {
      const url = `${path}${id ? `/${id}` : ''}`

      const response = await api(service).get(url)

      return response.data
    }

    const update = async ({ path = '', id = null, data, service } = {}) => {
      let payload = {
        ...data,
      }

      if (id) payload.id = id

      const url = `${path}${id ? `/${id}` : ''}`
      const response = await api(service).put(url, payload)
      return response.data
    }

    const patch = async ({ path = '', id = null, data, service } = {}) => {
      let payload = {
        ...data,
      }

      if (id) payload.id = id

      const url = `${path}${id ? `/${id}` : ''}`
      const response = await api(service).patch(url, payload)
      return response.data
    }

    const remove = async ({ path = '', id, service } = {}) => {
      var response = await api(service).delete(`${path}/${id}`, {})
      return response.data
    }

    Vue.prototype.$service = {
      create,
      load,
      update,
      remove,
      patch,
    }
  },
}
