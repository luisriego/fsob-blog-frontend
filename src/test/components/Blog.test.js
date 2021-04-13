import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../../components/Blog'

test('should render the content', () => {
    const blog = {
        title: 'the title',
        author: 'the author',
        url: 'the url'
    }

    const component = render(<Blog key={blog.url} blog={blog} />)
    
    component.getByText('the title the author')
})
