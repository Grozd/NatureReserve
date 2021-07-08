import React from 'react'
import './button.css'

const Button = ({className ,children}) =>
{

    return (
        <div className={className}>
           {children}
        </div>
    )
}

export default Button