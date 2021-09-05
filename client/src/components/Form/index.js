import React from 'react'
import './form.css'

const Form = ({className, children, method}) => {

    return <form className={className} method={method}>{children}</form>
}

export default Form