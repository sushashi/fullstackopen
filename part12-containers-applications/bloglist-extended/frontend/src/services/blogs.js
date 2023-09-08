import axios from 'axios'

const baseUrl = 'http://localhost/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const url = baseUrl + '/' + newObject.id
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(url, newObject, config)
  return response.data
}

const remove = async (id) => {
  const url = baseUrl + '/' + id
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(url, config)
  return response.data
}

const comment = async (newObject) => {
  const url = baseUrl + '/' + newObject.blog + '/comments'
  const response = await axios.post(url, newObject)
  return response.data
}

export default { getAll, setToken, create, update, remove, comment }
