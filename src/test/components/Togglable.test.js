import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { Togglable } from '../../components/Togglable'
import { BlogForm } from '../../components/BlogForm'

describe('The Togglable element', () => {
    let component
    const buttonLabel = 'view'

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel={buttonLabel}>
                <div>testDivContent</div>
            </Togglable>
        )
    })

    test('should render his children prop', () => {
        component.getByText('testDivContent')
    })

    test('should render his children prop \'display: none\'', () => {
        const el = component.getByText('testDivContent')
        expect(el.parentNode).toHaveStyle('display: none')
    })

    test('should render his children prop when clicked', () => {
        const el = component.getByText('testDivContent')
        const button = component.getByText(buttonLabel)
        fireEvent.click(button)
        expect(el.parentNode).not.toHaveStyle('display: none')
    })
});
