import React, { useState } from 'react'

export const Togglable = ({children, buttonLabel, buttonCloseLabel = 'cancel', ref}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  
    const toggleVisibility = () => {
      setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>{buttonCloseLabel}</button>
                {children}
            </div>
        </div>
    )
}
