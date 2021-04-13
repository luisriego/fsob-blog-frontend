import React from 'react'

export const LoginForm = (props) => {
    return (
        <>
        <form onSubmit={props.handleSubmit}>
            <div>
                <input
                type='text'
                value={props.username}
                name='Username'
                placeholder='Username'
                onChange={props.handleUsernameChange} 
                />
            </div>
            <div>
                <input
                type='password'
                value={props.password}
                name='Password'
                placeholder='Password'
                onChange={props.handlePasswordChange} 
                />
            </div>
            <button>Login</button>
        </form>
        </>
    )
}
