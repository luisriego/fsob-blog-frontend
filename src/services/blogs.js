import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const header = {
    headers: { Authorization: token }
};

  const request = axios.post(baseUrl, blog, header)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }