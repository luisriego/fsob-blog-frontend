import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Togglable } from '../../components/Togglable'
import { BlogForm } from '../../components/BlogForm'

test('should render the content', () => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    const setMessage = [
        `Wrong username or password`,
        'error'
    ]

    const component = render(
        <Togglable buttonLabel={'new note'}>
            <BlogForm user={user} setMessage={setMessage} />
        </Togglable>
      )
    
    component.getByText('new note')
})