import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from '../../components/Blog'

describe('The blog', () => {
    let component
    const buttonLabel = 'view'

    beforeEach(() => {
        const blog = {
            title: 'the title',
            author: 'the author',
            url: 'the url',
            likes: 0,
            user: '606ae4b2d8f174125677278e'
        }

        component = render(
            <Blog key={blog.url} blog={blog} />
        )
    })

    test('should render the title and the author', () => {
        const el = component.getByText('the title the author')
        const button = component.getByText(buttonLabel)
        component.getByText('the title the author')
        component.getByText('the url')
        component.getByText('likes 0')
        component.getByText('remove')
    })
});