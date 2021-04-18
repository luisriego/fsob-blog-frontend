import React, { useState } from 'react'

import blogService from '../services/blogs'

export const BlogForm = ({setMessage}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const likes = 0

    const handleSubmit = (e) => {
        e.preventDefault()

        const newBlog = {
            title,
            author,
            url,
            likes
        }

        blogService.create(newBlog)
            .then(blog => {
                setMessage([
                    `A new blog ${blog.title} by ${blog.author} added`,
                    'success'
                ])
                setAuthor('')
                setTitle('')
                setUrl('')
            })
            .catch(err => {
                setMessage([
                    `Create ${err.message}`,
                    'error'
                ])
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>title: </label>
                <input
                type='text'
                value={title}
                name='Title'
                placeholder='Title'
                onChange={({target}) => setTitle(target.value)} 
                />
            </div>
            <div>
                <label>author: </label>
                <input
                type='text'
                value={author}
                name='Author'
                placeholder='Author'
                onChange={({target}) => setAuthor(target.value)} 
                />
            </div>
            <div>
                <label>url: </label>
                <input
                type='text'
                value={url}
                name='Url'
                placeholder='Url'
                onChange={({target}) => setUrl(target.value)} 
                />
            </div>
            <button>Create</button>
        </form>
    )
}
