import React, { useState } from 'react'
import blogs from '../services/blogs'
import { Togglable } from './Togglable'
import jwt_decode from "jwt-decode";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, setMessage }) => {
  const [like, setLike] = useState(false)

  const toggleLike = () => {
    setLike(!like)
    like ? blog.likes = blog.likes - 1 : blog.likes = blog.likes + 1
    const blogToEdit = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.id
    }
    
    blogs.update(blogToEdit)
      .then(blog => {
          setMessage([
              `Blog updated successfully`,
              'success'
          ])
      })
      .catch(err => {
          setMessage([
              `Update ${err.message}`,
              'error'
          ])
    })
  }

  const handleRemove = ()=> {
    const { token } = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    const actualUser = jwt_decode(token);

    if (actualUser.id !== blog.user.id) {
      return
    }

    if (window.confirm("Do you really want to remove?")) {
      blogs.remove(blog.id)
        .then(blog => {
          setMessage([
              `Blog removed successfully`,
              'success'
          ])
      })
      .catch(err => {
          setMessage([
              `Remove ${err.message}`,
              'error'
          ])
        })
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable >
          <p>{blog.url}</p>
          <p>likes {blog.likes}<button onClick={toggleLike}>like</button></p>
          <p>{blog.user.name}</p>
          <button onClick={handleRemove}>remove</button>
      </Togglable>
    </div>
  )
}

export default Blog
