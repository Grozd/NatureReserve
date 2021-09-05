import React from 'react'
import './button.css'

const Button = ({className ,children, type='button' ,onClick}) =>
{
    return (
        <div className={className}type={type} onClick={onClick} >
           {children}
        </div>
    )
}

export default Button