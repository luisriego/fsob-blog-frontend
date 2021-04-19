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

const update = (blog) => {
  const header = {
    headers: { Authorization: token }
  };

  const request = axios.put(`${baseUrl}/${blog.id}`, blog, header)
  return request.then(response => response.data)
}

const remove = (blogId) => {
  const header = {
    headers: { Authorization: token }
  };

  const request = axios.delete(`${baseUrl}/${blogId}`, header)
  return request.then(response => response.data)
}

// import/no-anonymous-default-export
export default { getAll, create, update, remove, setToken }
