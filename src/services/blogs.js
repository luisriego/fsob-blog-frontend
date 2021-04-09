import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'
let token = null

const setToken = () => {
  token = `Bearer ${window.localStorage.getItem('token')}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const header = {
    Authorization: token
  }
  const request = axios.post(baseUrl, blog, header)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }