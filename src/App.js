import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import Notification from './components/Notification'
import { Togglable } from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userLogged = window.localStorage.getItem('loggedBlogAppUser')
    if (userLogged) {
      setUser(JSON.parse(userLogged))
      blogService.setToken(JSON.parse(userLogged).token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    loginService.login({
      username,
      password
    })
      .then(user => {
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        setUser(user)
        setUsername('')
        setPassword('')
      })
      .catch(err => {
        console.log(err)
        setMessage([
            `Wrong username or password`,
            'error'
        ])
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <LoginForm 
          username={username}
          password={password}
          handleUsernameChange={({target}) => setUsername(target.value)}
          handlePasswordChange={({target}) => setPassword(target.value)}
          handleSubmit={handleSubmit}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>
        {user.name} logged in 
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel={'crete new blog'}>
        <BlogForm user={user} setMessage={setMessage} />
      </Togglable>
      {blogs
        .sort((a, b) => a.likes > b.likes ? -1 : 1)
        .map(blog =>
          <Blog blog={blog} setMessage={setMessage} key={blog.id} />
      )}
    </div>
  )
}

export default App