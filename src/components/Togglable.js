import React, { useState } from 'react'

import PropTypes from 'prop-types';

export const Togglable = ({children, buttonLabel = 'view', buttonCloseLabel = 'hide'}) => {
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

Togglable.propTypes = {
    buttonLabel: PropTypes.string,
    buttonCloseLabel: PropTypes.string
};
